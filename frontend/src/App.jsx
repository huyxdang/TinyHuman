import { useState, useEffect, useRef, useCallback } from 'react';
import ThreeGraph from './components/ThreeGraph';
import HeroOverlay from './components/HeroOverlay';
import InputModal from './components/InputModal';
import TopBar from './components/TopBar';
import ProgressBar from './components/ProgressBar';
import ClusterLegend from './components/ClusterLegend';
import ChatPanel from './components/ChatPanel';
import ReportPanel from './components/ReportPanel';
import NodeDetailPanel from './components/NodeDetailPanel';
import { generateEdges } from './data/mockData';
import './App.css';

const CLUSTER_COLORS = ['#FF6B35', '#4ECDC4', '#7B68EE', '#FF85A2', '#22c55e', '#f59e0b'];

// Region colors for 3D graph
const REGION_COLORS = {
  'Southeast': [1.0, 0.42, 0.21],
  'Red River Delta': [0.31, 0.80, 0.77],
  'Mekong Delta': [0.29, 0.53, 0.91],
  'North Central': [1.0, 0.52, 0.63],
  'South Central': [0.48, 0.41, 0.93],
  'Central Highlands': [0.30, 0.76, 0.38],
  'Northeast': [0.95, 0.77, 0.26],
  'Northwest': [0.72, 0.45, 0.80],
};

// Map real personas to ThreeGraph node format
function personasToNodes(personas, clusters) {
  // Build persona -> cluster mapping
  const personaCluster = {};
  (clusters || []).forEach(c => {
    (c.persona_ids || []).forEach(pid => {
      personaCluster[pid] = c.cluster_id;
    });
  });

  return personas.map((p, i) => {
    // Fibonacci sphere for initial positions
    const phi = Math.acos(1 - 2 * (i + 0.5) / personas.length);
    const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
    const r = 18;

    const region = p.region || 'Southeast';
    const color = REGION_COLORS[region] || [0.7, 0.7, 0.7];

    return {
      id: p.id,
      x: r * 1.8 * Math.sin(phi) * Math.cos(theta) + (Math.random() - 0.5) * 5,
      y: r * 0.8 * Math.sin(phi) * Math.sin(theta) + (Math.random() - 0.5) * 5,
      z: r * Math.cos(phi) + (Math.random() - 0.5) * 5,
      color,
      size: 3,
      alpha: 0.8,
      persona: {
        age: p.age,
        gender: p.gender,
        province: p.province,
        region: p.region,
        jobTitle: p.job_title,
        industry: p.industry,
        companySize: p.company_size,
        educationLevel: p.education_level,
        incomeBracket: p.income_bracket,
        primaryPlatform: p.primary_platform,
        searchLanguage: p.search_language,
        frustrations: p.top_3_frustrations,
      },
      matchScore: 0,
      clusterId: personaCluster[p.id] ?? null,
    };
  });
}

export default function App() {
  // --- State ---
  const [phase, setPhase] = useState('hero'); // hero, input, researching, chatting, report
  const [productName, setProductName] = useState('');
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredCluster, setHoveredCluster] = useState(null);
  const [tooltip, setTooltip] = useState(null);

  // Pipeline state
  const [researchStatus, setResearchStatus] = useState('');
  const [competitors, setCompetitors] = useState([]);
  const [chatLogs, setChatLogs] = useState({});
  const [chatResults, setChatResults] = useState({});
  const [chatRunning, setChatRunning] = useState(false);
  const [chatDone, setChatDone] = useState(false);
  const [report, setReport] = useState(null);

  const eventSourceRef = useRef(null);

  // --- Load real data on mount ---
  useEffect(() => {
    fetch('/api/state')
      .then(res => res.json())
      .then(data => {
        const mappedNodes = personasToNodes(data.personas, data.clusters);
        const mappedEdges = generateEdges(mappedNodes, Math.min(mappedNodes.length * 5, 3000));
        setNodes(mappedNodes);
        setEdges(mappedEdges);

        // Map clusters to the format components expect
        // Assign colors and compute centers from node positions
        const mappedClusters = (data.clusters || []).map((c, i) => {
          // Compute center from member node positions
          const memberNodes = mappedNodes.filter(n => n.clusterId === c.cluster_id);
          let cx = 0, cy = 0, cz = 0;
          memberNodes.forEach(n => { cx += n.x; cy += n.y; cz += n.z; });
          const len = memberNodes.length || 1;

          return {
            id: c.cluster_id,
            label: c.label,
            size: c.size,
            persona_ids: c.persona_ids,
            color: CLUSTER_COLORS[i % CLUSTER_COLORS.length],
            center: { x: cx / len, y: cy / len, z: cz / len },
            scanned: false,
          };
        });
        setClusters(mappedClusters);
      })
      .catch(err => console.error('Failed to load state:', err));
  }, []);

  // Cleanup EventSource on unmount
  useEffect(() => {
    return () => {
      if (eventSourceRef.current) eventSourceRef.current.close();
    };
  }, []);

  // --- Handlers ---
  function handleTryIt() {
    setPhase('input');
  }

  function handleCloseModal() {
    setPhase('hero');
  }

  async function handleRun(input) {
    setProductName(input);
    setSelectedNode(null);
    setResearchStatus('Starting research...');

    // Set match scores for clustered nodes so ThreeGraph renders them
    setNodes(prev => prev.map(n => ({
      ...n,
      matchScore: n.clusterId != null ? 0.6 + Math.random() * 0.35 : 0,
    })));

    setPhase('researching');
    setCompetitors([]);
    setChatLogs({});
    setChatResults({});
    setChatRunning(false);
    setChatDone(false);
    setReport(null);

    // Initialize empty chat logs for each cluster
    const initialLogs = {};
    clusters.forEach(c => { initialLogs[c.id] = []; });
    setChatLogs(initialLogs);

    // Start pipeline
    await fetch('/api/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: input, description: input, url: '' }),
    });

    // Listen to SSE
    const es = new EventSource('/api/stream');
    eventSourceRef.current = es;

    es.onmessage = (e) => {
      const data = JSON.parse(e.data);

      switch (data.type) {
        // Research events
        case 'research_start':
          setResearchStatus('Discovering competitors...');
          break;
        case 'research_progress':
          if (data.step === 'discovering_competitors') {
            setResearchStatus('Discovering competitors...');
          } else if (data.step === 'competitors_found') {
            setCompetitors(data.competitors || []);
            setResearchStatus(`Found ${(data.competitors || []).length} competitors`);
          } else if (data.step === 'researching_product') {
            setResearchStatus(`Researching ${data.name}...`);
          } else if (data.step === 'researching_competitor') {
            setResearchStatus(`Researching ${data.name}...`);
          }
          break;
        case 'research_complete':
          setCompetitors(data.competitors || []);
          setResearchStatus('Research complete');
          break;

        // Chat events
        case 'chat_start':
          setPhase('chatting');
          setChatRunning(true);
          break;
        case 'message':
          setChatLogs(prev => ({
            ...prev,
            [data.cluster_id]: [...(prev[data.cluster_id] || []), {
              type: 'message', name: data.name, message: data.message,
              job: data.job, round: data.round,
            }],
          }));
          break;
        case 'system':
          setChatLogs(prev => ({
            ...prev,
            [data.cluster_id]: [...(prev[data.cluster_id] || []), {
              type: 'system', message: data.message,
            }],
          }));
          break;
        case 'vote':
          setChatLogs(prev => ({
            ...prev,
            [data.cluster_id]: [...(prev[data.cluster_id] || []), {
              type: 'vote', name: data.name, choice: data.choice, reason: data.reason,
            }],
          }));
          break;
        case 'results':
          setChatResults(prev => ({
            ...prev,
            [data.cluster_id]: {
              product_pct: data.product_pct,
              competitor_pct: data.competitor_pct,
              pass_pct: data.pass_pct,
              summary: data.summary,
            },
          }));
          break;
        case 'chat_done':
          setChatRunning(false);
          setChatDone(true);
          break;

        // Report events
        case 'report_ready':
          setReport(data.report);
          setPhase('report');
          break;

        // Error / done
        case 'error':
          console.error('Pipeline error:', data.message);
          setResearchStatus(`Error: ${data.message}`);
          break;
        case 'done':
          es.close();
          eventSourceRef.current = null;
          break;
      }
    };

    es.onerror = () => {
      console.error('SSE connection lost');
      es.close();
      eventSourceRef.current = null;
    };
  }

  function handleNodeClick(node) {
    if (phase === 'hero' || phase === 'input') return;
    setSelectedNode(prev => prev?.id === node.id ? null : node);
  }

  function handleNodeHover(node, x, y) {
    if (!node) {
      setTooltip(null);
      return;
    }
    setTooltip({
      x, y,
      jobTitle: node.persona.jobTitle,
      province: node.persona.province,
    });
  }

  function handleCloseDetail() {
    setSelectedNode(null);
  }

  const selectedCluster = selectedNode?.clusterId != null
    ? clusters.find(c => c.id === selectedNode.clusterId)
    : null;

  // Map phase for ThreeGraph (it expects clustering/scanning/results)
  const graphPhase = phase === 'researching' ? 'clustering'
    : phase === 'chatting' ? 'results'
    : phase === 'report' ? 'results'
    : phase;

  return (
    <div className="app">
      {/* 3D Graph — always mounted */}
      <ThreeGraph
        phase={graphPhase}
        nodes={nodes}
        edges={edges}
        clusters={clusters}
        selectedNodeId={selectedNode?.id ?? null}
        hoveredClusterId={hoveredCluster}
        onNodeClick={handleNodeClick}
        onNodeHover={handleNodeHover}
      />

      {/* Hero overlay with inline input */}
      <HeroOverlay
        visible={phase === 'hero'}
        onRun={handleRun}
      />

      {/* Top bar (after run) */}
      {phase !== 'hero' && phase !== 'input' && (
        <TopBar productName={productName} />
      )}

      {/* Progress bar */}
      {(phase === 'researching' || phase === 'chatting' || phase === 'report') && (
        <ProgressBar phase={phase} statusText={researchStatus} />
      )}

      {/* Cluster legend */}
      {(phase === 'researching' || phase === 'chatting' || phase === 'report') && (
        <ClusterLegend
          clusters={clusters}
          onClusterHover={setHoveredCluster}
        />
      )}

      {/* Chat panel (fullscreen overlay during chatting phase) */}
      <ChatPanel
        visible={phase === 'chatting'}
        clusters={clusters}
        chatLogs={chatLogs}
        chatResults={chatResults}
        running={chatRunning}
        done={chatDone}
      />

      {/* Report panel */}
      <ReportPanel
        visible={phase === 'report'}
        report={report}
        onBack={() => setPhase('chatting')}
      />

      {/* Node detail panel */}
      {selectedNode && (
        <NodeDetailPanel
          node={selectedNode}
          cluster={selectedCluster}
          onClose={handleCloseDetail}
        />
      )}

      {/* Tooltip */}
      {tooltip && (
        <div
          className="tooltip"
          style={{ left: tooltip.x + 14, top: tooltip.y + 14 }}
        >
          <div className="tooltip-job">{tooltip.jobTitle}</div>
          <div className="tooltip-location">{tooltip.province}</div>
        </div>
      )}
    </div>
  );
}

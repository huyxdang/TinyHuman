import { useState, useEffect, useRef, useCallback } from 'react';
import ThreeGraph from './components/ThreeGraph';
import HeroOverlay from './components/HeroOverlay';
import TopBar from './components/TopBar';
import ProgressBar from './components/ProgressBar';
import ChatPanel from './components/ChatPanel';
import LeaderboardPanel from './components/LeaderboardPanel';
import NodePopup from './components/NodePopup';
import ResearchCard from './components/ResearchCard';
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
      x: r * Math.sin(phi) * Math.cos(theta) + (Math.random() - 0.5) * 3,
      y: r * Math.sin(phi) * Math.sin(theta) + (Math.random() - 0.5) * 3,
      z: r * Math.cos(phi) + (Math.random() - 0.5) * 3,
      label: p.name,
      color,
      size: 3,
      alpha: 0.8,
      persona: {
        name: p.name,
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
        interests: p.interests || [],
      },
      matchScore: 0,
      clusterId: personaCluster[p.id] ?? null,
    };
  });
}

function normalizeProductLabel(value) {
  return `${value || ''}`
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
}

function knowledgeMatchesInput(knowledge, input) {
  if (!knowledge?.product || !input) return false;

  const requested = normalizeProductLabel(input);
  const candidates = [
    normalizeProductLabel(knowledge.product.input_name),
    normalizeProductLabel(knowledge.product.name),
    ...((knowledge.product.input_aliases || []).map(normalizeProductLabel)),
  ].filter(Boolean);

  return candidates.some(candidate => (
    candidate === requested || candidate.includes(requested) || requested.includes(candidate)
  ));
}

export default function App() {
  // --- State ---
  const [phase, setPhase] = useState('hero'); // hero, input, researching, chatting, report
  const [productName, setProductName] = useState('');
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [popupPos, setPopupPos] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const [grouped, setGrouped] = useState(false);

  // Pipeline state
  const [researchStatus, setResearchStatus] = useState('');
  const [competitors, setCompetitors] = useState([]);
  const [showResearchCard, setShowResearchCard] = useState(false);
  const [knowledge, setKnowledge] = useState(null);
  const [chatLogs, setChatLogs] = useState({});
  const [chatResults, setChatResults] = useState({});
  const [waitingForChat, setWaitingForChat] = useState(false);
  const [chatRunning, setChatRunning] = useState(false);
  const [chatDone, setChatDone] = useState(false);
  const [chatPanelOpen, setChatPanelOpen] = useState(false);
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
    const requestedProduct = input.trim();

    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }

    setProductName(requestedProduct);
    setSelectedNode(null);
    setResearchStatus('Researching your competitors...');

    // Set match scores for clustered nodes so ThreeGraph renders them
    setNodes(prev => prev.map(n => ({
      ...n,
      matchScore: n.clusterId != null ? 0.6 + Math.random() * 0.35 : 0,
    })));

    setPhase('researching');
    setGrouped(false);
    setCompetitors([]);
    setShowResearchCard(false);
    setKnowledge(null);
    setChatLogs({});
    setChatResults({});
    setWaitingForChat(false);
    setChatRunning(false);
    setChatDone(false);
    setChatPanelOpen(false);
    setReport(null);

    // Initialize empty chat logs for each cluster
    const initialLogs = {};
    clusters.forEach(c => { initialLogs[c.id] = []; });
    setChatLogs(initialLogs);

    // Start pipeline
    await fetch('/api/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: requestedProduct, description: requestedProduct, url: '' }),
    });

    // Listen to SSE
    const es = new EventSource('/api/stream');
    eventSourceRef.current = es;

    es.onmessage = (e) => {
      const data = JSON.parse(e.data);

      switch (data.type) {
        // Research events
        case 'research_start':
          setResearchStatus('Starting web research...');
          break;
        case 'research_progress':
          if (data.step === 'discovering_competitors') {
            setResearchStatus('Analyzing search results for competitors...');
          } else if (data.step === 'competitors_found') {
            setCompetitors(data.competitors || []);
            setResearchStatus(`Found ${(data.competitors || []).length} competitors`);
            // Show research card with competitor names as soon as they're found
            const compNames = data.competitors || [];
            setKnowledge(prev => {
              if (prev) return prev; // don't overwrite if already loaded
              const fallback = {
                product: { name: requestedProduct, input_name: requestedProduct, description: requestedProduct },
                competitors: {},
              };
              compNames.forEach(name => {
                fallback.competitors[name] = { name };
              });
              return fallback;
            });
            setShowResearchCard(true);
          } else if (data.step === 'researching_product') {
            setResearchStatus(`Searching the web for ${data.name}...`);
          } else if (data.step === 'researching_competitor') {
            setResearchStatus(`Deep-diving competitor: ${data.name}...`);
          } else if (data.step === 'web_search_query') {
            const prefix = data.label || 'Searching the web';
            const count = data.current && data.total ? ` (${data.current}/${data.total})` : '';
            setResearchStatus(`${prefix}${count}: ${data.query}`);
          }
          break;
        case 'research_complete':
          setCompetitors(data.competitors || []);
          setResearchStatus('Research complete');
          if (knowledgeMatchesInput(data.knowledge, requestedProduct)) {
            setKnowledge(data.knowledge);
          } else {
            // Fall back to the API only if it matches the current request.
            const tryFetch = async () => {
              try {
                const r = await fetch('/api/knowledge');
                if (!r.ok) return;
                const k = await r.json();
                if (knowledgeMatchesInput(k, requestedProduct)) {
                  setKnowledge(k);
                }
              } catch {
                // Keep the in-progress fallback card if fresh knowledge is unavailable.
              }
            };
            tryFetch();
          }
          setShowResearchCard(true);
          break;

        // Chat gate
        case 'waiting_for_chat':
          setWaitingForChat(true);
          break;

        // Chat events
        case 'chat_start':
          setPhase('chatting');
          setWaitingForChat(false);
          setChatRunning(true);
          setChatPanelOpen(true);
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

  function handleNodeClick(node, screenX, screenY) {
    setSelectedNode(prev => prev?.id === node.id ? null : node);
    setPopupPos({ x: screenX, y: screenY });
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

  function handleStartGossip() {
    fetch('/api/start-chat', { method: 'POST' });
    setShowResearchCard(false);
  }

  function handleCloseDetail() {
    setSelectedNode(null);
  }

  function handleHome() {
    // Close SSE connection if active
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    // Reset all state back to landing page
    setPhase('hero');
    setProductName('');
    setSelectedNode(null);
    setPopupPos(null);
    setTooltip(null);
    setGrouped(false);
    setResearchStatus('');
    setCompetitors([]);
    setShowResearchCard(false);
    setKnowledge(null);
    setChatLogs({});
    setChatResults({});
    setWaitingForChat(false);
    setChatRunning(false);
    setChatDone(false);
    setChatPanelOpen(false);
    setReport(null);
  }

  const selectedCluster = selectedNode?.clusterId != null
    ? clusters.find(c => c.id === selectedNode.clusterId)
    : null;

  // ThreeGraph always uses 'hero' phase — grouping is controlled by the toggle
  const graphPhase = 'hero';

  return (
    <div className="app">
      {/* 3D Graph — always mounted */}
      <ThreeGraph
        phase={graphPhase}
        nodes={nodes}
        edges={edges}
        clusters={clusters}
        selectedNodeId={selectedNode?.id ?? null}
        hoveredClusterId={null}
        onNodeClick={handleNodeClick}
        onNodeHover={handleNodeHover}
        grouped={grouped}
        chatPanelOpen={chatPanelOpen}
      />

      {/* Hero overlay with inline input */}
      <HeroOverlay
        visible={phase === 'hero'}
        onRun={handleRun}
        grouped={grouped}
        onToggleGroup={() => setGrouped(g => !g)}
      />

      {/* Group toggle button (visible in non-hero phases) */}
      {phase !== 'hero' && (
        <button
          className="group-toggle-floating"
          onClick={() => setGrouped(g => !g)}
        >
          {grouped ? 'Spread Out' : 'Group by Similarities'}
        </button>
      )}

      {/* Top bar (after run) */}
      {phase !== 'hero' && phase !== 'input' && (
        <TopBar productName={productName} onHome={handleHome} />
      )}

      {/* Progress bar */}
      {(phase === 'researching' || phase === 'chatting' || phase === 'report') && (
        <ProgressBar phase={phase} statusText={researchStatus} />
      )}


      {/* Research loading overlay */}
      {phase === 'researching' && !waitingForChat && !showResearchCard && (
        <div className="research-loading">
          <div className="research-loading-spinner" />
          <div className="research-loading-text">{researchStatus || 'Researching your competitors...'}</div>
        </div>
      )}

      {/* Research card (after research complete) */}
      <ResearchCard
        visible={showResearchCard}
        knowledge={knowledge}
        productName={productName}
        onClose={() => setShowResearchCard(false)}
      />

      {/* Start Gossip button */}
      {waitingForChat && (
        <button className="start-gossip-btn" onClick={handleStartGossip}>
          Start Gossip
        </button>
      )}

      {/* Chat drawer */}
      <ChatPanel
        visible={phase === 'chatting' || phase === 'report'}
        open={chatPanelOpen}
        onClose={() => setChatPanelOpen(false)}
        clusters={clusters}
        chatLogs={chatLogs}
        chatResults={chatResults}
        running={chatRunning}
        done={chatDone}
      />

      {/* Floating chat toggle button */}
      {(phase === 'chatting' || phase === 'report') && !chatPanelOpen && (
        <button className="chat-toggle-btn" onClick={() => setChatPanelOpen(true)}>
          Chat
        </button>
      )}

      {/* Leaderboard panel */}
      <LeaderboardPanel
        visible={phase === 'report'}
        report={report}
        onBack={() => setPhase('chatting')}
      />

      {/* Node popup card */}
      {selectedNode && (
        <NodePopup
          node={selectedNode}
          cluster={selectedCluster}
          position={popupPos}
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

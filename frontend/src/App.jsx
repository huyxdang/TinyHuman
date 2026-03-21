import { useState, useEffect, useRef, useCallback } from 'react';
import ThreeGraph from './components/ThreeGraph';
import HeroOverlay from './components/HeroOverlay';
import InputModal from './components/InputModal';
import TopBar from './components/TopBar';
import ProgressBar from './components/ProgressBar';
import ClusterLegend from './components/ClusterLegend';
import ResultsPanel from './components/ResultsPanel';
import ChatPanel from './components/ChatPanel';
import NodeDetailPanel from './components/NodeDetailPanel';
import { generateNodes, generateEdges, simulateProduct } from './data/mockData';
import './App.css';

export default function App() {
  // --- State ---
  const [phase, setPhase] = useState('hero'); // hero, input, clustering, scanning, results
  const [productName, setProductName] = useState('');
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [discoverability, setDiscoverability] = useState(0);
  const [qualifying, setQualifying] = useState(0);
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredCluster, setHoveredCluster] = useState(null);
  const [tooltip, setTooltip] = useState(null);

  const timersRef = useRef([]);

  // --- Generate initial data on mount ---
  useEffect(() => {
    const n = generateNodes(1500);
    const e = generateEdges(n, 3000);
    setNodes(n);
    setEdges(e);
  }, []);

  // --- Cleanup timers ---
  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  // --- Handlers ---
  function handleTryIt() {
    setPhase('input');
  }

  function handleCloseModal() {
    setPhase('hero');
  }

  function handleRun(input) {
    setProductName(input);
    setPhase('clustering');
    setSelectedNode(null);

    // Simulate product analysis
    const result = simulateProduct(nodes, input);
    setNodes(result.nodes);
    setClusters(result.clusters);
    setDiscoverability(result.discoverability);
    setQualifying(result.qualifying);

    // Clear any existing timers
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    // After clustering animation (~4s), start scanning
    const t1 = setTimeout(() => {
      setPhase('scanning');

      // Simulate TinyFish scan results arriving per cluster
      result.clusters.forEach((cluster, i) => {
        const t = setTimeout(() => {
          setClusters(prev => prev.map(c =>
            c.id === cluster.id ? { ...c, scanned: true } : c
          ));

          // After all clusters scanned, show results
          if (i === result.clusters.length - 1) {
            const tFinal = setTimeout(() => {
              setPhase('results');
            }, 800);
            timersRef.current.push(tFinal);
          }
        }, 1200 + i * 1500);
        timersRef.current.push(t);
      });
    }, 4000);
    timersRef.current.push(t1);
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
      x,
      y,
      jobTitle: node.persona.jobTitle,
      province: node.persona.province,
    });
  }

  function handleCloseDetail() {
    setSelectedNode(null);
  }

  // Find the cluster for the selected node
  const selectedCluster = selectedNode?.clusterId !== null && selectedNode?.clusterId !== undefined
    ? clusters.find(c => c.id === selectedNode.clusterId)
    : null;

  return (
    <div className="app">
      {/* 3D Graph — always mounted */}
      <ThreeGraph
        phase={phase}
        nodes={nodes}
        edges={edges}
        clusters={clusters}
        selectedNodeId={selectedNode?.id ?? null}
        hoveredClusterId={hoveredCluster}
        onNodeClick={handleNodeClick}
        onNodeHover={handleNodeHover}
      />

      {/* Hero overlay */}
      <HeroOverlay
        visible={phase === 'hero'}
        onTryIt={handleTryIt}
      />

      {/* Input modal */}
      <InputModal
        isOpen={phase === 'input'}
        onClose={handleCloseModal}
        onRun={handleRun}
      />

      {/* Top bar (after run) */}
      {phase !== 'hero' && phase !== 'input' && (
        <TopBar productName={productName} />
      )}

      {/* Progress bar (during clustering/scanning) */}
      {(phase === 'clustering' || phase === 'scanning' || phase === 'results') && (
        <ProgressBar phase={phase} />
      )}

      {/* Cluster legend (after clustering) */}
      {(phase === 'clustering' || phase === 'scanning' || phase === 'results') && (
        <ClusterLegend
          clusters={clusters}
          onClusterHover={setHoveredCluster}
        />
      )}

      {/* Results panel */}
      {phase === 'results' && (
        <>
          <ResultsPanel
            clusters={clusters}
            discoverability={discoverability}
            qualifying={qualifying}
          />
          <button
            className="chat-launch-btn"
            onClick={() => setPhase('chatting')}
            style={{
              position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
              zIndex: 25, background: '#2563eb', color: 'white', border: 'none',
              padding: '12px 28px', borderRadius: 8, fontSize: 14, fontWeight: 600,
              cursor: 'pointer', boxShadow: '0 4px 20px rgba(37,99,235,0.4)',
            }}
          >
            Start Group Discussion
          </button>
        </>
      )}

      {/* Chat panel (fullscreen overlay) */}
      <ChatPanel
        visible={phase === 'chatting'}
        clusters={clusters}
        apiBase="http://localhost:8000"
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

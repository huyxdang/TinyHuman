import { useState, useEffect, useRef } from 'react';

const CLUSTER_COLORS = ['#FF6B35', '#4ECDC4', '#7B68EE', '#FF85A2', '#22c55e', '#f59e0b'];

function Avatar({ name, color }) {
  const letter = (name || '?')[0].toUpperCase();
  return (
    <div className="chat-avatar" style={{ background: color || 'var(--accent)' }}>
      {letter}
    </div>
  );
}

export default function ChatPanel({
  visible,
  open,
  onClose,
  clusters,
  chatLogs,
  chatResults,
  running,
  done,
}) {
  const [activeTab, setActiveTab] = useState(0);
  const scrollRef = useRef(null);

  // Set first tab when clusters load
  useEffect(() => {
    if (clusters?.length > 0 && activeTab >= clusters.length) {
      setActiveTab(0);
    }
  }, [clusters]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatLogs, activeTab]);

  if (!visible) return null;

  const activeCluster = clusters?.[activeTab];
  const clusterId = activeCluster?.id;
  const messages = chatLogs[clusterId] || [];
  const results = chatResults[clusterId];

  return (
    <div className={`chat-drawer ${open ? 'chat-drawer-open' : ''}`}>
      <div className="chat-drawer-header">
        <h3>Group Discussions</h3>
        <div className="chat-drawer-status">
          {done ? 'Complete' : running ? 'Live' : 'Waiting...'}
          {running && <span className="chat-live-dot" />}
        </div>
        <button className="chat-drawer-close" onClick={onClose}>&times;</button>
      </div>

      {/* Cluster tabs */}
      <div className="chat-tabs">
        {(clusters || []).map((cluster, i) => (
          <button
            key={cluster.id}
            className={`chat-tab ${activeTab === i ? 'chat-tab-active' : ''}`}
            onClick={() => setActiveTab(i)}
            style={activeTab === i ? { borderBottomColor: CLUSTER_COLORS[i % CLUSTER_COLORS.length] } : {}}
          >
            <span
              className="chat-tab-dot"
              style={{ background: CLUSTER_COLORS[i % CLUSTER_COLORS.length] }}
            />
            <span className="chat-tab-label">{cluster.label || `Cluster ${cluster.id}`}</span>
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="chat-messages" ref={scrollRef}>
        {messages.map((msg, j) => {
          if (msg.type === 'system') {
            return (
              <div key={j} className="chat-bubble-system">
                {msg.message}
              </div>
            );
          }
          if (msg.type === 'vote') {
            return (
              <div key={j} className="chat-bubble-vote">
                <Avatar name={msg.name} color={CLUSTER_COLORS[activeTab % CLUSTER_COLORS.length]} />
                <div className="chat-bubble-content">
                  <span className="chat-bubble-name">{msg.name}</span>
                  <div className="chat-vote-badge">
                    Voted: <strong>{msg.choice}</strong>
                  </div>
                  <div className="chat-bubble-text">{msg.reason}</div>
                </div>
              </div>
            );
          }
          return (
            <div key={j} className="chat-bubble">
              <Avatar name={msg.name} color={CLUSTER_COLORS[activeTab % CLUSTER_COLORS.length]} />
              <div className="chat-bubble-content">
                <div className="chat-bubble-top">
                  <span className="chat-bubble-name">{msg.name}</span>
                  <span className="chat-bubble-meta">{msg.job}</span>
                </div>
                <div className="chat-bubble-text">{msg.message}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Results bar */}
      {results && (
        <div className="chat-drawer-results">
          <div className="chat-results-summary">{results.summary}</div>
          <div className="chat-results-bars">
            <div className="chat-result-bar chat-result-product" style={{ width: `${results.product_pct}%` }}>
              {results.product_pct > 10 ? `${results.product_pct}%` : ''}
            </div>
            <div className="chat-result-bar chat-result-competitor" style={{ width: `${results.competitor_pct}%` }}>
              {results.competitor_pct > 10 ? `${results.competitor_pct}%` : ''}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useEffect, useRef } from 'react';

const CLUSTER_COLORS = ['#FF6B35', '#4ECDC4', '#7B68EE', '#FF85A2'];

export default function ChatPanel({ visible, clusters, chatLogs, chatResults, running, done }) {
  const scrollRefs = useRef({});

  // Auto-scroll
  useEffect(() => {
    Object.keys(scrollRefs.current).forEach(cid => {
      const el = scrollRefs.current[cid];
      if (el) el.scrollTop = el.scrollHeight;
    });
  }, [chatLogs]);

  if (!visible) return null;

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <h2>Group Discussions</h2>
        <span className="chat-status">
          {done ? 'Discussion Complete' : running ? 'Running...' : 'Waiting...'}
        </span>
      </div>

      <div className="chat-grid">
        {(clusters || []).map((cluster, i) => (
          <div
            key={cluster.id}
            className="chat-box"
            style={{ borderTopColor: CLUSTER_COLORS[i % CLUSTER_COLORS.length] }}
          >
            <div className="chat-box-header">
              <div className="chat-box-title">
                <span
                  className="chat-box-dot"
                  style={{ background: CLUSTER_COLORS[i % CLUSTER_COLORS.length] }}
                />
                {cluster.label || cluster.name || `Cluster ${cluster.id}`}
              </div>
              <span className="chat-box-count">{cluster.size} people</span>
            </div>

            <div
              className="chat-messages"
              ref={el => { scrollRefs.current[cluster.id] = el; }}
            >
              {(chatLogs[cluster.id] || []).map((msg, j) => {
                if (msg.type === 'system') {
                  return (
                    <div key={j} className="chat-msg chat-msg-system">
                      {msg.message}
                    </div>
                  );
                }
                if (msg.type === 'vote') {
                  return (
                    <div key={j} className="chat-msg chat-msg-vote">
                      <span className="chat-msg-name">{msg.name}</span>
                      <span className="chat-msg-choice">{msg.choice}</span>
                      {' — '}{msg.reason}
                    </div>
                  );
                }
                return (
                  <div key={j} className="chat-msg">
                    <span className="chat-msg-name">{msg.name}</span>
                    <span className="chat-msg-text">{msg.message}</span>
                    <span className="chat-msg-meta">{msg.job} · R{msg.round}</span>
                  </div>
                );
              })}
            </div>

            {chatResults[cluster.id] && (
              <div className="chat-results-bar">
                <div className="chat-results-text">{chatResults[cluster.id].summary}</div>
                <div className="chat-results-segments">
                  <div className="chat-bar-segment chat-bar-product" style={{ width: `${chatResults[cluster.id].product_pct}%` }} />
                  <div className="chat-bar-segment chat-bar-competitor" style={{ width: `${chatResults[cluster.id].competitor_pct}%` }} />
                  <div className="chat-bar-segment chat-bar-pass" style={{ width: `${chatResults[cluster.id].pass_pct}%` }} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

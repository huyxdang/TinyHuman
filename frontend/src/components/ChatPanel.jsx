import { useState, useEffect, useRef } from 'react';

const CLUSTER_COLORS = ['#FF6B35', '#4ECDC4', '#7B68EE', '#FF85A2'];

export default function ChatPanel({ visible, clusters, apiBase }) {
  const [chatLogs, setChatLogs] = useState({});  // clusterId -> messages[]
  const [results, setResults] = useState({});     // clusterId -> { product_pct, competitor_pct, pass_pct, summary }
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const scrollRefs = useRef({});

  useEffect(() => {
    if (!visible) return;
    // Initialize empty logs for each cluster
    const initial = {};
    (clusters || []).forEach(c => { initial[c.id] = []; });
    setChatLogs(initial);
    setResults({});
    setDone(false);
  }, [visible, clusters]);

  function startChat() {
    if (running) return;
    setRunning(true);

    const base = apiBase || 'http://localhost:8000';
    fetch(`${base}/api/start`, { method: 'POST' });

    const es = new EventSource(`${base}/api/stream`);
    es.onmessage = (e) => {
      const data = JSON.parse(e.data);

      if (data.type === 'message') {
        setChatLogs(prev => ({
          ...prev,
          [data.cluster_id]: [...(prev[data.cluster_id] || []), {
            type: 'message',
            name: data.name,
            message: data.message,
            job: data.job,
            round: data.round,
          }],
        }));
      } else if (data.type === 'system') {
        setChatLogs(prev => ({
          ...prev,
          [data.cluster_id]: [...(prev[data.cluster_id] || []), {
            type: 'system',
            message: data.message,
          }],
        }));
      } else if (data.type === 'vote') {
        setChatLogs(prev => ({
          ...prev,
          [data.cluster_id]: [...(prev[data.cluster_id] || []), {
            type: 'vote',
            name: data.name,
            choice: data.choice,
            reason: data.reason,
          }],
        }));
      } else if (data.type === 'results') {
        setResults(prev => ({
          ...prev,
          [data.cluster_id]: {
            product_pct: data.product_pct,
            competitor_pct: data.competitor_pct,
            pass_pct: data.pass_pct,
            summary: data.summary,
          },
        }));
      } else if (data.type === 'done') {
        setRunning(false);
        setDone(true);
        es.close();
      }
    };

    es.onerror = () => {
      setRunning(false);
      es.close();
    };
  }

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
        <button
          className="chat-start-btn"
          onClick={startChat}
          disabled={running || done}
        >
          {done ? 'Discussion Complete' : running ? 'Running...' : 'Start Discussion'}
        </button>
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

            {results[cluster.id] && (
              <div className="chat-results-bar">
                <div className="chat-results-text">{results[cluster.id].summary}</div>
                <div className="chat-results-segments">
                  <div className="chat-bar-segment chat-bar-product" style={{ width: `${results[cluster.id].product_pct}%` }} />
                  <div className="chat-bar-segment chat-bar-competitor" style={{ width: `${results[cluster.id].competitor_pct}%` }} />
                  <div className="chat-bar-segment chat-bar-pass" style={{ width: `${results[cluster.id].pass_pct}%` }} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

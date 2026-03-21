import { generateNodeSearchResult } from '../data/mockData';

export default function NodeDetailPanel({ node, cluster, onClose }) {
  if (!node) return null;

  const p = node.persona;
  const searchResult = generateNodeSearchResult(node, cluster);

  return (
    <div className="node-detail">
      <div className="node-detail-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h3>Persona #{node.id.toLocaleString()}</h3>
          {cluster && (
            <span
              className="node-detail-segment"
              style={{ background: cluster.color }}
            >
              {cluster.industry}
            </span>
          )}
        </div>
        <button className="node-detail-close" onClick={onClose}>&times;</button>
      </div>

      <div className="node-detail-body">
        <div className="node-detail-grid">
          <span className="node-detail-key">Age</span>
          <span className="node-detail-value">{p.age}</span>

          <span className="node-detail-key">Gender</span>
          <span className="node-detail-value">{p.gender}</span>

          <span className="node-detail-key">Province</span>
          <span className="node-detail-value">{p.province} ({p.region})</span>

          <span className="node-detail-key">Job</span>
          <span className="node-detail-value">{p.jobTitle}</span>

          <span className="node-detail-key">Industry</span>
          <span className="node-detail-value">{p.industry}</span>

          <span className="node-detail-key">Company</span>
          <span className="node-detail-value">{p.companySize}</span>

          <span className="node-detail-key">Education</span>
          <span className="node-detail-value">{p.educationLevel}</span>

          <span className="node-detail-key">Income</span>
          <span className="node-detail-value">{p.incomeBracket}</span>

          <span className="node-detail-key">Platform</span>
          <span className="node-detail-value">{p.primaryPlatform}</span>

          <span className="node-detail-key">Language</span>
          <span className="node-detail-value">{p.searchLanguage}</span>
        </div>

        {/* Frustrations */}
        <div className="node-detail-section">
          <h4>Frustrations</h4>
          {p.frustrations.map((f, i) => (
            <div key={i} className="frustration-item">{f}</div>
          ))}
        </div>

        {/* Search query + result */}
        {searchResult && (
          <div className="node-detail-section">
            <h4>Search Query</h4>
            <div className="search-query-box">
              <div className="search-query-text">&ldquo;{searchResult.query}&rdquo;</div>
            </div>
            <div className="search-match-row">
              <span>Match Score:</span>
              <span style={{ fontWeight: 600 }}>{node.matchScore.toFixed(2)}</span>
              <span style={{ margin: '0 4px' }}>&middot;</span>
              <span>Rank:</span>
              <span style={{
                fontWeight: 600,
                color: searchResult.found ? 'var(--found)' : 'var(--invisible)',
              }}>
                {searchResult.found ? `#${searchResult.rank}` : 'Not found'}
              </span>
            </div>
          </div>
        )}

        {/* TinyFish session */}
        {searchResult && (
          <div className="node-detail-section">
            <h4>TinyFish Session</h4>
            <div className="tinyfish-session">
              <div className="tinyfish-session-header">TinyFish Agent</div>
              {searchResult.steps.map((step, i) => (
                <div key={i} className="tinyfish-step">
                  <span className={`tinyfish-step-icon ${step.done ? 'done' : 'fail'}`}>
                    {step.done ? '\u2713' : '\u2717'}
                  </span>
                  <span>{step.text}</span>
                </div>
              ))}

              <div className="tinyfish-results">
                <h5>Top results instead</h5>
                {searchResult.topResults.slice(0, 5).map((r, i) => (
                  <div
                    key={i}
                    className={`tinyfish-result-item ${r.isProduct ? 'is-product' : ''}`}
                  >
                    {r.rank}. {r.title} — {r.url}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

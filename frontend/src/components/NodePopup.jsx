export default function NodePopup({ node, cluster, position, onClose }) {
  if (!node || !position) return null;

  const p = node.persona;

  // Clamp position to viewport
  const x = Math.min(position.x, window.innerWidth - 340);
  const y = Math.min(position.y, window.innerHeight - 420);

  return (
    <div className="node-popup-backdrop" onClick={onClose}>
      <div
        className="node-popup"
        style={{ left: Math.max(8, x), top: Math.max(8, y) }}
        onClick={e => e.stopPropagation()}
      >
        <div className="node-popup-header">
          <div>
            <div className="node-popup-name">{p.name}</div>
            {cluster && (
              <span
                className="node-popup-cluster"
                style={{ background: cluster.color }}
              >
                {cluster.label}
              </span>
            )}
          </div>
          <button className="node-popup-close" onClick={onClose}>&times;</button>
        </div>

        <div className="node-popup-grid">
          <div className="node-popup-field">
            <span className="node-popup-label">Age</span>
            <span>{p.age}</span>
          </div>
          <div className="node-popup-field">
            <span className="node-popup-label">Gender</span>
            <span>{p.gender}</span>
          </div>
          <div className="node-popup-field">
            <span className="node-popup-label">Province</span>
            <span>{p.province}{p.region ? ` (${p.region})` : ''}</span>
          </div>
          <div className="node-popup-field">
            <span className="node-popup-label">Job</span>
            <span>{p.jobTitle}</span>
          </div>
          <div className="node-popup-field">
            <span className="node-popup-label">Industry</span>
            <span>{p.industry}</span>
          </div>
          <div className="node-popup-field">
            <span className="node-popup-label">Education</span>
            <span>{p.educationLevel}</span>
          </div>
          <div className="node-popup-field">
            <span className="node-popup-label">Income</span>
            <span>{p.incomeBracket}</span>
          </div>
          <div className="node-popup-field">
            <span className="node-popup-label">Platform</span>
            <span>{p.primaryPlatform}</span>
          </div>
        </div>

        {p.interests && p.interests.length > 0 && (
          <div className="node-popup-section">
            <div className="node-popup-section-title">Interests</div>
            <div className="node-popup-interests">
              {p.interests.map((interest, i) => (
                <span key={i} className="node-popup-interest-tag">{interest}</span>
              ))}
            </div>
          </div>
        )}

        {p.frustrations && p.frustrations.length > 0 && (
          <div className="node-popup-section">
            <div className="node-popup-section-title">Frustrations</div>
            <ul className="node-popup-frustrations">
              {p.frustrations.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

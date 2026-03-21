export default function ResultsPanel({ clusters, discoverability, qualifying }) {
  if (!clusters || clusters.length === 0) return null;

  const foundClusters = clusters.filter(c => c.found);
  const invisibleClusters = clusters.filter(c => !c.found);

  // Find biggest gap and best ranking
  const biggestGap = invisibleClusters.sort((a, b) => b.size - a.size)[0];
  const bestRank = foundClusters.sort((a, b) => (a.rank || 99) - (b.rank || 99))[0];

  return (
    <div className="results-panel">
      <div className={`results-score ${discoverability >= 50 ? 'good' : 'bad'}`}>
        {discoverability}%
      </div>
      <div className="results-label">Discoverability Score</div>

      <div className="results-stats">
        <div className="results-stat">
          <span className="results-stat-value">{qualifying?.toLocaleString()}</span>
          <span className="results-stat-label">qualifying personas</span>
        </div>
        <div className="results-stat">
          <span className="results-stat-value">{clusters.length}</span>
          <span className="results-stat-label">segments found</span>
        </div>
        <div className="results-stat">
          <span className="results-stat-value">{invisibleClusters.length}</span>
          <span className="results-stat-label">invisible</span>
        </div>
      </div>

      <div className="results-divider" />

      {biggestGap && (
        <div className="results-card gap">
          <div className="results-card-title">Biggest Gap</div>
          <div className="results-card-body">
            {biggestGap.size.toLocaleString()} personas search &ldquo;{biggestGap.topQuery}&rdquo;
            &mdash; you rank nowhere.
            <br />
            <span style={{ fontSize: 12, color: '#999', marginTop: 4, display: 'inline-block' }}>
              Instead: {biggestGap.competitors?.join(', ')}
            </span>
          </div>
        </div>
      )}

      {bestRank && (
        <div className="results-card win">
          <div className="results-card-title">Best Ranking</div>
          <div className="results-card-body">
            {bestRank.name.split('(')[0].trim()} search &ldquo;{bestRank.topQuery}&rdquo;
            &mdash; you rank #{bestRank.rank}.
          </div>
        </div>
      )}

      <div className="results-divider" />

      <div style={{ fontSize: 12, color: '#999', marginTop: 8 }}>
        Click any node in the graph to see the full persona and TinyFish search session.
      </div>
    </div>
  );
}

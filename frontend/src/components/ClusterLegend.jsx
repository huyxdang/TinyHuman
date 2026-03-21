export default function ClusterLegend({ clusters, onClusterHover }) {
  if (!clusters || clusters.length === 0) return null;

  return (
    <div className="cluster-legend">
      {clusters.map(cluster => (
        <div
          key={cluster.id}
          className="cluster-item"
          onMouseEnter={() => onClusterHover?.(cluster.id)}
          onMouseLeave={() => onClusterHover?.(null)}
        >
          <div className="cluster-dot" style={{ background: cluster.color }} />
          <div className="cluster-info">
            <div className="cluster-name">{cluster.name}</div>
            <div className="cluster-meta">
              {cluster.size.toLocaleString()} personas
              {cluster.scanned && cluster.topQuery && (
                <> &middot; &ldquo;{cluster.topQuery}&rdquo;</>
              )}
            </div>
          </div>
          {cluster.scanned && (
            <div className={`cluster-badge ${cluster.found ? 'found' : 'invisible'}`}>
              {cluster.found ? `#${cluster.rank}` : '\u2717'}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

import { useState } from 'react';

const CLUSTER_COLORS = ['#FF6B35', '#4ECDC4', '#7B68EE', '#FF85A2', '#22c55e', '#f59e0b'];

function getRankIcon(rank) {
  if (rank === 0) return '\u{1F947}'; // gold medal
  if (rank === 1) return '\u{1F948}'; // silver medal
  if (rank === 2) return '\u{1F949}'; // bronze medal
  return `#${rank + 1}`;
}

function LeaderboardTable({ entries, maxVotes, impressions }) {
  return (
    <div className="lb-table">
      {entries.map((entry, i) => (
        <div key={entry.name} className={`lb-row ${entry.isProduct ? 'lb-row-winner' : ''}`}>
          <div className="lb-rank">{getRankIcon(i)}</div>
          <div className="lb-name">
            {entry.name}
            {entry.isProduct && <span className="lb-you-badge">You</span>}
          </div>
          {impressions && impressions[entry.name] != null && (
            <div className="lb-impression" title="Impression score (1-5)">
              {'★'.repeat(Math.round(impressions[entry.name]))}
              <span className="lb-impression-num">{impressions[entry.name]}</span>
            </div>
          )}
          <div className="lb-bar-wrap">
            <div
              className="lb-bar"
              style={{
                width: `${Math.max(2, entry.pct)}%`,
                background: entry.isProduct ? 'var(--accent)' : entry.color || '#999',
              }}
            />
          </div>
          <div className="lb-pct">{entry.pct}%</div>
        </div>
      ))}
    </div>
  );
}

export default function LeaderboardPanel({ visible, report, onBack }) {
  const [view, setView] = useState('overall');
  const [selectedCluster, setSelectedCluster] = useState(0);

  if (!visible || !report) return null;

  const s = report.summary;
  const ov = s.overall_votes;
  const knownCompetitors = Object.keys(report.competitor_analysis || {});

  function mergeCompetitors(voteData) {
    const breakdown = voteData.competitors?.breakdown || [];
    const byName = new Map(breakdown.map(comp => [comp.name, comp]));

    knownCompetitors.forEach(name => {
      if (!byName.has(name)) {
        byName.set(name, { name, count: 0, pct: 0 });
      }
    });

    return Array.from(byName.values());
  }

  // Build overall entries
  function buildEntries(voteData) {
    const entries = [];

    if (voteData.product) {
      entries.push({
        name: voteData.product.name,
        count: voteData.product.count,
        pct: voteData.product.pct,
        isProduct: true,
      });
    }

    mergeCompetitors(voteData).forEach((comp, i) => {
      entries.push({
        name: comp.name,
        count: comp.count,
        pct: comp.pct,
        isProduct: false,
        color: CLUSTER_COLORS[(i + 1) % CLUSTER_COLORS.length],
      });
    });

    // Sort by pct descending
    entries.sort((a, b) => b.pct - a.pct);
    return entries;
  }

  const overallEntries = buildEntries(ov);
  const maxVotes = overallEntries.length ? Math.max(...overallEntries.map(e => e.count)) : 0;

  const clusterList = report.clusters || [];
  const currentCluster = clusterList[selectedCluster];
  const clusterEntries = currentCluster
    ? buildEntries(currentCluster.vote_summary)
    : [];

  return (
    <div className="lb-backdrop" onClick={onBack}>
      <div className="lb-panel" onClick={e => e.stopPropagation()}>
        <div className="lb-header">
          <h2>Leaderboard</h2>
          <button className="lb-close" onClick={onBack}>&times;</button>
        </div>

        <div className="lb-tabs">
          <button
            className={`lb-tab ${view === 'overall' ? 'lb-tab-active' : ''}`}
            onClick={() => setView('overall')}
          >
            Overall
          </button>
          <button
            className={`lb-tab ${view === 'cluster' ? 'lb-tab-active' : ''}`}
            onClick={() => setView('cluster')}
          >
            Per Cluster
          </button>
        </div>

        {view === 'overall' && (
          <div className="lb-content">
            <LeaderboardTable entries={overallEntries} maxVotes={maxVotes} impressions={s.impressions} />

            {report.top_reasons && report.top_reasons.length > 0 && (
              <div className="lb-reasons">
                <div className="lb-reasons-label">Top reasons</div>
                <div className="lb-reasons-tags">
                  {report.top_reasons.map((r, i) => (
                    <span key={i} className="lb-reason-tag">{r}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {view === 'cluster' && (
          <div className="lb-content">
            <div className="lb-cluster-tabs">
              {clusterList.map((c, i) => (
                <button
                  key={c.cluster_id}
                  className={`lb-cluster-tab ${selectedCluster === i ? 'lb-cluster-tab-active' : ''}`}
                  onClick={() => setSelectedCluster(i)}
                >
                  <span
                    className="lb-cluster-dot"
                    style={{ background: CLUSTER_COLORS[i % CLUSTER_COLORS.length] }}
                  />
                  {c.label}
                </button>
              ))}
            </div>

            {currentCluster && (
              <>
                <LeaderboardTable entries={clusterEntries} maxVotes={maxVotes} />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const CLUSTER_COLORS = ['#FF6B35', '#4ECDC4', '#7B68EE', '#FF85A2', '#22c55e', '#f59e0b'];

function VoteBar({ product, competitors, pass: passData }) {
  return (
    <div className="report-vote-bar">
      <div className="report-vote-segments">
        {product.pct > 0 && (
          <div
            className="report-vote-seg report-vote-product"
            style={{ width: `${product.pct}%` }}
            title={`${product.name}: ${product.count} (${product.pct}%)`}
          />
        )}
        {(competitors.breakdown || []).map((comp, i) => (
          comp.pct > 0 && (
            <div
              key={comp.name}
              className="report-vote-seg report-vote-competitor"
              style={{
                width: `${comp.pct}%`,
                background: CLUSTER_COLORS[(i + 1) % CLUSTER_COLORS.length],
                opacity: 0.8,
              }}
              title={`${comp.name}: ${comp.count} (${comp.pct}%)`}
            />
          )
        ))}
        {passData.pct > 0 && (
          <div
            className="report-vote-seg report-vote-pass"
            style={{ width: `${passData.pct}%` }}
            title={`Pass: ${passData.count} (${passData.pct}%)`}
          />
        )}
      </div>
      <div className="report-vote-labels">
        <span className="report-label-product">{product.name}: {product.pct}%</span>
        {(competitors.breakdown || []).map(comp => (
          <span key={comp.name} className="report-label-competitor">
            {comp.name}: {comp.pct}%
          </span>
        ))}
        <span className="report-label-pass">Pass: {passData.pct}%</span>
      </div>
    </div>
  );
}

function ClusterReport({ cluster, productName }) {
  const vs = cluster.vote_summary;
  const reasoning = cluster.reasoning || {};

  return (
    <div className="report-cluster-card">
      <div className="report-cluster-header">
        <h3>{cluster.label}</h3>
        <span className="report-cluster-meta">
          {cluster.size} personas · {cluster.chat_messages} messages · {cluster.total_votes} votes
        </span>
      </div>

      <VoteBar product={vs.product} competitors={vs.competitors} pass={vs.pass} />

      {/* Why they chose the product */}
      {reasoning.product_reasons && reasoning.product_reasons.length > 0 && (
        <div className="report-reasons">
          <h4>Why they chose {productName}</h4>
          {reasoning.product_reasons.slice(0, 3).map((r, i) => (
            <div key={i} className="report-reason">"{r}"</div>
          ))}
        </div>
      )}

      {/* Why they chose competitors */}
      {reasoning.competitor_reasons && reasoning.competitor_reasons.length > 0 && (
        <div className="report-reasons report-reasons-competitor">
          <h4>Why they chose competitors</h4>
          {reasoning.competitor_reasons.slice(0, 3).map((r, i) => (
            <div key={i} className="report-reason">
              <strong>{r.name}</strong> ({r.job_title}) chose <em>{r.choice}</em>: "{r.reason}"
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ReportPanel({ visible, report, onBack }) {
  if (!visible || !report) return null;

  const s = report.summary;
  const ov = s.overall_votes;

  return (
    <div className="report-panel">
      <div className="report-content">
        {/* Header */}
        <div className="report-header">
          <div>
            <h2>{report.product.name}</h2>
            <div className="report-subtitle">TinyUser Analysis Report</div>
          </div>
          <button className="report-back-btn" onClick={onBack}>Back to Discussion</button>
        </div>

        {/* Summary stats */}
        <div className="report-stats">
          <div className="report-stat">
            <div className="report-stat-value">{s.total_personas}</div>
            <div className="report-stat-label">Personas</div>
          </div>
          <div className="report-stat">
            <div className="report-stat-value">{s.clusters}</div>
            <div className="report-stat-label">Clusters</div>
          </div>
          <div className="report-stat">
            <div className="report-stat-value">{s.total_votes}</div>
            <div className="report-stat-label">Total Votes</div>
          </div>
          <div className="report-stat">
            <div className="report-stat-value report-stat-highlight">{ov.product.pct}%</div>
            <div className="report-stat-label">Chose {report.product.name}</div>
          </div>
        </div>

        {/* Overall vote breakdown */}
        <div className="report-section">
          <h3>Overall Vote Breakdown</h3>
          <VoteBar product={ov.product} competitors={ov.competitors} pass={ov.pass} />
        </div>

        {/* Competitor analysis */}
        {Object.keys(report.competitor_analysis || {}).length > 0 && (
          <div className="report-section">
            <h3>Competitor Analysis</h3>
            <div className="report-competitors">
              {Object.entries(report.competitor_analysis).map(([name, data]) => (
                <div key={name} className="report-competitor-card">
                  <div className="report-competitor-header">
                    <strong>{name}</strong>
                    <span className="report-competitor-votes">
                      {data.total_votes} votes ({data.vote_pct}%)
                    </span>
                  </div>
                  {data.research && data.research.raw_text && (
                    <div className="report-competitor-snippet">
                      {data.research.raw_text.slice(0, 200)}...
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Per-cluster breakdown */}
        <div className="report-section">
          <h3>Per-Cluster Breakdown</h3>
          {(report.clusters || []).map(cluster => (
            <ClusterReport
              key={cluster.cluster_id}
              cluster={cluster}
              productName={report.product.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

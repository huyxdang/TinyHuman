import { useState } from 'react';

export default function ResearchCard({ visible, knowledge, productName, onClose }) {
  const [expanded, setExpanded] = useState(0); // first item expanded by default

  if (!visible) return null;

  const effectiveKnowledge = knowledge || (
    productName
      ? { product: { name: productName, input_name: productName }, competitors: {} }
      : null
  );
  const searchStages = extractSearchStages(effectiveKnowledge?.research_trace);

  // Build company list: product first, then competitors
  const companies = [];
  if (effectiveKnowledge?.product) {
    companies.push({ ...effectiveKnowledge.product, isProduct: true });
  }
  if (effectiveKnowledge?.competitors) {
    Object.entries(effectiveKnowledge.competitors).forEach(([name, data]) => {
      companies.push({ name, ...data, isProduct: false });
    });
  }

  return (
    <div className="research-backdrop" onClick={onClose}>
      <div className="research-card" onClick={e => e.stopPropagation()}>
        <div className="research-header">
          <h2>Competitor Research</h2>
          <button className="research-close" onClick={onClose}>&times;</button>
        </div>

        <div className="research-body">
          {searchStages.length > 0 && (
            <div className="research-search-flow">
              {searchStages.map((stage, i) => (
                <div key={`${stage.label}-${i}`} className="research-search-stage">
                  <div className="research-search-label">{stage.label}</div>
                  <div className="research-search-queries">
                    {stage.queries.slice(0, 4).map((query, j) => (
                      <div key={`${query}-${j}`} className="research-search-query">
                        {query}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {companies.map((company, i) => (
            <div
              key={company.name}
              className={`research-company ${company.isProduct ? 'research-company-product' : ''}`}
            >
              <div
                className="research-company-header"
                onClick={() => setExpanded(expanded === i ? null : i)}
              >
                <div className="research-company-name">
                  {company.isProduct && <span className="research-product-badge">Your Product</span>}
                  {company.name}
                </div>
                <span className="research-expand">{expanded === i ? '−' : '+'}</span>
              </div>

              {expanded === i && (
                <div className="research-company-detail">
                  {!company.isProduct && company.why_competitor && (
                    <div className="research-section">
                      <div className="research-section-label">Why This Competitor</div>
                      <div className="research-section-text">{company.why_competitor}</div>
                    </div>
                  )}

                  {/* Overview */}
                  {company.overview && (
                    <div className="research-section">
                      <div className="research-section-label">Overview</div>
                      <div className="research-section-text">{company.overview}</div>
                    </div>
                  )}

                  {/* Services / Features */}
                  {(company.services || company.features || company.reviews) && (
                    <div className="research-section">
                      <div className="research-section-label">
                        {company.services ? 'Services' : company.features ? 'Key Features' : 'Features & Reviews'}
                      </div>
                      {renderListOrText(company.services || company.features || company.reviews)}
                    </div>
                  )}

                  {/* Price Range */}
                  {(company.price_range || company.pricing) && (
                    <div className="research-section">
                      <div className="research-section-label">Price Range</div>
                      <div className="research-section-text">{renderText(company.price_range || company.pricing)}</div>
                    </div>
                  )}

                  {/* Recent Announcements */}
                  {(company.recent_announcements || company.recent_news) && (
                    <div className="research-section">
                      <div className="research-section-label">Recent Announcements</div>
                      {renderListOrText(company.recent_announcements || company.recent_news, 4)}
                    </div>
                  )}

                  {/* Sources */}
                  {company.sources?.length > 0 && (
                    <div className="research-sources">
                      {company.sources.slice(0, 5).map((s, j) => {
                        try {
                          return (
                            <a key={j} href={s} target="_blank" rel="noopener noreferrer" className="research-source">
                              {new URL(s).hostname}
                            </a>
                          );
                        } catch { return null; }
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function extractSearchStages(trace) {
  if (!trace) return [];

  const stages = [];
  ['search_1', 'search_2'].forEach(key => {
    const entry = trace[key];
    if (entry?.queries?.length) {
      stages.push({
        label: entry.label || key,
        queries: entry.queries,
      });
    }
  });

  if (trace.search_3 && typeof trace.search_3 === 'object') {
    Object.values(trace.search_3).forEach(entry => {
      if (entry?.queries?.length) {
        stages.push({
          label: entry.label || 'Search 3',
          queries: entry.queries,
        });
      }
    });
  }

  return stages;
}

function renderListOrText(value, maxItems = 6) {
  const items = normalizeList(value).slice(0, maxItems);
  if (items.length > 1) {
    return (
      <ul className="research-features">
        {items.map((item, index) => (
          <li key={`${item}-${index}`}>{item}</li>
        ))}
      </ul>
    );
  }

  return <div className="research-section-text">{renderText(items[0] || value)}</div>;
}

function normalizeList(value) {
  if (Array.isArray(value)) return value.map(v => `${v}`.trim()).filter(Boolean);
  if (typeof value === 'string') {
    return value
      .split(/\n|;/)
      .map(v => v.trim())
      .filter(Boolean);
  }
  return [];
}

function renderText(value) {
  if (Array.isArray(value)) return value.join('\n');
  if (typeof value === 'string') return value;
  if (value?.raw_text) return value.raw_text;
  return '';
}

import { useState } from 'react';

// Demo data used when real knowledge isn't available yet
const DEMO_KNOWLEDGE = {
  product: {
    name: 'ChatGPT',
    overview: 'AI chatbot by OpenAI for writing, coding, research, and everyday tasks. Powered by GPT-4o and GPT-5.',
    features: [
      'Conversational AI with memory across sessions',
      'Code generation, debugging, and explanation',
      'Image generation (DALL-E), file uploads, web browsing',
      'Custom GPTs and GPT Store',
      'Voice mode and mobile apps',
    ],
    pricing: 'Free: Limited GPT-5 access | Plus: $20/mo | Pro: $200/mo | Team: $25-30/user/mo | Enterprise: Custom',
  },
  competitors: {
    'Claude': {
      name: 'Claude',
      overview: 'AI assistant by Anthropic focused on safety, long-context understanding, and nuanced reasoning.',
      features: [
        '200K token context window',
        'Extended thinking for complex reasoning',
        'Claude Code for terminal-based development',
        'Projects with file uploads and knowledge bases',
        'Google Workspace integration',
      ],
      pricing: 'Free: Sonnet access | Pro: $20/mo | Team: $25/user/mo | Max: $100/mo | Enterprise: Custom',
    },
    'Gemini': {
      name: 'Gemini',
      overview: 'Google\'s multimodal AI assistant integrated with Search, Gmail, Docs, and the Google ecosystem.',
      features: [
        'Deep Google Search integration with citations',
        'Multimodal: text, image, audio, video understanding',
        'Gems (custom AI personas)',
        'Google Workspace integration (Gmail, Docs, Sheets)',
        '1M token context window (Gemini 1.5 Pro)',
      ],
      pricing: 'Free: Gemini with Flash | Advanced: $19.99/mo (bundled with Google One 2TB) | Business: $24/user/mo',
    },
    'Perplexity': {
      name: 'Perplexity',
      overview: 'AI-powered answer engine that combines search with LLM synthesis. Focuses on cited, factual answers.',
      features: [
        'Real-time web search with source citations',
        'Focus modes: Web, Academic, Writing, Math, Video',
        'Collections for organizing research',
        'API access for developers',
        'Supports multiple LLM backends (GPT-4, Claude, etc.)',
      ],
      pricing: 'Free: 5 Pro searches/day | Pro: $20/mo or $200/yr | Enterprise: Custom',
    },
  },
};

export default function ResearchCard({ visible, knowledge, productName, onClose }) {
  const [expanded, setExpanded] = useState(0); // first item expanded by default

  if (!visible) return null;

  // Use real knowledge if it has structured data, otherwise fall back to demo
  const effectiveKnowledge = hasStructuredData(knowledge) ? knowledge : DEMO_KNOWLEDGE;

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
                  {/* Overview */}
                  {company.overview && (
                    <div className="research-section">
                      <div className="research-section-label">Overview</div>
                      <div className="research-section-text">{company.overview}</div>
                    </div>
                  )}

                  {/* Features */}
                  {company.features && (
                    <div className="research-section">
                      <div className="research-section-label">Key Features</div>
                      <ul className="research-features">
                        {(Array.isArray(company.features)
                          ? company.features
                          : company.features.split(/,\s*/)
                        ).map((f, j) => (
                          <li key={j}>{f.trim()}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Pricing */}
                  {company.pricing && (
                    <div className="research-section">
                      <div className="research-section-label">Pricing</div>
                      <div className="research-section-text">
                        {typeof company.pricing === 'string'
                          ? company.pricing
                          : company.pricing.raw_text
                            ? company.pricing.raw_text.split('\n').filter(l => l.trim()).slice(0, 6).join('\n')
                            : ''}
                      </div>
                    </div>
                  )}

                  {/* Sources (if from real data) */}
                  {company.pricing?.sources?.length > 0 && (
                    <div className="research-sources">
                      {company.pricing.sources.map((s, j) => (
                        <a key={j} href={s} target="_blank" rel="noopener noreferrer" className="research-source">
                          {new URL(s).hostname}
                        </a>
                      ))}
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

function hasStructuredData(knowledge) {
  if (!knowledge) return false;
  const p = knowledge.product;
  // Check if the knowledge has overview/features (structured) or at least pricing.raw_text (from backend)
  if (p?.overview || p?.features || p?.pricing?.raw_text) return true;
  // Check competitors
  const comps = knowledge.competitors || {};
  for (const v of Object.values(comps)) {
    if (v.overview || v.features || v.pricing?.raw_text) return true;
  }
  return false;
}

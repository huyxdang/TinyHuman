const PHASES = [
  { key: 'clustering', label: 'Clustering' },
  { key: 'scanning', label: 'Scanning' },
  { key: 'results', label: 'Results' },
];

const STATUS_TEXT = {
  clustering: 'Personas forming into natural audience segments...',
  scanning: 'Running search queries against live Google...',
  results: 'Analysis complete.',
};

export default function ProgressBar({ phase }) {
  const phaseIndex = PHASES.findIndex(p => p.key === phase);

  return (
    <div className="progress-bar">
      <div className="progress-phases">
        {PHASES.map((p, i) => (
          <span key={p.key}>
            {i > 0 && <span className="progress-arrow">&rarr; </span>}
            <span
              className={`progress-phase ${
                i === phaseIndex ? 'active' : i < phaseIndex ? 'done' : ''
              }`}
            >
              {p.label}
            </span>
          </span>
        ))}
      </div>
      <div className="progress-status">{STATUS_TEXT[phase] || ''}</div>
    </div>
  );
}

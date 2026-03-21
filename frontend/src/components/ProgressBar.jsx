const PHASES = [
  { key: 'researching', label: 'Research' },
  { key: 'chatting', label: 'Discussion' },
  { key: 'report', label: 'Report' },
];

const DEFAULT_STATUS = {
  researching: 'Researching product & competitors...',
  chatting: 'Personas discussing the product...',
  report: 'Analysis complete.',
};

export default function ProgressBar({ phase, statusText }) {
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
      <div className="progress-status">{statusText || DEFAULT_STATUS[phase] || ''}</div>
    </div>
  );
}

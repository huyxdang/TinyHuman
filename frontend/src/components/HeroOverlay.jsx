import { useState } from 'react';

const EXAMPLES = [
  'TinyFish',
  'Tasco',
  'AWS',
  'ETEST',
];

export default function HeroOverlay({ visible, onRun, grouped, onToggleGroup }) {
  const [value, setValue] = useState('');

  function handleRun() {
    if (!value.trim()) return;
    onRun(value.trim());
    setValue('');
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey && value.trim()) {
      e.preventDefault();
      handleRun();
    }
  }

  return (
    <div className={`hero-overlay ${visible ? '' : 'hidden'}`}>
      <img src="/assets/Tiny.png" alt="TinyHuman" className="hero-logo-img" />
      <div className="hero-lockup">
        <p className="hero-subtext">
          <span className="hero-highlight">Humans, <span style={{color: 'var(--accent)'}}>Simulated</span></span>
        </p>
        <div className="hero-input-bar">
        <input
          type="text"
          className="hero-input"
          placeholder="Enter your product..."
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="hero-run-btn"
          onClick={handleRun}
          disabled={!value.trim()}
        >
          &rarr;
        </button>
      </div>
        <button
          className="hero-group-btn"
          onClick={onToggleGroup}
        >
          {grouped ? 'Spread Out' : 'Group by Similarities'}
        </button>
      </div>
    </div>
  );
}

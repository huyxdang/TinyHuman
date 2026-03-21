import { useState } from 'react';

const EXAMPLES = [
  'Notion',
  'TinyFish.ai',
  'Shopee seller tools',
  'VIB mobile banking',
];

export default function HeroOverlay({ visible, onRun }) {
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
      <img src="/assets/TinyHuman.png" alt="TinyHuman" className="hero-logo-img" />
      <p className="hero-subtext">
        <span className="hero-highlight">From gossips to insights.</span>
      </p>
      <div className="hero-input-bar">
        <input
          type="text"
          className="hero-input"
          placeholder="Enter your product name..."
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="hero-run-btn"
          onClick={handleRun}
          disabled={!value.trim()}
        >
          Run &rarr;
        </button>
      </div>
      <div className="hero-chips">
        {EXAMPLES.map(ex => (
          <button key={ex} className="hero-chip" onClick={() => setValue(ex)}>
            {ex}
          </button>
        ))}
      </div>
    </div>
  );
}

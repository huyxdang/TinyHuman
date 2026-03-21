import { useState } from 'react';

const EXAMPLES = [
  'Notion',
  'TinyFish.ai',
  'Shopee seller tools',
  'VIB mobile banking',
  'Hotel management SaaS',
];

export default function InputModal({ isOpen, onClose, onRun }) {
  const [value, setValue] = useState('');

  if (!isOpen) return null;

  function handleRun() {
    if (!value.trim()) return;
    onRun(value.trim());
    setValue('');
  }

  function handleChip(text) {
    setValue(text);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey && value.trim()) {
      e.preventDefault();
      handleRun();
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <div className="modal-label">Product Description</div>
        <textarea
          className="modal-textarea"
          placeholder="Paste your product URL or describe what it does..."
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        <div className="modal-chips">
          {EXAMPLES.map(ex => (
            <button key={ex} className="modal-chip" onClick={() => handleChip(ex)}>
              {ex}
            </button>
          ))}
        </div>
        <div className="modal-footer">
          <button
            className="modal-run"
            onClick={handleRun}
            disabled={!value.trim()}
          >
            Run &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HeroOverlay({ visible, onTryIt }) {
  return (
    <div className={`hero-overlay ${visible ? '' : 'hidden'}`}>
      <div className="hero-logo">TinyUser</div>
      <h1 className="hero-headline">
        Find out if your product is invisible.
      </h1>
      <p className="hero-subtext">
        100,000 synthetic users. Real Google searches. Real answers.
      </p>
      <button className="hero-cta" onClick={onTryIt}>
        Try it &rarr;
      </button>
      <div className="hero-stats">
        100K personas &middot; 34 provinces &middot; real search results
      </div>
    </div>
  );
}

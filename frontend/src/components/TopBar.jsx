export default function TopBar({ productName, onHome }) {
  return (
    <div className="top-bar">
      <button className="top-bar-home" onClick={onHome} title="Back to home">&larr;</button>
      <span className="top-bar-logo">TinyHuman</span>
      <span className="top-bar-divider" />
      <span className="top-bar-product">{productName}</span>
    </div>
  );
}

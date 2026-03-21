export default function TopBar({ productName }) {
  return (
    <div className="top-bar">
      <span className="top-bar-logo">TinyUser</span>
      <span className="top-bar-divider" />
      <span className="top-bar-product">{productName}</span>
    </div>
  );
}

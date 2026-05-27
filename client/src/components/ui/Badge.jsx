const Badge = ({ children, className = '' }) => (
  <span className={`chip ${className}`}>{children}</span>
);

export default Badge;

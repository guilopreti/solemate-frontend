import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();
  const links = [
    { to: "/produtos", label: "Catálogo" },
    { to: "/clientes", label: "Clientes" },
    { to: "/pedidos", label: "Pedidos" },
  ];
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="navbar-brand-icon">👟</span>
        <span className="navbar-brand-text">SoleMate</span>
      </Link>
      <div className="navbar-links">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className={`navbar-link ${pathname.startsWith(l.to) ? "active" : ""}`}
          >
            {l.label}
          </Link>
        ))}
      </div>
      <div style={{ marginLeft: "auto" }}>
        <Link to="/pedidos" className="navbar-action btn btn-primary btn-sm">
          Fazer Pedido
        </Link>
      </div>
    </nav>
  );
}

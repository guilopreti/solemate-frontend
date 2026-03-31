import { Link } from "react-router-dom";
import bannerImg from "../assets/hero-banner.png";

export default function HomePage() {
  return (
    <div className="page-container animate-fade-in">
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-subtitle">Nova Coleção SoleMate</div>
          <h1 className="hero-title">O Tênis Que <br/>Define Você.</h1>
          <p className="hero-text">
            Descubra a seleção premium definitiva. Lançamentos exclusivos, 
            silhuetas clássicas e tecnologia de ponta para quem dita o seu próprio passo.
          </p>
          <div style={{ display: "flex", gap: "16px", marginTop: "40px" }}>
            <Link to="/produtos" className="btn btn-primary btn-xl">
              Explorar Loja
            </Link>
            <Link to="/pedidos" className="btn btn-secondary btn-xl">
              Ir para o Pedido
            </Link>
          </div>
        </div>
        <div className="hero-image-wrapper">
          <img src={bannerImg} alt="Tênis Premium" className="hero-image" />
        </div>
      </section>

      <section className="two-col animate-fade-in animate-delay-2">
        <div className="section-card" style={{ textAlign: "center", padding: "48px 24px" }}>
          <div style={{ fontSize: "3rem", marginBottom: "16px" }}>📦</div>
          <h3>Frete Grátis e Seguro</h3>
          <p style={{ color: "var(--text-secondary)", marginTop: "12px", fontSize: "0.95rem" }}>
             Entrega full express para todas as compras acima de R$ 999.
          </p>
        </div>
        <div className="section-card" style={{ textAlign: "center", padding: "48px 24px" }}>
          <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🔥</div>
          <h3>Suporte Exclusivo</h3>
          <p style={{ color: "var(--text-secondary)", marginTop: "12px", fontSize: "0.95rem" }}>
             Equipe de especialistas à disposição. Devolução fácil garantida.
          </p>
        </div>
      </section>
    </div>
  );
}

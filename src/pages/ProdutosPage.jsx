import { useState, useEffect } from "react";
import { getProdutos, deletarProduto } from "../api/api";
import ProdutoCard from "../components/ProdutoCard";
import ProdutoForm from "../components/ProdutoForm";

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filtros, setFiltros] = useState({ marca: "", modelo: "", valorMin: "", valorMax: "" });
  const [showForm, setShowForm] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState(null);

  const carregarProdutos = async () => {
    setLoading(true);
    try {
      const params = Object.fromEntries(Object.entries(filtros).filter(([_, v]) => v !== ""));
      const { data } = await getProdutos(params);
      setProdutos(data || []);
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    carregarProdutos(); 
  }, []);

  const handleFiltrar = (e) => {
    e.preventDefault();
    carregarProdutos();
  };

  const handleLimparFiltros = () => {
    setFiltros({ marca: "", modelo: "", valorMin: "", valorMax: "" });
    getProdutos({}).then(res => setProdutos(res.data)).catch(console.error);
  };

  const excluir = async (id) => {
    if (!window.confirm("Deseja realmente excluir este modelo? A imagem também será removida.")) return;
    try {
      await deletarProduto(id);
      carregarProdutos();
    } catch (err) {
      alert("Erro ao excluir produto");
    }
  };

  const abrirForm = (produto = null) => {
    setProdutoEditando(produto);
    setShowForm(true);
  };

  const fecharForm = () => {
    setShowForm(false);
    setProdutoEditando(null);
  };

  const aoSalvar = () => {
    fecharForm();
    carregarProdutos();
  };

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <h1>Sneaker Drops</h1>
        <button className="btn btn-primary" onClick={() => abrirForm()}>
          + Lançar Sneaker
        </button>
      </div>

      <div className="ecommerce-layout animate-fade-in animate-delay-1">
        
        {/* Sidebar de Filtros Lateral (Premium) */}
        <div className="filter-sidebar">
          <h3>Filtrar Catálogo</h3>
          <form onSubmit={handleFiltrar}>
            <div className="form-group">
              <label>Marca de Prefrência</label>
              <select value={filtros.marca} onChange={e => setFiltros({...filtros, marca: e.target.value})}>
                <option value="">Todas as Marcas</option>
                <option value="Nike">Nike</option>
                <option value="Adidas">Adidas</option>
                <option value="Jordan">Jordan</option>
                <option value="New Balance">New Balance</option>
                <option value="Puma">Puma</option>
                <option value="Vans">Vans</option>
                <option value="Asics">Asics</option>
              </select>
            </div>
            <div className="form-group">
              <label>Nome do Modelo</label>
              <input 
                type="text" 
                placeholder="Ex: Dunk Low, Yeezy..."
                value={filtros.modelo} 
                onChange={e => setFiltros({...filtros, modelo: e.target.value})}
              />
            </div>
            
            <div className="two-col" style={{gap: '12px'}}>
              <div className="form-group">
                <label>Preço Min</label>
                <input 
                  type="number" 
                  placeholder="R$"
                  value={filtros.valorMin} 
                  onChange={e => setFiltros({...filtros, valorMin: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Preço Max</label>
                <input 
                  type="number" 
                  placeholder="R$"
                  value={filtros.valorMax} 
                  onChange={e => setFiltros({...filtros, valorMax: e.target.value})}
                />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px" }}>
              <button type="submit" className="btn btn-primary" style={{width: '100%', justifyContent: 'center'}}>
                Aplicar Filtros
              </button>
              <button type="button" className="btn btn-ghost" onClick={handleLimparFiltros} style={{width: '100%', justifyContent: 'center'}}>
                Limpar Resultados
              </button>
            </div>
          </form>
        </div>

        {/* Grade de Produtos */}
        <div>
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              Buscando lançamentos...
            </div>
          ) : produtos.length === 0 ? (
            <div className="empty-state" style={{display: 'flex', alignItems: 'center', gap: '12px'}} >
              <div className="empty-state-icon">👟</div>
              <div className="empty-state-text">Nenhum limite alcançado... Filtros não encontraram tênis.</div>
            </div>
          ) : (
            <div className="card-grid">
              {produtos.map(p => (
                <ProdutoCard 
                  key={p.rowKey} 
                  produto={p} 
                  onEditar={abrirForm} 
                  onExcluir={excluir} 
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {showForm && (
        <ProdutoForm 
          produtoEditando={produtoEditando} 
          onSalvo={aoSalvar} 
          onCancelar={fecharForm} 
        />
      )}
    </div>
  );
}

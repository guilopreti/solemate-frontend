import { useState, useEffect } from "react";
import { getPedidos, criarPedido, getClientes, getProdutos } from "../api/api";

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [form, setForm] = useState({
    clienteId: "",
    produtoId: "",
    quantidade: 1,
    metodoPagamento: "Pix",
    metodoEntrega: "Retirada",
  });
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState(null);

  const carregarDados = async () => {
    setLoading(true);
    try {
      const [pedRes, cliRes, prodRes] = await Promise.all([
        getPedidos(),
        getClientes(),
        getProdutos()
      ]);
      setPedidos(pedRes.data || []);
      setClientes(cliRes.data || []);
      setProdutos(prodRes.data || []);
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar dados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handleProdutoChange = (e) => {
    const id = e.target.value;
    setForm({ ...form, produtoId: id, quantidade: 1 });
    setProdutoSelecionado(produtos.find(p => p.rowKey === id) || null);
    setCheckoutSuccess(null);
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setCheckoutSuccess(null);
    try {
      const { data } = await criarPedido(form);
      setCheckoutSuccess({
        id: data.id,
        valorTotal: data.valorTotal,
        status: data.status
      });
      setForm({
        ...form,
        produtoId: "",
        quantidade: 1,
      });
      setProdutoSelecionado(null);
      carregarDados();
    } catch (err) {
      alert("Erro no checkout: " + (err.response?.data?.error || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-container animate-fade-in">
      <div className="two-col">
        {/* Formulário de Novo Pedido */}
        <div className="section-card">
          <h2 className="section-title">Novo Pedido</h2>
          
          <form onSubmit={handleCheckout}>
            <div className="form-group">
              <label>Cliente</label>
              <select 
                value={form.clienteId} 
                onChange={e => setForm({...form, clienteId: e.target.value})} 
                required
              >
                <option value="">Selecione o Cliente...</option>
                {clientes.map(c => (
                  <option key={c.rowKey} value={c.rowKey}>{c.nome}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Sneaker</label>
              <select 
                value={form.produtoId} 
                onChange={handleProdutoChange} 
                required
              >
                <option value="">Selecione o Sneaker...</option>
                {produtos.filter(p => p.quantidade > 0).map(p => (
                  <option key={p.rowKey} value={p.rowKey}>
                    {p.marca} {p.modelo} — R$ {Number(p.valor).toFixed(2)} (Estoque: {p.quantidade})
                  </option>
                ))}
              </select>
              
              {produtoSelecionado && (
                <div className="info-box">
                  <div>
                    <span className="produto-info-stock">Disponível: {produtoSelecionado.quantidade} un.</span>
                  </div>
                  <div className="produto-info-price" style={{fontWeight: 800, color: 'var(--text-primary)', fontSize: '1rem'}}>
                    R$ {Number(produtoSelecionado.valor).toFixed(2)} / un
                  </div>
                </div>
              )}
            </div>

            <div className="two-col" style={{gap: '12px', marginBottom: '16px'}}>
              <div className="form-group" style={{marginBottom: 0}}>
                <label>Quantidade</label>
                <input 
                  type="number" 
                  min="1" 
                  max={produtoSelecionado ? produtoSelecionado.quantidade : 1}
                  value={form.quantidade} 
                  onChange={e => setForm({...form, quantidade: parseInt(e.target.value) || 1})}
                  disabled={!produtoSelecionado}
                  required
                />
              </div>
              
              <div className="form-group" style={{marginBottom: 0}}>
                <label>Total Estimado</label>
                <div className="info-box" style={{color: 'var(--text-primary)', fontWeight: 'bold'}}>
                  {produtoSelecionado 
                    ? `R$ ${(produtoSelecionado.valor * form.quantidade).toFixed(2)}` 
                    : 'R$ 0.00'}
                </div>
              </div>
            </div>

            <div className="two-col" style={{gap: '12px', marginBottom: '24px'}}>
              <div className="form-group" style={{marginBottom: 0}}>
                <label>Pagamento</label>
                <select 
                  value={form.metodoPagamento} 
                  onChange={e => setForm({...form, metodoPagamento: e.target.value})}
                >
                  <option value="Pix">Pix</option>
                  <option value="Cartão">Cartão</option>
                  <option value="Boleto">Boleto</option>
                </select>
              </div>
              <div className="form-group" style={{marginBottom: 0}}>
                <label>Entrega</label>
                <select 
                  value={form.metodoEntrega} 
                  onChange={e => setForm({...form, metodoEntrega: e.target.value})}
                >
                  <option value="Retirada">Retirada</option>
                  <option value="Entrega">Entrega em casa</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{width: '100%', justifyContent: 'center', padding: '14px'}}
              disabled={submitting || !form.clienteId || !form.produtoId}
            >
              {submitting ? "Processando..." : "Confirmar Pedido"}
            </button>
          </form>

          {checkoutSuccess && (
            <div className="pedido-success">
              <div className="pedido-success-icon">✅</div>
              <div>
                <div className="checkout-success-title" style={{fontWeight: 800, color: 'var(--success)'}}>Pedido Confirmado!</div>
                <div className="checkout-success-sub" style={{color: 'var(--text-secondary)'}}>
                  Valor Total: R$ {Number(checkoutSuccess.valorTotal).toFixed(2)} • Status: {checkoutSuccess.status}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Lista de Pedidos */}
        <div className="section-card" style={{padding: '32px 0 0 0', overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
          <h2 className="section-title" style={{padding: '0 32px', marginBottom: '16px', borderBottom: 'none'}}>Todos os Pedidos</h2>
          
          {loading ? (
             <div className="loading" style={{flex: 1, textAlign: 'center', padding: '40px'}}>
               <div className="spinner"></div>
               <div style={{fontWeight: 600}}>Carregando lista de pedidos...</div>
               <small style={{color: 'var(--text-muted)', display: 'block', marginTop: '12px', lineHeight: 1.5}}>
                 Nossos servidores gratuitos podem levar alguns segundos para "acordar" no primeiro acesso. <br/>Agradecemos a paciência! 🚀
               </small>
             </div>
          ) : pedidos.length === 0 ? (
            <div className="empty-state" style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'  }}>
              <div className="empty-state-icon">📦</div>
              <div className="empty-state-text">Nenhum pedido realizado.</div>
            </div>
          ) : (
            <div style={{overflowY: 'auto', maxHeight: '500px'}}>
              <table style={{marginTop: '16px'}}>
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Sneaker</th>
                    <th>Qtd</th>
                    <th>Total Estimado</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidos.map(p => (
                    <tr key={p.rowKey}>
                      <td>{p.clienteNome}</td>
                      <td style={{fontWeight: 500}}>{p.produtoNome}</td>
                      <td>{p.quantidade}</td>
                      <td style={{color: 'var(--gold)', fontWeight: 600}}>
                        R$ {Number(p.valorTotal).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

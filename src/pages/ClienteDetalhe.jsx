import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getClientes, getPedidosCliente } from "../api/api";
import ClienteForm from "../components/ClienteForm";

export default function ClienteDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const carregarDados = async () => {
    setLoading(true);
    try {
      const [cliRes, pedRes] = await Promise.all([
        getClientes(),
        getPedidosCliente(id)
      ]);
      const cli = cliRes.data.find(c => c.rowKey === id);
      if (!cli) {
        alert("Cliente não encontrado.");
        navigate("/clientes");
        return;
      }
      setCliente(cli);
      setPedidos(pedRes.data || []);
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar detalhes do cliente");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, [id]);

  if (loading) return <div className="loading"><div className="spinner"></div>Carregando...</div>;
  if (!cliente) return null;

  return (
    <div className="page-container">
      <button className="btn btn-ghost" style={{marginBottom: '20px'}} onClick={() => navigate('/clientes')}>
        &larr; Voltar para Clientes
      </button>
      
      <div className="page-header" style={{alignItems: 'flex-start'}}>
        <div>
          <h1 style={{marginBottom: '8px'}}>{cliente.nome}</h1>
          <div style={{color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5'}}>
            <div>📧 {cliente.email}</div>
            <div>📱 {cliente.telefone}</div>
            <div>📍 {cliente.endereco}</div>
          </div>
        </div>
        <button className="btn btn-secondary" onClick={() => setShowForm(true)}>
          Editar Dados
        </button>
      </div>

      <div className="section-card" style={{marginTop: '32px', padding: 0, overflow: 'hidden'}}>
        <div className="section-title" style={{padding: '24px 24px 0', borderBottom: 'none'}}>
          Histórico de Pedidos
        </div>
        
        {pedidos.length === 0 ? (
          <div className="empty-state" style={{padding: '40px', display: 'flex', alignItems: 'center', gap: '12px'}}>
            <div className="empty-state-icon">🛒</div>
            <div className="empty-state-text">Este cliente ainda não fez pedidos.</div>
          </div>
        ) : (
          <table style={{marginTop: '16px'}}>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Qtd</th>
                <th>Valor Total</th>
                <th>Pagamento</th>
                <th>Entrega</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map(p => (
                <tr key={p.rowKey}>
                  <td style={{fontWeight: 500}}>{p.produtoNome}</td>
                  <td>{p.quantidade} un.</td>
                  <td style={{color: 'var(--gold)', fontWeight: 600}}>
                    R$ {Number(p.valorTotal).toFixed(2)}
                  </td>
                  <td>{p.metodoPagamento}</td>
                  <td>{p.metodoEntrega}</td>
                  <td style={{color: 'var(--text-secondary)'}}>
                    {new Date(p.dataPedido).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showForm && (
        <ClienteForm 
          clienteEditando={cliente} 
          onSalvo={() => { setShowForm(false); carregarDados(); }} 
          onCancelar={() => setShowForm(false)} 
        />
      )}
    </div>
  );
}

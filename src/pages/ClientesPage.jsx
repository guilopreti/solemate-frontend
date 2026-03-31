import { useState, useEffect } from "react";
import { getClientes, deletarCliente } from "../api/api";
import ClienteForm from "../components/ClienteForm";
import { useNavigate } from "react-router-dom";

export default function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);
  const navigate = useNavigate();

  const carregarClientes = async () => {
    setLoading(true);
    try {
      const { data } = await getClientes();
      setClientes(data || []);
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar clientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    carregarClientes(); 
  }, []);

  const excluir = async (id) => {
    if (!window.confirm("Deseja realmente excluir este cliente?")) return;
    try {
      await deletarCliente(id);
      carregarClientes();
    } catch (err) {
      alert("Erro ao excluir cliente");
    }
  };

  const abrirForm = (cliente = null) => {
    setClienteEditando(cliente);
    setShowForm(true);
  };

  const fecharForm = () => {
    setShowForm(false);
    setClienteEditando(null);
  };

  const aoSalvar = () => {
    fecharForm();
    carregarClientes();
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Clientes</h1>
        <button className="btn btn-primary" onClick={() => abrirForm()}>
          + Novo Cliente
        </button>
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          Carregando clientes...
        </div>
      ) : clientes.length === 0 ? (
        <div className="empty-state" style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <div className="empty-state-icon">👥</div>
          <div className="empty-state-text">Nenhum cliente cadastrado.</div>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Endereço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map(c => (
                <tr key={c.rowKey}>
                  <td>{c.nome}</td>
                  <td>{c.email}</td>
                  <td>{c.telefone}</td>
                  <td>{c.endereco}</td>
                  <td>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => navigate(`/clientes/${c.rowKey}`)}>
                        Histórico
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={() => abrirForm(c)}>
                        Editar
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => excluir(c.rowKey)}>
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <ClienteForm 
          clienteEditando={clienteEditando} 
          onSalvo={aoSalvar} 
          onCancelar={fecharForm} 
        />
      )}
    </div>
  );
}

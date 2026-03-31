import { useState, useEffect } from "react";
import { criarCliente, atualizarCliente } from "../api/api";

export default function ClienteForm({ clienteEditando, onSalvo, onCancelar }) {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (clienteEditando) {
      setForm({
        nome: clienteEditando.nome || "",
        email: clienteEditando.email || "",
        telefone: clienteEditando.telefone || "",
        endereco: clienteEditando.endereco || "",
      });
    }
  }, [clienteEditando]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (clienteEditando) {
        await atualizarCliente(clienteEditando.rowKey, form);
      } else {
        await criarCliente(form);
      }
      onSalvo();
    } catch (err) {
      alert("Erro ao salvar cliente: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">
            {clienteEditando ? "Editar Cliente" : "Novo Cliente"}
          </h2>
          <button className="modal-close" onClick={onCancelar}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome Completo</label>
            <input 
              type="text" 
              value={form.nome}
              onChange={e => setForm({...form, nome: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>E-mail</label>
            <input 
              type="email" 
              value={form.email}
              onChange={e => setForm({...form, email: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Telefone / WhatsApp</label>
            <input 
              type="text" 
              value={form.telefone}
              onChange={e => setForm({...form, telefone: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Endereço de Entrega</label>
            <input 
              type="text" 
              value={form.endereco}
              onChange={e => setForm({...form, endereco: e.target.value})}
              required
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onCancelar}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { criarProduto, atualizarProduto } from "../api/api";

export default function ProdutoForm({ produtoEditando, onSalvo, onCancelar }) {
  const [form, setForm] = useState({
    marca: "",
    modelo: "",
    valor: "",
    quantidade: "",
  });
  const [foto, setFoto] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (produtoEditando) {
      setForm({
        marca: produtoEditando.marca || "",
        modelo: produtoEditando.modelo || "",
        valor: produtoEditando.valor || "",
        quantidade: produtoEditando.quantidade || "",
      });
    }
  }, [produtoEditando]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (produtoEditando) {
        await atualizarProduto(produtoEditando.rowKey, form);
      } else {
        const formData = new FormData();
        formData.append("marca", form.marca);
        formData.append("modelo", form.modelo);
        formData.append("valor", form.valor);
        formData.append("quantidade", form.quantidade);
        if (foto) {
          formData.append("foto", foto);
        }
        await criarProduto(formData);
      }
      onSalvo();
    } catch (err) {
      alert("Erro ao salvar produto: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">
            {produtoEditando ? "Editar Sneaker" : "Novo Sneaker"}
          </h2>
          <button className="modal-close" onClick={onCancelar}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Marca</label>
            <select 
              value={form.marca} 
              onChange={e => setForm({...form, marca: e.target.value})}
              required
            >
              <option value="">Selecione...</option>
              <option value="Nike">Nike</option>
              <option value="Adidas">Adidas</option>
              <option value="Jordan">Jordan</option>
              <option value="New Balance">New Balance</option>
              <option value="Puma">Puma</option>
              <option value="Vans">Vans</option>
              <option value="Asics">Asics</option>
              <option value="Outra">Outra</option>
            </select>
          </div>

          <div className="form-group">
            <label>Modelo</label>
            <input 
              type="text" 
              placeholder="Ex: Air Jordan 1 Retro High"
              value={form.modelo}
              onChange={e => setForm({...form, modelo: e.target.value})}
              required
            />
          </div>

          <div className="two-col" style={{gap: '12px', marginBottom: '16px'}}>
            <div className="form-group" style={{marginBottom: 0}}>
              <label>Valor (R$)</label>
              <input 
                type="number" 
                step="0.01"
                min="0"
                value={form.valor}
                onChange={e => setForm({...form, valor: e.target.value})}
                required
              />
            </div>
            <div className="form-group" style={{marginBottom: 0}}>
              <label>Estoque Inicial</label>
              <input 
                type="number" 
                min="0"
                value={form.quantidade}
                onChange={e => setForm({...form, quantidade: e.target.value})}
                required
              />
            </div>
          </div>

          {!produtoEditando && (
            <div className="form-group">
              <label>Foto do Produto</label>
              <div className="file-upload-wrapper">
                <div className="file-upload-button">
                  <span>📸</span> {foto ? foto.name : "Clique para anexar arquivo ou arraste aqui"}
                </div>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={e => setFoto(e.target.files[0])}
                  required={!produtoEditando}
                />
              </div>
            </div>
          )}

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

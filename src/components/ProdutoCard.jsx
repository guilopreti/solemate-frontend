export default function ProdutoCard({ produto, onEditar, onExcluir }) {
  const isOutOfStock = produto.quantidade <= 0;
  const isLowStock = produto.quantidade > 0 && produto.quantidade <= 5;

  return (
    <div className="produto-card">
      <div className="produto-card-image-box">
        <img
          className="produto-card-image"
          src={produto.imageUrl}
          alt={produto.modelo}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/260x240?text=SNEAKER+IMG";
          }}
        />
      </div>
      
      <div className="produto-card-body">
        <div>
          <div className="produto-card-marca">{produto.marca}</div>
          <div className="produto-card-modelo">{produto.modelo}</div>
        </div>
        
        <div className="produto-card-price">
           R$ {Number(produto.valor).toFixed(2)}
        </div>

        <div className="produto-card-footer">
          <div className="produto-card-estoque">
            {isOutOfStock ? (
              <span style={{color: 'var(--danger)', fontWeight: 600}}>Esgotado</span>
            ) : isLowStock ? (
              <span style={{color: 'var(--gold)', fontWeight: 600}}>Últimas {produto.quantidade} un.</span>
            ) : (
              <span style={{color: 'var(--success)', fontWeight: 600}}>Pronta Entrega</span>
            )}
          </div>
          
          <div className="produto-card-actions">
            <button className="btn btn-secondary btn-icon" onClick={() => onEditar(produto)} title="Editar Tênis">
              <span style={{fontSize: "12px"}}>✏️</span>
            </button>
            <button className="btn btn-danger btn-icon" onClick={() => onExcluir(produto.rowKey)} title="Remover Produto">
               <span style={{fontSize: "12px"}}>🗑️</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

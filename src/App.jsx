import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProdutosPage from "./pages/ProdutosPage";
import ClientesPage from "./pages/ClientesPage";
import PedidosPage from "./pages/PedidosPage";
import ClienteDetalhe from "./pages/ClienteDetalhe";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/produtos" element={<ProdutosPage />} />
          <Route path="/clientes" element={<ClientesPage />} />
          <Route path="/clientes/:id" element={<ClienteDetalhe />} />
          <Route path="/pedidos" element={<PedidosPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

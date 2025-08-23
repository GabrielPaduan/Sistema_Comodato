import { Navigate, Route, Routes } from "react-router-dom";
import { Principal } from "../pages/principal/Principal";
import { CadastroCliente } from "../pages/cadastroCliente/CadastroCliente";
import { VisualizarClientes } from "../pages/visualizarClientes/VisualizarClientes";
import { ContratoCliente } from "../pages/contratoCliente/contratoCliente";
import { Login } from "../pages/login/login";

export const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/pagina-inicial" element={<Principal />} />
        <Route path="/login" element={<Login />}/> 
        <Route path="/*" element={<Navigate to="/pagina-inicial"/>} />
        <Route path="/cadastro-clientes" element={<CadastroCliente />} />
        <Route path="/visualizar-clientes" element={<VisualizarClientes />} />
        <Route path="/contrato-cliente/:id" element={<ContratoCliente />} />
    </Routes>
 );
}
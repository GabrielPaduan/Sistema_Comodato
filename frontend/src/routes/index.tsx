import { Navigate, Route, Routes } from "react-router-dom";
import { Principal } from "../pages/principal/Principal";
import { CadastroCliente } from "../pages/cadastroCliente/CadastroCliente";

export const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/pagina-inicial" element={<Principal />} />
        <Route path="/*" element={<Navigate to="/pagina-inicial"/>} />
        <Route path="/cadastro-clientes" element={<CadastroCliente />} />
    </Routes>
 );
}
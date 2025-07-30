import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../pages/home/Home";

export const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/pagina-inicial" element={<Home />} />
        <Route path="/*" element={<Navigate to="/pagina-inicial"/>} />
    </Routes>
 );
}
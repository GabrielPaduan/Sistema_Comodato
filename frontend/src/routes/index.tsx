import { Navigate, Route, Routes } from "react-router-dom";
import { BoxNavigation } from "../shared/components";

export const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/pagina-inicial" element={<BoxNavigation />} />
        <Route path="/*" element={<Navigate to="/pagina-inicial"/>} />
    </Routes>
 );
}
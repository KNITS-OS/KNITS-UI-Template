import { Navigate, Route, Routes } from "react-router-dom";

import { routes } from "routes";

import { HOME } from "pages/home";

import { AdminLayout, getRoutes } from "layouts";

export const Router = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>{getRoutes(routes, "/admin")}</Route>

      <Route path="*" element={<Navigate to={`admin${HOME}`} replace />} />
    </Routes>
  );
};

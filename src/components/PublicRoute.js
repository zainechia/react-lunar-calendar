// PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const isAuthenticated = localStorage.getItem("session") ? true : false;

  return !isAuthenticated ? <>{children}</> : <Navigate to={"profile"} />;
}

export default PublicRoute;

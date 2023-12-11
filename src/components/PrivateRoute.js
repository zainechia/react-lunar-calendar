// PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem("session") ? true : false;

  return isAuthenticated ? <>{children}</> : <Navigate to={"/"} />;
}

export default PrivateRoute;

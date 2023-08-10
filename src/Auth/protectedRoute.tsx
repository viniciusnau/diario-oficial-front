import React from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "./auth";

export const ProtectedComponent: React.FC<{
  Component: React.FC<any>;
  path: any;
}> = ({ Component, ...rest }) => {
  return isLoggedIn() ? <Component {...rest} /> : <Navigate to="/" />;
};

export default ProtectedComponent;

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";

const adminEmail = "admin@delizio.com"; // your admin email

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  if (loading) return <p>Loading...</p>;
  if (!user || user.email !== adminEmail) return <Navigate to="/login" />;
  return children;
};

export default ProtectedRoute;

// src/RequireAuth.jsx
import React, { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

export function isAuthenticated() {
  return !!localStorage.getItem("auth_token");
}

export default function RequireAuth({ children }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate({ to: "/" });
    }
  }, []);

  return <>{children}</>;
}

// src/RequireAuth.jsx
import React, { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { isAuthenticated } from "../../auth";

export default function RequireAuth({ children }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate({ to: "/" });
    }
  }, [navigate]);

  return <>{children}</>;
}

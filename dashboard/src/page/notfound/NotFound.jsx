import React from "react";
import PropTypes from "prop-types";

export default function NotFound() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold text-gray-800">404 — Page not found</h1>
      <p className="mt-2 text-sm text-gray-600">The page you requested doesn't exist.</p>
    </div>
  );
}

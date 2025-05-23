import React from "react";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App";
import "./index.css";

// Render the main React application
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

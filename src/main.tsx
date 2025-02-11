import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App";

const rootElement = document.getElementById('root') as HTMLElement;

if(rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
    <App />
  </React.StrictMode>,
  );
} else {
  console.error('Root element not found')
}

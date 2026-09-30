import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App.jsx";
import "./styles/global.css";
import "./styles/invitations.css";
import "./styles/experiences.css";
import "./styles/home.css";
import "./styles/themes.css";
import "./styles/theme-worlds.css";
import "./styles/category-previews.css";
import "./styles/surprises.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

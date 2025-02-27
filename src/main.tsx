import React from "react";
import ReactDOM from "react-dom/client";
import "./globals.css";
import { ConfigProvider } from "antd";
import theme from "./config/theme";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error('O elemento com id "root" não foi encontrado no HTML.');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider theme={theme}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);
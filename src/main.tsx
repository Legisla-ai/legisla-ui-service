import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './globals.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('O elemento com id "root" não foi encontrado no HTML.');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

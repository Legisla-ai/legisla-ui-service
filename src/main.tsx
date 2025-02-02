import React from 'react';
import ReactDOM from 'react-dom/client';
import './globals.css';
import { ConfigProvider } from 'antd';
import theme from './config/theme';
import { RouterProvider } from 'react-router-dom';
import router from './routes/Routes';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('O elemento com id "root" não foi encontrado no HTML.');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>
);

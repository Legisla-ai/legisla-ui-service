import React from 'react';
import { Layout } from 'antd';
import { Header } from './components/Header/Header';
import './globals.css';
import { Outlet, useLocation } from 'react-router-dom';

const { Content } = Layout;

const App: React.FC = () => {
  const location = useLocation();
  const showHeader = location.pathname === '/';

  return (
    <Layout>
      {showHeader && <Header />}
      <Layout>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;

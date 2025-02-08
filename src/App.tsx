import React from 'react';
import { Layout } from 'antd';
import { Header } from './components/Header/Header';
import './globals.css';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout>
      <Header />
      <Layout>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;

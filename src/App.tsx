import React from 'react';
import { Layout } from 'antd';
import { Header } from './components/Header/Header';
import './globals.css';
import { Outlet, useLocation } from 'react-router-dom';
import { FloatButton } from './components/FloatButton/FloatButton';
import { WhatsAppOutlined } from '@ant-design/icons';
import { whatsappLink } from './lib/utils';

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
          <FloatButton icon={<WhatsAppOutlined />} onClick={() => window.open(whatsappLink, '_blank')} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;

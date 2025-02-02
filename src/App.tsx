import React from 'react';
import { Layout } from 'antd';
import { Header } from './components/Header/Header';
import styles from './styles/Layout.module.css';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const App: React.FC = () => {
    return (
        <Layout>
            <Header />
            <Layout rootClassName={styles.layout}>
                <Content className={styles.main}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}

export default App;

import React, { ReactNode } from 'react';
import styles from './Layout.module.css';
import { Header } from '../Header/Header';
import { Sidebar } from '../SideBar/SideBar';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.content}>
                <Sidebar />
                <main className={styles.main}>{children}</main>
            </div>
        </div>
    );
};

export default Layout;

import React from 'react';
import router from './routes/Routes';
import { RouterProvider } from 'react-router';
import { Header } from './components/Header/Header';
import styles from './styles/Layout.module.css';
import { Sidebar } from './components/SideBar/SideBar';

const App: React.FC = () => {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.content}>
                <Sidebar />
                <div className={styles.main}>
                    <RouterProvider router={router} />
                </div>
            </div>
        </div>
    );
}

export default App;

import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Home, History } from 'lucide-react';
import styles from './Sidebar.module.css';

export function Sidebar() {
    return (
        <Router>
            <div className={styles.sidebar}>
                <nav className={styles.navMenu}>
                    <Link to="/" className={styles.navLink}>
                        <Home />
                        <span>Início</span>
                    </Link>
                    <Link to="/historico" className={styles.navLink}>
                        <History />
                        <span>Histórico de conversas</span>
                    </Link>
                </nav>
            </div>
        </Router>
    );
}

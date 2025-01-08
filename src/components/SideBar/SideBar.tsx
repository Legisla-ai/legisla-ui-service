import Link from 'next/link'
import { Home, History } from 'lucide-react'
import styles from './Sidebar.module.css'

export function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <nav className={styles.navMenu}>
                <Link href="/" className={styles.navLink}>
                    <Home />
                    <span>Início</span>
                </Link>
                <Link href="/historico" className={styles.navLink}>
                    <History />
                    <span>Histórico de conversas</span>
                </Link>
            </nav>
        </div>
    )
}
import type React from "react"
import styles from "./Header.module.css"
import { Button } from "antd"
import { WhatsAppOutlined } from "@ant-design/icons"
import { BrowserRouter as Router, Link } from 'react-router-dom';

export const Header: React.FC = () => {
    return (
        <Router>
            <header className={styles.header}>
                <Link to="/">
                    <div className={styles.logoContainer}>
                        <div className={styles.logoIcon}>
                            <img src="/icons/logo-outline.svg" alt="Legisla.ai" width={32} height={32} className={styles.logo} />
                        </div>
                        <span className={styles.logoText}>Legisla.ai</span>
                    </div>
                </Link>
                <Button
                    className={styles.expertButton}
                    icon={<WhatsAppOutlined />}
                >
                    Fale com um especialista
                </Button>
            </header>
        </Router>
    )
}

export default Header
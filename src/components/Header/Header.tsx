import type React from "react"
import styles from "./Header.module.css"
import { Button } from "antd"
import { WhatsAppOutlined } from "@ant-design/icons"
import { Link } from 'react-router-dom';
import { whatsappLink } from "../../lib/utils";

export const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <Link to="/">
                <div className={styles.logoContainer}>
                    <div className={styles.logoIcon}>
                        <img src="/icons/logo-outline.svg" alt="Legisla.ai" width={32} height={32} className={styles.logo} />
                    </div>
                    <span className={styles.logoText}>LegislaAI</span>
                </div>
            </Link>
            <Button
                className={styles.expertButton}
                icon={<WhatsAppOutlined />}
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
            >
                Fale com um especialista
            </Button>
        </header>
    )
}

export default Header

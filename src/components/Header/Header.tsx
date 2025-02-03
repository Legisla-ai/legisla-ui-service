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
                <div className={styles.logoContainer + " hover:text-black"}>
                    <div className={styles.logoIcon}>
                        <img src="/icons/logo-outline.svg" alt="Legisla.ai" width={34} height={34} className={styles.logo} />
                    </div>
                    <span className="font-bold text-2xl">
                        Legisla
                        <span className="bg-gradient-to-l from-teal-300 to-cyan-600 bg-clip-text text-transparent">AI</span>
                    </span>
                </div>
            </Link>

            <div className={styles.navButtons}>
                <Button type="text">Chat</Button>
                <Button type="text">Documentos</Button>
                <Button type="text">Análises</Button>
            </div>

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

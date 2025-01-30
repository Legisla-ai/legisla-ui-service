import type React from "react"
import Image from "next/image"
import { MessageCircle } from "lucide-react"
import styles from "./Header.module.css"
import { Button } from "@/components/ui/button"

export const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <div className={styles.logoIcon}>
                    <Image src="/images/icons/Favicon-04.svg" alt="Legisla.AI" width={32} height={32} className={styles.logo} />
                </div>
                <span className={styles.logoText}>Legisla.AI</span>
            </div>
            <Button variant="outline" className={styles.expertButton}>
                <MessageCircle className="mr-2 h-4 w-4" />
                Fale com um especialista
            </Button>
        </header>
    )
}

export default Header


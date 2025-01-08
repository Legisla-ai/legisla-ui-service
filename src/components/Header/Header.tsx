import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import styles from './Header.module.css';

export const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <div className={styles.logoIcon}>
                    <Image
                        src="images/icons/Favicon-04.svg"
                        alt="Legisla.AI"
                        width={32}
                        height={32}
                        className={styles.logo}
                    />
                </div>
                <span className={styles.logoText}>Legisla.AI</span>
            </div>
            <div className={styles.rightContainer}>
                <ThemeToggle />
                <div className={styles.avatarContainer}>
                    <Image
                        src="https://avatar.iran.liara.run/public/boy"
                        loading='lazy'
                        alt="User Avatar"
                        width={32}
                        height={32}
                        className={styles.avatar}
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;

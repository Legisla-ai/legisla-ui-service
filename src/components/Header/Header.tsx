import type React from 'react';
import styles from './Header.module.css';
import { Button } from 'antd';
import { WhatsAppOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { whatsappLink } from '@/lib/utils';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Link to="/">
        <div className={styles.logoContainer + ' hover:text-black'}>
          <div className={styles.logoIcon}>
            <img src="/icons/logo.png" alt="Legisla.ai" width={34} height={34} className={styles.logo} />
          </div>
          <span className="text-black font-bold text-2xl">Legisla.AI</span>
        </div>
      </Link>

      <div className={styles.navButtons}>
        <Link to="/">
          <Button type="text">Início</Button>
        </Link>
        <Link to="/repositorio">
          <Button type="text">Repositório</Button>
        </Link>
        <Link to="/jurisprudencias">
          <Button type="text">Jurisprudências</Button>
        </Link>
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
  );
};

export default Header;

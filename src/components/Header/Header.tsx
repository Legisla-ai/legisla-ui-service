import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import styles from './Header.module.css';
import { Button } from 'antd';
import { WhatsAppOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { whatsappLink } from '@/lib/utils';

export const Header: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024; // lg breakpoint
      setIsMobile(mobile);
      if (!mobile) {
        setIsMenuOpen(false); // Close menu when switching to desktop
      }
    };

    handleResize(); // Check initial size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { to: '/', label: 'Início' },
    { to: '/repositorio', label: 'Repositório' },
    { to: '/analise-completa', label: 'Análise Completa' },
    { to: '/analise-riscos', label: 'Análise de Riscos' },
    { to: '/jurisprudencias', label: 'Jurisprudências' },
  ];

  return (
    <header className={styles.header}>
      <Link to="/">
        <div className={`${styles.logoContainer}`}>
          <div className={styles.logoIcon}>
            <img src="/icons/logo.png" alt="Legisla.ai" width={34} height={34} className={styles.logo} />
          </div>
          <span className="text-black font-bold text-2xl">Legisla.AI</span>
        </div>
      </Link>

      {/* Desktop Navigation */}
      {!isMobile && (
        <div className={styles.navButtons}>
          {navItems.map((item) => (
            <Link key={item.to} to={item.to}>
              <Button type="text">{item.label}</Button>
            </Link>
          ))}
        </div>
      )}

      <div className={styles.rightSection} ref={dropdownRef}>
        {/* WhatsApp Button - Always visible but responsive */}
        <Button
          className={`${styles.expertButton} ${isMobile ? styles.expertButtonMobile : ''}`}
          icon={<WhatsAppOutlined />}
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {isMobile ? '' : 'Fale com um especialista'}
        </Button>

        {/* Mobile Hamburger Menu */}
        {isMobile && (
          <div className={styles.mobileMenuContainer}>
            <Button
              type="text"
              icon={isMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
              onClick={toggleMenu}
              className={`${styles.hamburgerButton} ${isMenuOpen ? styles.hamburgerButtonActive : ''}`}
            />
            
            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
              <div className={styles.mobileDropdown}>
                <div className={styles.mobileNavItems}>
                  {navItems.map((item) => (
                    <Link key={item.to} to={item.to} onClick={() => setIsMenuOpen(false)}>
                      <Button 
                        type="text" 
                        block 
                        className={styles.mobileNavButton}
                      >
                        {item.label}
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

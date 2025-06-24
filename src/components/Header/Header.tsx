import type React from 'react';
import { useState, useEffect, useRef } from 'react';
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
    <header className="relative w-screen h-16 bg-white/95 backdrop-blur-20 border-b border-gray-200/80 flex justify-between items-center px-4 lg:px-16 shadow-header font-sans z-50 transition-all duration-300 ease-in-out">
      <Link to="/">
        <div className="flex items-end gap-2 transition-opacity duration-15 ease-in-out p-1 rounded-lg hover:opacity-80">
          <div className="flex items-center justify-center text-cyan-500 transition-transform duration-15 ease-in-out hover:scale-105">
            <img src="/icons/logo.png" alt="Legisla.ai" width={34} height={34} />
          </div>
          <span className="text-black font-bold text-2xl">Legisla.AI</span>
        </div>
      </Link>

      {/* Desktop Navigation */}
      {!isMobile && (
        <div className="flex gap-2 items-center">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to}>
              <Button 
                type="text" 
                className="inline-block gap-4 text-base font-sans font-semibold text-gray-600 rounded-lg transition-all duration-15 ease-in-out relative hover:bg-blue-500/8 hover:text-blue-500 hover:-translate-y-px"
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3 relative" ref={dropdownRef}>
        {/* WhatsApp Button - Always visible but responsive */}
        <Button
          type="primary"
          className={`!bg-whatsapp hover:!bg-whatsapp-hover !text-white text-base font-bold !border-none transition-all duration-300 ease-in-out shadow-whatsapp hover:-translate-y-px hover:shadow-whatsapp-hover focus:outline-none ${
            isMobile ? 'p-3 min-w-13 !rounded-full' : 'py-3 px-5 !rounded-lg'
          }`}
          style={{
            backgroundColor: '#0ca83b',
            borderColor: '#0ca83b',
          }}
          icon={<WhatsAppOutlined />}
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#0a7d2d';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#0ca83b';
          }}
        >
          {isMobile ? '' : 'Fale com um especialista'}
        </Button>

        {/* Mobile Hamburger Menu */}
        {isMobile && (
          <div className="relative">
            <Button
              type="text"
              icon={isMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
              onClick={toggleMenu}
              className={`p-2 border-none bg-transparent text-xl text-gray-600 flex items-center justify-center rounded-lg transition-all duration-15 ease-in-out z-[51] min-w-11 h-11 ${
                isMenuOpen 
                  ? 'bg-black/8 text-gray-800' 
                  : 'hover:bg-black/5 hover:text-gray-700'
              }`}
            />

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-dropdown z-[51] min-w-50 overflow-hidden animate-dropdownSlideIn">
                <div className="flex flex-col p-2 gap-1">
                  {navItems.map((item) => (
                    <Link key={item.to} to={item.to} onClick={() => setIsMenuOpen(false)}>
                      <Button 
                        type="text" 
                        block 
                        className="justify-start hover:bg-blue-500/5 hover:text-blue-500 focus:bg-blue-500/8 focus:text-blue-500 focus:outline-none"
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

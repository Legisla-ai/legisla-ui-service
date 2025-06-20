import { FC, useEffect, useState } from 'react';

interface FloatButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
}

export const FloatButton: FC<FloatButtonProps> = ({ icon, onClick, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Pequeno delay para animação de entrada
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <button
      type="button"
      className={`float-button-whatsapp ${isVisible ? 'animate-slideUp' : 'opacity-0'} ${className}`}
      onClick={onClick}
      aria-label="Abrir WhatsApp para falar com um especialista"
      title="Fale conosco no WhatsApp"
    >
      {icon}
    </button>
  );
};

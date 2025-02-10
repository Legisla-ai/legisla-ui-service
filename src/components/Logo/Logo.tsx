import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return <img src="/icons/logo.png" alt="Legisla.ai" className={className} />;
};

export default Logo;

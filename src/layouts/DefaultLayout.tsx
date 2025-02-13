import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header/Header';
import { FloatButton } from '@/components/FloatButton/FloatButton';
import { WhatsAppOutlined } from '@ant-design/icons';
import { whatsappLink } from '@/lib/utils';

export function DefaultLayout() {
  return (
    <div className="flex flex-col h-screen">
      {/* Header com altura fixa (64px = h-16) */}
      <header className="h-16">
        <Header />
      </header>

      {/* Conteúdo que ocupa o restante da tela */}
      <main className="flex-1 overflow-y-auto relative">
        <Outlet />
        <FloatButton icon={<WhatsAppOutlined />} onClick={() => window.open(whatsappLink, '_blank')} />
      </main>
    </div>
  );
}

import { Outlet, useLocation } from 'react-router-dom';
import { FloatButton } from '@/components/FloatButton/FloatButton';
import { WhatsAppOutlined } from '@ant-design/icons';
import { whatsappLink } from '@/utils';

export function NoHeaderLayout() {
  const location = useLocation();

  // Páginas onde o botão flutuante não deve aparecer
  const hiddenFloatButtonPages = ['/chat', '/repositorio', '/analise-completa', '/analise-riscos'];
  const shouldHideFloatButton = hiddenFloatButtonPages.includes(location.pathname);

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 overflow-y-auto relative">
        <Outlet />
        {!shouldHideFloatButton && (
          <FloatButton icon={<WhatsAppOutlined />} onClick={() => window.open(whatsappLink, '_blank')} />
        )}
      </main>
    </div>
  );
}

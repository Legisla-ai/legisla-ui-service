import { Outlet } from 'react-router-dom';
import { FloatButton } from '@/components/FloatButton/FloatButton';
import { WhatsAppOutlined } from '@ant-design/icons';
import { whatsappLink } from '@/lib/utils';

export function NoHeaderLayout() {
  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 overflow-y-auto relative">
        <Outlet />
        <FloatButton icon={<WhatsAppOutlined />} onClick={() => window.open(whatsappLink, '_blank')} />
      </main>
    </div>
  );
}

// src/pages/Chat.tsx
import { ChatArea } from '@/components/ChatArea/ChatArea';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Button } from 'antd';

export default function Chat() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 700);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 700;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="flex h-full relative">
      <div
        className={`transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-0'} ${isMobile ? 'absolute z-20' : ''}`}
      >
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      </div>
      <div className="flex flex-col flex-1">
        {!isSidebarOpen && (
          <div className="absolute top-2 left-2 z-30">
            <Button variant="solid" onClick={toggleSidebar}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        )}
        <ChatArea />
      </div>
    </div>
  );
}

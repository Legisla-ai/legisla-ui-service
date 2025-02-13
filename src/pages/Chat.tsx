import { ChatArea } from '@/components/ChatArea/ChatArea';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { useState } from 'react';

export default function Chat() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-full">
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-0'}`}>
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      </div>
      <div className="flex flex-col flex-1">
        <ChatArea />
      </div>
    </div>
  );
}

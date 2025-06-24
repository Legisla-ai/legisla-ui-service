import { ChatArea } from '@/components/ChatArea/ChatArea';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { RepositoryProvider } from '@/context/RepositoryContext';
import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Button } from 'antd';

export default function Repository() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // RepositoryId removido pois agora buscamos todos os repositórios do usuário

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <RepositoryProvider>
      <div className="flex h-full relative overflow-hidden">
        {/* Overlay para mobile */}
        {isMobile && isSidebarOpen && (
          <button 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm z-10 transition-opacity duration-300 cursor-default"
            onClick={toggleSidebar}
            aria-label="Fechar sidebar"
          />
        )}
      
      {/* Sidebar Container */}
      <div
        className={`transition-all duration-300 ease-out flex-shrink-0 ${
          isSidebarOpen ? 'w-72' : 'w-0'
        } ${
          isMobile ? 'absolute z-20 h-full' : 'relative'
        }`}
      >
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      </div>
      
      {/* Main Content Area */}
      <div className="flex flex-col flex-1 relative min-w-0 overflow-hidden">
        {/* Menu Button quando sidebar está fechada */}
        {!isSidebarOpen && (
          <div className="absolute top-4 left-4 z-20">
            <Button 
              type="text" 
              onClick={toggleSidebar} 
              className="!p-2 hover:!bg-white/80 !rounded-xl !backdrop-blur-sm !border !border-white/20 !shadow-md transition-all duration-200 hover:scale-105"
            >
              <Menu className="h-5 w-5 text-gray-700" />
            </Button>
          </div>
        )}
        
        {/* Chat Area */}
        <div className="flex-1 overflow-hidden">
          <ChatArea />
        </div>
      </div>
      </div>
    </RepositoryProvider>
  );
}

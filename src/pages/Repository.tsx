import { ChatArea } from '@/components/ChatArea/ChatArea';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { useState, useEffect, useCallback } from 'react';
import { Menu } from 'lucide-react';
import { Button } from 'antd';

interface Chat {
  id: number;
  name: string;
  messages: { message: string; isUser: boolean }[];
}

export default function Repository() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 700);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 700;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (chats.length === 0) {
      handleNewChat()
    } else if (chats.length > 0 && !selectedChatId) {
      setSelectedChatId(chats[0].id);
    }
  }, [chats, selectedChatId]);

  const handleChatSelect = useCallback((chatId: number) => {
    setSelectedChatId(chatId);
  }, [])

  const handleNewChat = useCallback(() => {
    const newChatId = chats.length > 0 ? Math.max(...chats.map((c) => c.id)) + 1 : 1;
    const newChat: Chat = {
      id: newChatId,
      name: `Chat ${newChatId}`,
      messages: [],
    };
    setChats([...chats, newChat]);
    setSelectedChatId(newChatId);
  }, [chats]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="flex h-full relative">
      <div
        className={`transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-0'} ${isMobile ? 'absolute z-20' : ''}`}
      >
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={toggleSidebar}
          onChatSelect={handleChatSelect} // Pass the useCallback function
          onNewChat={handleNewChat}
          chats={chats}
          selectedChatId={selectedChatId}
        />
      </div>
      <div className="flex flex-col flex-1">
        {!isSidebarOpen && (
          <div className="absolute top-3 left-2 z-30">
            <Button type="text" onClick={toggleSidebar} className="hover:bg-[var(--muted)]! px-2! py-3! m-2">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        )}
        <ChatArea selectedChatId={selectedChatId} chats={chats} setChats={setChats} />
      </div>
    </div>
  );
}
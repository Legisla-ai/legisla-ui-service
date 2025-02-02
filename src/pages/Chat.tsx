import React, { useState } from 'react';

interface Message {
    sender: 'user' | 'bot';
    text: string;
}

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');

    const sendMessage = async () => {
        if (input.trim() === '') return;
        const newMessage: Message = { sender: 'user', text: input };
        setMessages([...messages, newMessage]);
        setInput('');

        // Placeholder for API call to get bot response
        const botResponse = await fetchBotResponse(input);
        setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    };

    const fetchBotResponse = async (message: string): Promise<string> => {
        // Implement API call logic here
        return 'This is a bot response.';
    };

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
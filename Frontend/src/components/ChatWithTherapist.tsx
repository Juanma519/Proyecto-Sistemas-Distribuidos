import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Send } from 'lucide-react';

interface Message {
  id: number;
  sender: 'user' | 'therapist';
  content: string;
  timestamp: Date;
}

const ChatWithTherapist: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // Mock therapist data
  const therapist = {
    id,
    name: 'Dr. Emily Johnson',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  };

  useEffect(() => {
    // Scroll to the bottom of the chat when new messages are added
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;

    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    // Simulate therapist response after a short delay
    setTimeout(() => {
      const therapistResponse: Message = {
        id: messages.length + 2,
        sender: 'therapist',
        content: 'Thank you for your message. How can I assist you today?',
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, therapistResponse]);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-100 p-4 flex items-center">
          <img src={therapist.image} alt={therapist.name} className="w-12 h-12 rounded-full mr-4" />
          <h2 className="text-xl font-semibold">{therapist.name}</h2>
        </div>
        <div className="h-96 overflow-y-auto p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 ${
                message.sender === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              <div
                className={`inline-block p-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {message.content}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSendMessage} className="p-4 border-t">
          <div className="flex">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatWithTherapist;
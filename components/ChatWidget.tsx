import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { getChatResponseStream } from '../services/geminiService';
import { GenerateContentResponse } from "@google/genai";
import { ChatMessage } from '../types';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hi! I am Abdallah\'s AI assistant. Ask me anything about his data science skills or experience.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const streamResult = await getChatResponseStream(userMessage);
      
      let fullResponseText = "";
      setMessages(prev => [...prev, { role: 'model', text: '' }]); // Placeholder

      for await (const chunk of streamResult) {
          const c = chunk as GenerateContentResponse;
          const text = c.text;
          if (text) {
              fullResponseText += text;
              setMessages(prev => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1].text = fullResponseText;
                  return newMessages;
              });
          }
      }

    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-blue-600 text-white shadow-xl hover:bg-blue-700 hover:scale-105 transition-all z-50 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <Sparkles size={24} />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 w-[90vw] md:w-96 h-[500px] bg-card border border-slate-700 rounded-2xl shadow-2xl flex flex-col z-50 transition-all transform origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        
        {/* Header */}
        <div className="p-4 bg-slate-900 rounded-t-2xl border-b border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bot size={20} className="text-blue-500" />
            <div>
                <h3 className="text-sm font-bold text-slate-200">Abdallah AI</h3>
                <span className="text-xs text-green-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Online
                </span>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-slate-700' : 'bg-blue-900/50'}`}>
                {msg.role === 'user' ? <User size={16} className="text-slate-300" /> : <Bot size={16} className="text-blue-400" />}
              </div>
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-200 rounded-tl-none'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
               <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center shrink-0">
                  <Bot size={16} className="text-blue-400" />
               </div>
               <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                 <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                 <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-75"></div>
                 <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-150"></div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-slate-800 bg-slate-900 rounded-b-2xl">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about my skills..."
              className="flex-1 bg-slate-800 border border-slate-700 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            />
            <button 
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
          <p className="text-[10px] text-center text-slate-500 mt-2">
              Powered by Google Gemini
          </p>
        </div>
      </div>
    </>
  );
};

export default ChatWidget;
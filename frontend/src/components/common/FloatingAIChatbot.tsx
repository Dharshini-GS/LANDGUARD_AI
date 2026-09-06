import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Minus, Send, Bot, Sparkles } from 'lucide-react';

export const FloatingAIChatbot: React.FC = () => {
  const { 
    isChatbotOpen, 
    setIsChatbotOpen, 
    chatMessages, 
    sendChatMessage, 
    selectedProject, 
    scope 
  } = useApp();

  const [inputQuery, setInputQuery] = useState('');

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputQuery.trim()) return;
    sendChatMessage(inputQuery.trim());
    setInputQuery('');
  };

  const sampleQueries = [
    "Which projects require immediate attention?",
    "Why is this project classified as critical?",
    "What interventions can reduce this project's risk?",
    "Which districts have the highest risk?",
    "Show critical projects in Tamil Nadu."
  ];

  const handlePresetClick = (query: string) => {
    sendChatMessage(query);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Floating Chat Drawer */}
      {isChatbotOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] bg-white border-2 border-[#111111] shadow-xl rounded-md flex flex-col mb-3 overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          {/* Drawer Header (Black & White Government Portal Style) */}
          <div className="bg-[#111111] text-white p-3 flex items-center justify-between border-b border-[#333333]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-[#333333] flex items-center justify-center text-white">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold tracking-wide m-0">LANDGUARD AI Assistant</h3>
                <p className="text-[10px] text-[#D9D9D9] m-0">Project Risk Decision Support</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setIsChatbotOpen(false)} 
                className="p-1 text-[#D9D9D9] hover:text-white rounded hover:bg-[#333333]"
                title="Minimize Chat"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setIsChatbotOpen(false)} 
                className="p-1 text-[#D9D9D9] hover:text-white rounded hover:bg-[#333333]"
                title="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scope Context Strip */}
          <div className="bg-[#F5F5F5] px-3 py-1.5 border-b border-[#E2E2E2] text-[10px] text-[#333333] flex items-center justify-between">
            <span className="font-semibold">Context: <strong>{scope.state} → {scope.district}</strong></span>
            <span className="text-[#777777] font-mono text-[9px] truncate max-w-[150px]">{selectedProject.name}</span>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-[#F7F7F7] text-xs">
            {chatMessages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-2.5 rounded leading-relaxed border ${
                    msg.sender === 'user'
                      ? 'bg-[#111111] text-white border-[#111111]'
                      : 'bg-white text-[#111111] border-[#E2E2E2] shadow-xs'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-[#777777] mt-0.5 px-1">{msg.timestamp}</span>
              </div>
            ))}
          </div>

          {/* Preset Questions */}
          <div className="p-2 bg-white border-t border-[#E2E2E2] text-[10px] space-y-1">
            <div className="text-[#777777] font-bold uppercase text-[9px]">Suggested Questions:</div>
            <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
              {sampleQueries.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePresetClick(q)}
                  className="bg-[#F5F5F5] hover:bg-[#E2E2E2] text-[#111111] border border-[#D9D9D9] px-2 py-0.5 rounded text-[10px] text-left truncate max-w-full font-medium"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Query Input Box */}
          <form onSubmit={handleSend} className="p-2 bg-[#F5F5F5] border-t border-[#D9D9D9] flex items-center gap-2">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask LANDGUARD AI..."
              className="flex-1 bg-white border border-[#D9D9D9] rounded px-2.5 py-1.5 text-xs text-[#111111] focus:outline-none focus:border-[#111111]"
            />
            <button
              type="submit"
              className="bg-[#111111] hover:bg-[#333333] text-white px-3 py-1.5 rounded font-bold text-xs flex items-center gap-1 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Circular Trigger Button */}
      <button
        onClick={() => setIsChatbotOpen(!isChatbotOpen)}
        className="bg-[#111111] hover:bg-[#333333] text-white p-3 rounded-full shadow-lg border-2 border-white flex items-center gap-2 transition-transform hover:scale-105"
        title="Open LANDGUARD AI Assistant"
      >
        <Sparkles className="w-5 h-5 text-amber-400" />
        <span className="font-bold text-xs tracking-wider pr-1">Ask AI</span>
      </button>
    </div>
  );
};

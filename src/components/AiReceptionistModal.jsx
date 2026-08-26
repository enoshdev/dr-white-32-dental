import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Phone, Calendar, RefreshCw } from 'lucide-react';
import { clinicInfo } from '../data/clinicData';

export const AiReceptionistModal = ({ isOpen, onClose, onOpenBooking }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! Welcome to Dr's White 32 Dental in Sanath Nagar. How can I assist you today with our dental services or booking an appointment?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickReplies = [
    "Book an Appointment",
    "Clinic Timings",
    "Where are you located?",
    "Dental Implants",
    "Teeth Whitening"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const sendMessage = async (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          messages: messages.map(m => ({ sender: m.sender, text: m.text }))
        })
      });

      const data = await response.json();
      const botReply = data.reply || "Thank you for reaching out. Our clinic team is available at 7801010268.";

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: botReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: "We are having trouble connecting. Please contact our clinic desk directly at 7801010268.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: 1,
        sender: 'bot',
        text: "Hello! Welcome to Dr's White 32 Dental. How can I help you today?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-md h-[88vh] sm:h-[580px] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 animate-scaleUp text-left my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-navy-900 text-white p-3.5 sm:p-4 flex items-center justify-between border-b border-navy-800 shrink-0">
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-navy-800 border border-gold-400/40 flex items-center justify-center text-gold-400 font-serif font-bold text-xs sm:text-sm shrink-0">
              32
            </div>
            <div className="min-w-0">
              <div className="font-serif font-bold text-xs sm:text-sm text-white truncate">Dr's White 32 Dental</div>
              <div className="text-[10px] sm:text-[11px] text-slate-300">Sanath Nagar • Online Assistance</div>
            </div>
          </div>

          <div className="flex items-center space-x-1 shrink-0">
            <button
              onClick={handleClear}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg transition-colors"
              title="Reset conversation"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg transition-colors"
              aria-label="Close assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3 bg-slate-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-navy-900 text-white rounded-tr-none'
                    : 'bg-white text-slate-800 rounded-tl-none border border-slate-200/80 shadow-2xs'
                }`}
              >
                <div className="whitespace-pre-line font-normal">{msg.text}</div>
              </div>
              <span className="text-[9px] text-slate-400 mt-1 px-1">{msg.time}</span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center space-x-1.5 p-2.5 bg-white rounded-2xl rounded-tl-none border border-slate-200 w-16 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-bounce"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-bounce [animation-delay:0.4s]"></span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick suggestions */}
        <div className="p-2 bg-white border-t border-slate-100 flex space-x-1.5 overflow-x-auto scrollbar-none shrink-0">
          {quickReplies.map((qr, idx) => (
            <button
              key={idx}
              onClick={() => sendMessage(qr)}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] sm:text-[11px] font-medium rounded-full whitespace-nowrap transition-colors"
            >
              {qr}
            </button>
          ))}
        </div>

        {/* Bottom CTA utilities */}
        <div className="px-3 py-2 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-xs shrink-0">
          <button
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
            className="text-[11px] font-semibold text-navy-900 hover:underline flex items-center space-x-1"
          >
            <Calendar className="w-3 h-3 text-gold-500 shrink-0" />
            <span>Book Appointment</span>
          </button>

          <a
            href={`tel:${clinicInfo.contact.mobile}`}
            className="text-[11px] font-semibold text-slate-600 hover:underline flex items-center space-x-1"
          >
            <Phone className="w-3 h-3 text-slate-500 shrink-0" />
            <span>Call 78010 10268</span>
          </a>
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="p-2 sm:p-2.5 bg-white border-t border-slate-200 flex items-center space-x-2 shrink-0"
        >
          <input
            type="text"
            placeholder="Type your question..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-navy-900 outline-none"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="p-2 sm:p-2.5 bg-navy-900 hover:bg-navy-800 text-white rounded-xl transition-all disabled:opacity-40 shrink-0"
            aria-label="Send message"
          >
            <Send className="w-4 h-4 text-gold-400" />
          </button>
        </form>

      </div>
    </div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { X, Send, CheckCheck, Phone, Video, MoreVertical, MessageCircle, Calendar } from 'lucide-react';
import { clinicInfo } from '../data/clinicData';

export const WhatsAppDemoModal = ({ isOpen, onClose, initialMessage, onOpenBooking }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'clinic',
      text: "Hello! Welcome to Dr's White 32 Dental, Sanath Nagar. How can we help you with your dental care today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (initialMessage && isOpen) {
      handleSendUserMessage(initialMessage);
    }
  }, [initialMessage, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSendUserMessage = (msgText) => {
    const text = msgText || inputText;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!msgText) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = "Thank you for contacting Dr's White 32 Dental! Our clinic desk will assist you shortly. You can also call us directly at 7801010268.";
      const lower = text.toLowerCase();

      if (lower.includes('appoint') || lower.includes('book') || lower.includes('slot')) {
        reply = "We'd be glad to schedule your appointment! Our clinic is open Mon-Sat (10:00 AM - 8:30 PM) and Sun (11:00 AM - 1:00 PM). Would you like to request a consultation with Dr. Mounika (MDS) or Dr. Sounica (MDS)?";
      } else if (lower.includes('location') || lower.includes('address') || lower.includes('where')) {
        reply = "We are located at SRT-283, Main St, Opposite D Mart, First Floor, Sanath Nagar, Hyderabad - 500018 (near Toyota showroom).";
      } else if (lower.includes('implant') || lower.includes('teeth') || lower.includes('root canal') || lower.includes('treatment')) {
        reply = "We provide comprehensive specialist care for that procedure! Consultations are handled directly by qualified MDS dental surgeons.";
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'clinic',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 900);
  };

  const directWhatsAppUrl = `https://wa.me/${clinicInfo.contact.whatsapp}?text=${encodeURIComponent(initialMessage || "Hi Dr's White 32 Dental, I would like to inquire about dental services.")}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div 
        className="relative bg-[#efeae2] w-full max-w-md h-[88vh] sm:h-[620px] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-300 animate-scaleUp text-left my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* WhatsApp Header */}
        <div className="bg-[#075E54] text-white px-4 py-3 flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="w-9 h-9 rounded-full bg-navy-900 border border-gold-400/50 flex items-center justify-center font-serif font-bold text-gold-400 text-xs shrink-0">
              32
            </div>
            <div className="min-w-0">
              <div className="font-bold text-sm leading-tight text-white truncate">Dr's White 32 Dental</div>
              <div className="text-[10px] text-emerald-200">Online • Official Business</div>
            </div>
          </div>

          <div className="flex items-center space-x-1 shrink-0">
            <a
              href={`tel:${clinicInfo.contact.mobile}`}
              className="p-2 text-white hover:bg-emerald-800 rounded-full transition-colors"
              title="Call Clinic"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-2 text-white hover:bg-emerald-800 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Banner to launch real WhatsApp */}
        <div className="bg-[#dcf8c6] px-3 py-2 text-[11px] text-[#075E54] flex items-center justify-between border-b border-emerald-200/60 shrink-0">
          <span className="font-medium truncate">Simulated WhatsApp Demo</span>
          <a
            href={directWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline shrink-0 ml-2 hover:text-emerald-900"
          >
            Launch WhatsApp ↗
          </a>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-2.5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-2xs ${
                  msg.sender === 'user'
                    ? 'bg-[#d9fdd3] text-slate-800 rounded-tr-none'
                    : 'bg-white text-slate-800 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>
                <div className="flex items-center justify-end space-x-1 text-[9px] text-slate-400 mt-1">
                  <span>{msg.time}</span>
                  {msg.sender === 'user' && <CheckCheck className="w-3 h-3 text-[#53bdeb]" />}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center space-x-1.5 p-2.5 bg-white rounded-2xl rounded-tl-none text-xs text-slate-500 w-24 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]"></span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="bg-white/80 backdrop-blur-xs p-2 border-t border-slate-200 flex space-x-1.5 overflow-x-auto scrollbar-none shrink-0">
          <button
            onClick={() => handleSendUserMessage("Hi, I want to book an appointment.")}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-medium rounded-full whitespace-nowrap"
          >
            Book Appointment
          </button>
          <button
            onClick={() => handleSendUserMessage("What are your clinic timings?")}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-medium rounded-full whitespace-nowrap"
          >
            Timings
          </button>
          <button
            onClick={() => handleSendUserMessage("Where is the clinic located?")}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-medium rounded-full whitespace-nowrap"
          >
            Location
          </button>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendUserMessage();
          }}
          className="p-2 bg-[#f0f2f5] border-t border-slate-200 flex items-center space-x-2 shrink-0"
        >
          <input
            type="text"
            placeholder="Type a message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-full focus:outline-none focus:border-[#075E54]"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="w-9 h-9 rounded-full bg-[#00a884] hover:bg-[#075E54] text-white flex items-center justify-center transition-all disabled:opacity-40 shrink-0"
            aria-label="Send WhatsApp message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};

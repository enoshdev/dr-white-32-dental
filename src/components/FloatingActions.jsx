import React from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';

export const FloatingActions = ({ onOpenWhatsApp, onOpenAiChat }) => {
  return (
    <aside aria-label="Quick contact actions" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end space-y-2 pointer-events-none">
      
      {/* 1. Subtle Secondary AI Assistant Pill */}
      <button
        onClick={onOpenAiChat}
        className="pointer-events-auto group flex items-center space-x-1.5 px-3 py-1.5 bg-navy-900/90 hover:bg-navy-900 text-white rounded-full shadow-md border border-gold-500/30 hover:border-gold-500 transition-all active:scale-95 text-left"
        title="Chat with Dr's White 32 Dental Assistant"
      >
        <Sparkles className="w-3 h-3 text-gold-400 shrink-0" />
        <span className="text-[11px] font-semibold text-slate-200">
          Ask AI
        </span>
      </button>

      {/* 2. Primary 56px x 56px WhatsApp Action */}
      <button
        onClick={onOpenWhatsApp}
        className="pointer-events-auto group w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95"
        title="Chat on WhatsApp"
        aria-label="WhatsApp Contact"
      >
        <MessageCircle className="w-7 h-7 fill-white text-white" />
      </button>

    </aside>
  );
};

import React, { useState, useEffect } from 'react';
import { MessageCircle, Calendar, Menu, X } from 'lucide-react';
import { clinicInfo } from '../data/clinicData';

export const Header = ({ onOpenBooking, onOpenWhatsApp }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Treatments', href: '#treatments' },
    { name: 'Doctors', href: '#doctors' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Location', href: '#location' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-white/98 backdrop-blur-md shadow-sm py-3 border-b border-slate-200'
          : 'bg-white py-3.5 sm:py-5 border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between min-h-[52px] sm:min-h-[58px]">
        
        {/* Brand / Logo */}
        <a 
          href="#home" 
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center space-x-2.5 sm:space-x-3.5 group text-left min-w-0"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-navy-900 flex items-center justify-center border border-gold-500/30 group-hover:border-gold-500 transition-colors shadow-sm shrink-0">
            <span className="font-serif font-bold text-gold-400 text-base sm:text-lg">32</span>
          </div>
          <div className="min-w-0">
            <div className="font-serif font-bold text-base sm:text-xl text-navy-900 leading-tight group-hover:text-gold-600 transition-colors truncate">
              Dr's White 32 Dental
            </div>
            <div className="text-[9px] sm:text-[11px] uppercase tracking-wider text-slate-500 font-semibold mt-0.5 leading-none">
              Speciality Dental Clinic • Sanath Nagar
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links (>= md) */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navLinks.filter(l => l.name !== 'Home' && l.name !== 'Why Us' && l.name !== 'FAQ').map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-navy-900 transition-colors py-1"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="text-sm font-medium text-slate-600 hover:text-navy-900 transition-colors py-1"
          >
            Contact
          </a>
        </nav>

        {/* Desktop Right CTAs */}
        <div className="hidden md:flex items-center space-x-3.5 shrink-0">
          <button
            onClick={() => onOpenWhatsApp()}
            className="flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 transition-colors min-h-[40px]"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={() => onOpenBooking()}
            className="flex items-center space-x-2 px-4 lg:px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-navy-900 hover:bg-navy-800 rounded-xl shadow-sm transition-all border border-navy-700 min-h-[40px] active:scale-98"
          >
            <Calendar className="w-3.5 h-3.5 text-gold-400" />
            <span>BOOK APPOINTMENT</span>
          </button>
        </div>

        {/* Mobile Right Controls (< md) */}
        <div className="md:hidden flex items-center space-x-2 shrink-0">
          <button
            onClick={() => onOpenBooking()}
            className="px-3.5 py-2 text-[11px] font-bold uppercase tracking-wider text-white bg-navy-900 hover:bg-navy-800 rounded-xl shadow-sm min-h-[42px] flex items-center justify-center border border-navy-700 active:scale-95"
          >
            Book Slot
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-800 hover:bg-slate-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Full-screen Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[64px] bottom-0 bg-navy-950/50 backdrop-blur-xs z-50 animate-fadeIn flex flex-col">
          <div className="bg-white border-b border-slate-200 px-5 pt-3 pb-8 space-y-5 text-left shadow-2xl max-h-[calc(100vh-64px)] overflow-y-auto">
            
            {/* Navigation Links */}
            <div className="divide-y divide-slate-100">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3.5 text-base font-semibold text-slate-800 hover:text-navy-900 active:bg-slate-50 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3.5 text-base font-semibold text-slate-800 hover:text-navy-900 active:bg-slate-50 transition-colors"
              >
                Contact
              </a>
            </div>

            {/* Mobile Actions */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-4 px-4 text-xs font-bold uppercase tracking-wider text-white bg-navy-900 rounded-xl flex items-center justify-center space-x-2 shadow-sm min-h-[52px] active:scale-98"
              >
                <Calendar className="w-4 h-4 text-gold-400" />
                <span>BOOK AN APPOINTMENT</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWhatsApp();
                }}
                className="w-full py-3.5 px-4 text-xs font-semibold text-emerald-800 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-center space-x-2 min-h-[48px]"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Chat on WhatsApp</span>
              </button>

              <div className="pt-2 text-center text-xs text-slate-500">
                Direct Clinic Desk: <a href={`tel:${clinicInfo.contact.mobile}`} className="font-bold text-navy-900">{clinicInfo.contact.mobileFormatted}</a>
              </div>
            </div>

          </div>
          
          {/* Backdrop Click Dismiss */}
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)}></div>
        </div>
      )}
    </header>
  );
};

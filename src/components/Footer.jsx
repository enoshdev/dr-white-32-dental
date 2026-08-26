import React from 'react';
import { clinicInfo } from '../data/clinicData';
import { ArrowUp } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy-900 text-white border-t border-navy-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 sm:pt-14 sm:pb-10">
        
        {/* 3-Column Layout on Desktop, 1 Column on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 sm:pb-10 border-b border-navy-800 text-left">
          
          {/* Brand */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-navy-800 border border-gold-500/40 flex items-center justify-center text-gold-400 font-serif font-bold text-lg shrink-0">
                32
              </div>
              <div>
                <span className="font-serif font-bold text-lg sm:text-xl text-white">Dr's White 32 Dental</span>
                <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 font-semibold mt-0.5">
                  SPECIALITY DENTAL CLINIC • SANATH NAGAR
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm pt-1">
              Comprehensive oral healthcare delivered with personal attention by Dr. Mounika (MDS) & Dr. Sounica (MDS) in Sanath Nagar, Hyderabad.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-4 space-y-2.5">
            <h4 className="font-serif text-xs sm:text-sm font-bold text-gold-400 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><a href="#about" className="hover:text-gold-300 transition-colors py-1 inline-block">About</a></li>
              <li><a href="#treatments" className="hover:text-gold-300 transition-colors py-1 inline-block">Treatments</a></li>
              <li><a href="#doctors" className="hover:text-gold-300 transition-colors py-1 inline-block">Doctors</a></li>
              <li><a href="#location" className="hover:text-gold-300 transition-colors py-1 inline-block">Location</a></li>
              <li><a href="#contact" className="hover:text-gold-300 transition-colors py-1 inline-block">Contact & Appointments</a></li>
            </ul>
          </div>

          {/* Contact & Address */}
          <div className="md:col-span-4 space-y-3 text-xs text-slate-300">
            <h4 className="font-serif text-xs sm:text-sm font-bold text-gold-400 uppercase tracking-wider">
              Contact & Address
            </h4>
            <div className="space-y-2">
              <div>Mobile: <a href={`tel:${clinicInfo.contact.mobile}`} className="text-white font-semibold hover:text-gold-300">{clinicInfo.contact.mobileFormatted}</a></div>
              <div>Telephone: <a href={`tel:${clinicInfo.contact.telephone}`} className="text-white hover:text-gold-300">{clinicInfo.contact.telephoneFormatted}</a></div>
              <div>Email: <a href={`mailto:${clinicInfo.contact.email}`} className="text-slate-300 hover:text-white break-all">{clinicInfo.contact.email}</a></div>
              <div className="pt-1 text-slate-400">
                SRT-283, Main St, Opposite D Mart,<br />
                Sanath Nagar, Hyderabad - 500018
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Dr's White 32 Dental. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1 hover:text-white transition-colors py-1"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};

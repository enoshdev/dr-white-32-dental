import React from 'react';
import { X, Calendar, MessageCircle, Phone } from 'lucide-react';
import { clinicInfo } from '../data/clinicData';

export const TreatmentDetailModal = ({ treatment, isOpen, onClose, onSelectBooking, onWhatsApp }) => {
  if (!isOpen || !treatment) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div 
        className="relative bg-white rounded-2xl sm:rounded-3xl w-full max-w-lg max-h-[90vh] shadow-2xl overflow-hidden flex flex-col border border-slate-200 animate-scaleUp text-left my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md flex items-center justify-center transition-colors min-h-[36px] min-w-[36px]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image */}
        <div className="relative h-44 sm:h-56 w-full overflow-hidden bg-slate-100 shrink-0">
          <img
            src={treatment.image}
            alt={treatment.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent"></div>
          
          <div className="absolute bottom-3 sm:bottom-4 left-5 sm:left-6 right-5 sm:right-6 text-white">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight">
              {treatment.name}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 space-y-4 sm:space-y-5 overflow-y-auto flex-1">
          
          {/* Overview */}
          <div className="space-y-1.5">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Treatment Overview
            </h4>
            <p className="text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed font-normal">
              {treatment.description}
            </p>
          </div>

          {/* Educational Disclaimer */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px] sm:text-xs text-slate-600 leading-relaxed">
            This information is for general educational purposes. Treatment options are determined after an in-person consultation with a dental professional.
          </div>

          {/* CTAs */}
          <div className="pt-1 space-y-2">
            <button
              onClick={() => {
                onClose();
                onSelectBooking(treatment.name);
              }}
              className="w-full py-3.5 px-4 bg-navy-900 hover:bg-navy-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center space-x-2 border border-navy-700 active:scale-98 min-h-[48px]"
            >
              <Calendar className="w-4 h-4 text-gold-400 shrink-0" />
              <span>REQUEST APPOINTMENT</span>
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onClose();
                  onWhatsApp(`Hi Dr's White 32 Dental, I would like to inquire about ${treatment.name}.`);
                }}
                className="w-full py-3 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-xl font-semibold text-xs transition-colors border border-emerald-200 flex items-center justify-center space-x-1.5 min-h-[44px]"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>WhatsApp</span>
              </button>

              <a
                href={`tel:${clinicInfo.contact.mobile}`}
                className="w-full py-3 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-semibold text-xs transition-colors border border-slate-200 flex items-center justify-center space-x-1.5 min-h-[44px]"
              >
                <Phone className="w-3.5 h-3.5 text-navy-800 shrink-0" />
                <span>Call Clinic</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Calendar, Phone, MessageCircle, Stethoscope, Navigation } from 'lucide-react';
import { clinicInfo } from '../data/clinicData';

export const QuickActionBar = ({ onOpenBooking, onOpenWhatsApp }) => {
  return (
    <section className="relative -mt-8 z-20 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="bg-white rounded-2xl shadow-elevated border border-slate-200/90 p-3 sm:p-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 sm:gap-3">
          
          {/* Action 1: Book Appointment */}
          <button
            onClick={() => onOpenBooking()}
            className="flex items-center space-x-2.5 p-3 rounded-xl bg-navy-900 text-white hover:bg-navy-800 transition-all text-left group shadow-sm col-span-2 md:col-span-1"
          >
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-gold-400 group-hover:bg-white/20 transition-colors">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white leading-tight">Book Slot</div>
              <div className="text-[10px] text-slate-300">Fast Online Request</div>
            </div>
          </button>

          {/* Action 2: Call Clinic */}
          <a
            href={`tel:${clinicInfo.contact.mobile}`}
            className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-navy-900 transition-all text-left group border border-slate-200"
          >
            <div className="w-8 h-8 rounded-lg bg-navy-100 flex items-center justify-center text-navy-800 group-hover:bg-navy-200 transition-colors">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-navy-900 leading-tight">Call Clinic</div>
              <div className="text-[10px] text-slate-500">78010 10268</div>
            </div>
          </a>

          {/* Action 3: WhatsApp */}
          <button
            onClick={() => onOpenWhatsApp()}
            className="flex items-center space-x-2.5 p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 transition-all text-left group border border-emerald-200"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white group-hover:bg-emerald-600 transition-colors">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-950 leading-tight">WhatsApp</div>
              <div className="text-[10px] text-emerald-700">Quick AI & Support</div>
            </div>
          </button>

          {/* Action 4: Treatments */}
          <a
            href="#treatments"
            className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-navy-900 transition-all text-left group border border-slate-200"
          >
            <div className="w-8 h-8 rounded-lg bg-gold-100 flex items-center justify-center text-gold-700 group-hover:bg-gold-200 transition-colors">
              <Stethoscope className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-navy-900 leading-tight">Treatments</div>
              <div className="text-[10px] text-slate-500">11 Services</div>
            </div>
          </a>

          {/* Action 5: Get Directions */}
          <a
            href={clinicInfo.contact.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-navy-900 transition-all text-left group border border-slate-200 col-span-2 md:col-span-1"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 group-hover:bg-blue-200 transition-colors">
              <Navigation className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-navy-900 leading-tight">Directions</div>
              <div className="text-[10px] text-slate-500">Opp. D Mart, 1st Flr</div>
            </div>
          </a>

        </div>
      </div>
    </section>
  );
};

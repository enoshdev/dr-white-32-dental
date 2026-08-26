import React from 'react';
import { Calendar, ArrowRight, UserCheck, ShieldCheck, MapPin } from 'lucide-react';
import { clinicInfo } from '../data/clinicData';

export const Hero = ({ onOpenBooking }) => {
  return (
    <section id="home" className="relative bg-white pt-6 pb-12 sm:pt-12 sm:pb-18 lg:pt-16 lg:pb-24 border-b border-slate-100 overflow-hidden">
      
      {/* Ambient background light */}
      <div className="absolute top-1/4 right-1/3 w-72 sm:w-96 h-72 sm:h-96 bg-gold-100/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Mobile-First Visual Hierarchy */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
            
            {/* 1. Location Tag */}
            <div className="inline-flex items-center space-x-2 text-[11px] sm:text-xs font-semibold text-slate-600 tracking-wider uppercase bg-slate-50 sm:bg-transparent px-3 py-1.5 sm:p-0 rounded-full border border-slate-200/60 sm:border-none">
              <span className="w-2 h-2 rounded-full bg-gold-500 shrink-0"></span>
              <span>Sanath Nagar, Hyderabad</span>
            </div>

            {/* 2. Responsive Hero Headline */}
            <h1 className="font-serif text-[2.25rem] sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-navy-900 leading-[1.18] tracking-tight">
              Your Smile Deserves <br className="hidden sm:inline" />
              <span className="gold-gradient-text">Exceptional Care.</span>
            </h1>

            {/* 3. Supporting Copy (16-18px font size, comfortable line height) */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-normal">
              Comprehensive dental care delivered with expertise, personal attention and a focus on your comfort in Sanath Nagar, Hyderabad.
            </p>

            {/* 4. Primary & Secondary CTAs (Dominant 56px Primary, 54px Secondary on mobile) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <button
                onClick={() => onOpenBooking()}
                className="w-full sm:w-auto px-7 h-14 bg-navy-900 hover:bg-navy-800 text-white rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-sm hover:shadow-md flex items-center justify-center space-x-2 border border-navy-700 active:scale-98"
              >
                <Calendar className="w-4 h-4 text-gold-400 shrink-0" />
                <span>BOOK AN APPOINTMENT</span>
                <ArrowRight className="w-4 h-4 text-slate-300 ml-1 shrink-0" />
              </button>

              <a
                href="#treatments"
                className="w-full sm:w-auto px-6 h-[54px] bg-slate-50 hover:bg-slate-100 text-navy-900 rounded-xl font-semibold text-xs sm:text-sm transition-colors border border-slate-200 text-center flex items-center justify-center"
              >
                EXPLORE TREATMENTS
              </a>
            </div>

            {/* 5. Trust Indicators (Compact Stacked Rows/Cards on Mobile) */}
            <div className="pt-5 sm:pt-7 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4">
              <div className="flex items-center space-x-3 p-2.5 sm:p-0 bg-slate-50/70 sm:bg-transparent rounded-xl border border-slate-100 sm:border-none">
                <div className="p-2 bg-gold-50 text-gold-600 rounded-lg shrink-0">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div className="text-xs sm:text-xs font-bold text-navy-900 leading-snug">
                  Experienced & Qualified Doctors
                </div>
              </div>

              <div className="flex items-center space-x-3 p-2.5 sm:p-0 bg-slate-50/70 sm:bg-transparent rounded-xl border border-slate-100 sm:border-none">
                <div className="p-2 bg-slate-100 text-navy-800 rounded-lg shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-xs sm:text-xs font-bold text-navy-900 leading-snug">
                  Comprehensive Dental Care
                </div>
              </div>

              <div className="flex items-center space-x-3 p-2.5 sm:p-0 bg-slate-50/70 sm:bg-transparent rounded-xl border border-slate-100 sm:border-none">
                <div className="p-2 bg-slate-100 text-navy-800 rounded-lg shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-xs sm:text-xs font-bold text-navy-900 leading-snug">
                  Sanath Nagar Clinic
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Container (Fluid & responsive) */}
          <div className="lg:col-span-5 relative w-full pt-2 lg:pt-0">
            <div className="w-full max-w-lg mx-auto lg:max-w-none">
              
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl border border-slate-200/90 bg-slate-100 aspect-[4/3] sm:aspect-[16/10] lg:h-[460px] w-full">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80"
                  alt="Dr's White 32 Dental Operatory"
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent"></div>

                <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 right-4 sm:right-5 text-white text-left">
                  <div className="font-serif text-base sm:text-lg font-bold text-white">
                    Dr's White 32 Dental
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-200 mt-0.5 truncate">
                    SRT-283, Main St, Opposite D Mart, Sanath Nagar
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

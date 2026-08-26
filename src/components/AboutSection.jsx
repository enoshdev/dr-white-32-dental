import React from 'react';
import { clinicInfo } from '../data/clinicData';
import { Calendar, ArrowRight } from 'lucide-react';

export const AboutSection = ({ onOpenBooking }) => {
  return (
    <section id="about" className="py-12 sm:py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-center">
          
          {/* Left: Strong Single Editorial Image */}
          <div className="lg:col-span-5 relative w-full">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-md sm:shadow-lg border border-slate-200 aspect-[4/3] sm:aspect-[4/5] bg-slate-100 w-full">
              <img
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80"
                alt="Dr's White 32 Dental Consultation Facility"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent"></div>
            </div>
          </div>

          {/* Right: Narrative */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
            
            <div className="inline-flex items-center space-x-2 text-[11px] sm:text-xs font-bold text-gold-700 uppercase tracking-wider">
              <span>About Dr's White 32 Dental</span>
            </div>

            <h2 className="font-serif text-2.5xl sm:text-3xl lg:text-4xl font-bold text-navy-900 leading-tight">
              Personalized Dental Healthcare in Sanath Nagar
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed font-normal">
              Located conveniently opposite D Mart on Main Street in Sanath Nagar, Hyderabad, <strong>Dr's White 32 Dental</strong> provides comprehensive oral healthcare centered on patient comfort and clinical excellence.
            </p>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed font-normal">
              Led by <strong>Dr. Mounika, MDS</strong> and <strong>Dr. Sounica, MDS</strong>, our clinic offers a wide range of dental treatments ranging from preventive dentistry to advanced restorative and cosmetic solutions. We take time to understand your individual dental health needs and guide you with clear, transparent advice.
            </p>

            {/* Factual Highlights List */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs sm:text-sm text-slate-700 font-medium">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0"></span>
                <span>MDS Qualified Specialist Care</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0"></span>
                <span>Personalized Treatment Planning</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0"></span>
                <span>Comprehensive Range of 11 Services</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0"></span>
                <span>Sanath Nagar Landmark Location</span>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-3 sm:pt-4">
              <button
                onClick={() => onOpenBooking()}
                className="w-full sm:w-auto px-6 py-3.5 bg-navy-900 hover:bg-navy-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center space-x-2 border border-navy-700 min-h-[48px] active:scale-98"
              >
                <Calendar className="w-4 h-4 text-gold-400 shrink-0" />
                <span>REQUEST AN APPOINTMENT</span>
                <ArrowRight className="w-4 h-4 text-slate-300 ml-1 shrink-0" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

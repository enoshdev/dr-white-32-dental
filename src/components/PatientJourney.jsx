import React from 'react';
import { clinicInfo } from '../data/clinicData';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const PatientJourney = ({ onOpenBooking }) => {
  return (
    <section className="py-20 lg:py-28 bg-navy-900 text-white relative overflow-hidden border-t border-gold-500/20">
      
      {/* Background Decorative Blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-white/10 border border-gold-400/30 text-xs font-bold text-gold-400 uppercase tracking-wider">
            <span>Seamless Patient Care</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Your Care Journey with Us
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto">
            A transparent and stress-free process designed to give you clarity and comfort at every stage.
          </p>
        </div>

        {/* 5-Step Stepper */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {clinicInfo.patientJourney.map((step, idx) => (
            <div
              key={idx}
              className="bg-navy-800/80 backdrop-blur-sm rounded-2xl p-6 border border-navy-700 hover:border-gold-500/50 transition-all duration-300 flex flex-col justify-between text-left group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-3xl font-bold text-gold-400">
                    {step.step}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-gold-400/40 group-hover:bg-gold-400 transition-colors" />
                </div>

                <h3 className="font-serif text-lg font-bold text-white leading-snug group-hover:text-gold-300 transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>

              {idx < 4 && (
                <div className="hidden md:block pt-4 text-slate-600">
                  <ArrowRight className="w-4 h-4 text-gold-500/40" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action button */}
        <div className="mt-14 text-center">
          <button
            onClick={() => onOpenBooking()}
            className="px-8 py-3.5 bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg inline-flex items-center space-x-2"
          >
            <span>Begin Step 01 — Request an Appointment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { clinicInfo } from '../data/clinicData';

export const WhyChooseUs = () => {
  return (
    <section id="why-us" className="py-12 sm:py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-2.5 sm:space-y-3 mb-10 sm:mb-16">
          <div className="inline-flex items-center space-x-2 text-[11px] sm:text-xs font-bold text-gold-700 uppercase tracking-wider">
            <span>Our Philosophy</span>
          </div>
          <h2 className="font-serif text-2.5xl sm:text-4xl lg:text-5xl font-bold text-navy-900 leading-tight">
            Why Choose Dr's White 32 Dental
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-lg mx-auto">
            Committed to patient comfort, clinical integrity, and accessible dental healthcare.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {clinicInfo.whyChooseUs.map((item, idx) => (
            <div
              key={item.id}
              className={`bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/80 hover:border-gold-400/80 hover:shadow-card transition-all duration-300 flex flex-col text-left space-y-2.5 sm:space-y-3 ${
                idx === 4 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="text-xs font-bold font-mono text-gold-600 uppercase tracking-wider">
                0{item.id}
              </div>

              <h3 className="font-serif text-lg sm:text-xl font-bold text-navy-900">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

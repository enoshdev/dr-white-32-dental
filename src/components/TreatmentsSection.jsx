import React from 'react';
import { treatments } from '../data/clinicData';
import { ChevronRight } from 'lucide-react';

export const TreatmentsSection = ({ onSelectTreatment }) => {
  return (
    <section id="treatments" className="py-12 sm:py-20 lg:py-28 bg-slate-50 relative border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-2.5 sm:space-y-3 mb-10 sm:mb-16">
          <div className="inline-flex items-center space-x-2 text-[11px] sm:text-xs font-bold text-gold-700 uppercase tracking-wider">
            <span>Our Services</span>
          </div>
          <h2 className="font-serif text-2.5xl sm:text-4xl lg:text-5xl font-bold text-navy-900 leading-tight">
            Comprehensive Dental Care
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            From preventive care to advanced restorative and cosmetic treatments, our clinic provides a wide range of dental services.
          </p>
        </div>

        {/* 11 Treatments Grid (1 col on mobile, 2 on tablet, 3 on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {treatments.map((treatment) => (
            <div
              key={treatment.id}
              onClick={() => onSelectTreatment(treatment)}
              className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-card hover:border-gold-400/80 transition-all duration-200 flex flex-col group cursor-pointer text-left active:scale-[0.99] touch-manipulation"
            >
              {/* Image with 16/10 aspect ratio */}
              <div className="relative aspect-[16/10] sm:h-52 w-full overflow-hidden bg-slate-100 shrink-0">
                <img
                  src={treatment.image}
                  alt={treatment.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-navy-900/85 backdrop-blur-xs text-gold-400 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                  Speciality Care
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3.5">
                <div className="space-y-1.5">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-navy-900 group-hover:text-gold-600 transition-colors">
                    {treatment.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {treatment.shortDesc}
                  </p>
                </div>

                <div className="pt-2 flex items-center text-xs font-bold text-gold-600 group-hover:text-gold-700 min-h-[32px]">
                  <span>View Treatment Details</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { treatments } from '../data/clinicData';
import { Calendar, MessageCircle } from 'lucide-react';

export const FeaturedTreatments = ({ onOpenBooking, onOpenWhatsApp }) => {
  const featuredList = treatments.filter(t => 
    ['dental-implants', 'smile-designing', 'teeth-whitening', 'root-canal-treatment', 'full-teeth-replacement'].includes(t.id)
  );

  const [selectedId, setSelectedId] = useState(featuredList[0]?.id || 'dental-implants');
  const activeTreatment = featuredList.find(t => t.id === selectedId) || featuredList[0];

  return (
    <section className="py-12 sm:py-20 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-2 sm:space-y-3 mb-8 sm:mb-10 text-left sm:text-center">
          <div className="inline-flex items-center space-x-2 text-[11px] sm:text-xs font-bold text-gold-700 uppercase tracking-wider">
            <span>Specialized Focus</span>
          </div>
          <h2 className="font-serif text-2.5xl sm:text-3xl lg:text-4xl font-bold text-navy-900 leading-tight">
            Featured Procedures
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600">
            Key treatments provided at Dr's White 32 Dental in Sanath Nagar.
          </p>
        </div>

        {/* Tab Buttons (Horizontal scroll on mobile with touch snapping) */}
        <div className="flex space-x-2 overflow-x-auto pb-3 mb-6 sm:mb-8 scrollbar-none justify-start sm:justify-center border-b border-slate-100 -mx-4 px-4 sm:mx-0 sm:px-0">
          {featuredList.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`px-3.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all shrink-0 min-h-[40px] ${
                selectedId === item.id
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-navy-900 border border-slate-200'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Active Procedure Editorial Card */}
        {activeTreatment && (
          <div className="bg-slate-50 rounded-2xl sm:rounded-3xl border border-slate-200/80 p-5 sm:p-8 lg:p-10 max-w-5xl mx-auto text-left">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
              
              <div className="md:col-span-7 space-y-4 sm:space-y-5">
                <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-navy-900 leading-tight">
                  {activeTreatment.name}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed font-normal">
                  {activeTreatment.description}
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                  <button
                    onClick={() => onOpenBooking(activeTreatment.name)}
                    className="w-full sm:w-auto px-5 py-3.5 bg-navy-900 hover:bg-navy-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center space-x-2 border border-navy-700 min-h-[48px] active:scale-98"
                  >
                    <Calendar className="w-4 h-4 text-gold-400 shrink-0" />
                    <span>Request Appointment</span>
                  </button>

                  <button
                    onClick={() => onOpenWhatsApp(`Hi Dr's White 32 Dental, I would like to inquire about ${activeTreatment.name}.`)}
                    className="w-full sm:w-auto px-4 py-3.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-xl font-semibold text-xs transition-colors border border-emerald-200 flex items-center justify-center space-x-1.5 min-h-[48px]"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>

              <div className="md:col-span-5 w-full">
                <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-md aspect-[16/10] sm:aspect-[4/3] bg-slate-200 w-full">
                  <img
                    src={activeTreatment.image}
                    alt={activeTreatment.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

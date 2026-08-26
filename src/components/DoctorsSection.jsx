import React from 'react';
import { clinicInfo } from '../data/clinicData';
import { Calendar } from 'lucide-react';

export const DoctorsSection = ({ onOpenBooking }) => {
  return (
    <section id="doctors" className="py-12 sm:py-20 lg:py-28 bg-slate-50 relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-2.5 sm:space-y-3 mb-10 sm:mb-16">
          <div className="inline-flex items-center space-x-2 text-[11px] sm:text-xs font-bold text-gold-700 uppercase tracking-wider">
            <span>Our Team</span>
          </div>
          <h2 className="font-serif text-2.5xl sm:text-4xl lg:text-5xl font-bold text-navy-900 leading-tight">
            Meet Our Doctors
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-lg mx-auto">
            Consultations and treatments are provided by our qualified dental professionals.
          </p>
        </div>

        {/* Doctor Cards (1 per row on mobile, 2 on tablet/desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8 max-w-3xl mx-auto">
          {clinicInfo.doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-9 border border-slate-200/80 shadow-soft hover:shadow-card hover:border-gold-400/80 transition-all duration-300 flex flex-col justify-between text-left space-y-5"
            >
              <div className="space-y-3.5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-navy-900 text-gold-400 flex items-center justify-center font-serif font-bold text-lg sm:text-xl shadow-sm">
                  {doctor.name.replace('Dr. ', '').charAt(0)}
                </div>

                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy-900">
                    {doctor.name}
                  </h3>
                  <div className="text-xs font-bold uppercase tracking-wider text-gold-600 mt-0.5">
                    {doctor.qualification}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Qualified Master of Dental Surgery (MDS) professional practicing at Dr's White 32 Dental in Sanath Nagar.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={() => onOpenBooking(`Consultation with ${doctor.name}, ${doctor.qualification}`)}
                  className="w-full py-3 sm:py-3.5 bg-navy-900 hover:bg-navy-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center space-x-2 min-h-[48px] active:scale-98"
                >
                  <Calendar className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Request Consultation</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

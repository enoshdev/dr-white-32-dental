import React from 'react';
import { clinicInfo } from '../data/clinicData';
import { MapPin, Phone, Clock, Navigation, MessageCircle } from 'lucide-react';

export const LocationSection = ({ onOpenWhatsApp }) => {
  return (
    <section id="location" className="py-12 sm:py-20 lg:py-24 bg-slate-50 relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-2.5 sm:space-y-3 mb-10 sm:mb-16">
          <div className="inline-flex items-center space-x-2 text-[11px] sm:text-xs font-bold text-gold-700 uppercase tracking-wider">
            <span>Find Us</span>
          </div>
          <h2 className="font-serif text-2.5xl sm:text-4xl lg:text-5xl font-bold text-navy-900 leading-tight">
            Visit Dr's White 32 Dental
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 max-w-lg mx-auto">
            Conveniently located in Sanath Nagar, Hyderabad.
          </p>
        </div>

        {/* Location & Details 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Address & Hours */}
          <div className="lg:col-span-6 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-9 border border-slate-200/80 shadow-soft flex flex-col justify-between text-left space-y-6">
            <div className="space-y-4 sm:space-y-5">
              
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy-900">
                  Dr's White 32 Dental
                </h3>
                <div className="text-xs text-slate-500 mt-0.5">Speciality Dental Clinic</div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-3 text-xs sm:text-sm text-slate-700">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-navy-900">Clinic Address:</div>
                  <p className="text-slate-600 leading-relaxed mt-0.5">
                    SRT-283, Main St, Opposite D Mart,<br />
                    First Floor, Sanath Nagar,<br />
                    Hyderabad - 500018, Telangana
                  </p>
                </div>
              </div>

              {/* Contact numbers */}
              <div className="flex items-start space-x-3 text-xs sm:text-sm text-slate-700">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-navy-900">Phone & Email:</div>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">
                    Mobile: <a href={`tel:${clinicInfo.contact.mobile}`} className="font-semibold text-navy-900 hover:text-gold-600">{clinicInfo.contact.mobileFormatted}</a><br />
                    Telephone: <a href={`tel:${clinicInfo.contact.telephone}`} className="text-slate-700 hover:text-navy-900">{clinicInfo.contact.telephoneFormatted}</a><br />
                    Email: <a href={`mailto:${clinicInfo.contact.email}`} className="text-slate-700 hover:text-navy-900 break-all">{clinicInfo.contact.email}</a>
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start space-x-3 text-xs sm:text-sm text-slate-700">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-navy-900">Opening Hours:</div>
                  <div className="text-slate-600 mt-0.5 space-y-0.5 text-xs sm:text-sm">
                    <div>Mon - Sat: <strong className="text-navy-900">10:00 AM - 8:30 PM</strong></div>
                    <div>Sunday: <strong className="text-gold-600">11:00 AM - 1:00 PM</strong></div>
                  </div>
                </div>
              </div>

            </div>

            {/* Direct Action Buttons */}
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row flex-wrap gap-2.5">
              <a
                href={clinicInfo.contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-3 bg-navy-900 hover:bg-navy-800 text-white rounded-xl font-semibold text-xs transition-colors flex items-center justify-center space-x-1.5 min-h-[44px]"
              >
                <Navigation className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span>GET DIRECTIONS</span>
              </a>

              <a
                href={`tel:${clinicInfo.contact.mobile}`}
                className="w-full sm:w-auto px-4 py-3 bg-slate-100 hover:bg-slate-200 text-navy-900 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center space-x-1.5 min-h-[44px]"
              >
                <Phone className="w-3.5 h-3.5 text-navy-800 shrink-0" />
                <span>CALL CLINIC</span>
              </a>

              <button
                onClick={() => onOpenWhatsApp()}
                className="w-full sm:w-auto px-4 py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-xl font-semibold text-xs transition-colors border border-emerald-200 flex items-center justify-center space-x-1.5 min-h-[44px]"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>WHATSAPP</span>
              </button>
            </div>

          </div>

          {/* Location Map Visual Box */}
          <div className="lg:col-span-6 bg-slate-900 rounded-2xl sm:rounded-3xl overflow-hidden shadow-soft border border-slate-200 relative min-h-[260px] sm:min-h-[320px] flex flex-col justify-between p-6 sm:p-8 text-left text-white w-full">
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80"
                alt="Sanath Nagar Map Overview"
                className="w-full h-full object-cover opacity-20 filter grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/80 to-navy-900/50"></div>
            </div>

            <div className="relative z-10">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-gold-400 font-bold">
                Landmark Guide
              </span>
              <h4 className="font-serif text-lg sm:text-2xl font-bold text-white mt-1">
                Opposite D Mart, First Floor
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                Situated along Main Street in Sanath Nagar (near Toyota Showroom). Easily accessible with dedicated elevator and parking.
              </p>
            </div>

            <div className="relative z-10 pt-4">
              <a
                href={clinicInfo.contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-3 bg-white text-navy-900 font-bold text-xs rounded-xl shadow transition-colors hover:bg-slate-100 min-h-[44px]"
              >
                <Navigation className="w-4 h-4 text-gold-600 shrink-0" />
                <span>Open in Google Maps</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

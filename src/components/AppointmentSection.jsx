import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, AlertCircle, Loader2, MessageCircle } from 'lucide-react';
import { treatments, clinicInfo } from '../data/clinicData';

export const AppointmentSection = ({ onOpenWhatsApp }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'General Dental Consultation',
    preferred_date: '',
    preferred_time: '11:30 AM',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successLead, setSuccessLead] = useState(null);

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, preferred_date: dateStr }));
  }, []);

  const timeSlots = [
    '10:30 AM', '11:30 AM', '12:30 PM',
    '04:30 PM', '05:30 PM', '06:30 PM', '07:30 PM'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'website_appointment_section'
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit appointment request');
      }

      setSuccessLead(data.lead);
    } catch (err) {
      console.error('Booking submission error:', err);
      setError(err.message || 'Network error submitting request. Please call 7801010268.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-20 lg:py-24 bg-white relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-2.5 sm:space-y-3 mb-8 sm:mb-12">
          <div className="inline-flex items-center space-x-2 text-[11px] sm:text-xs font-bold text-gold-700 uppercase tracking-wider">
            <span>Appointments</span>
          </div>
          <h2 className="font-serif text-2.5xl sm:text-3xl lg:text-4xl font-bold text-navy-900 leading-tight">
            Ready to take the next step for your smile?
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600">
            Request an appointment and our clinic team can help you with the next step.
          </p>
        </div>

        {/* Appointment Form Container */}
        <div className="max-w-2xl mx-auto bg-slate-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 border border-slate-200/80 shadow-soft text-left">
          
          {successLead ? (
            <div className="text-center py-6 sm:py-8 space-y-4 sm:space-y-5 animate-fadeIn">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>

              <div className="space-y-1.5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy-900">
                  Request Received
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Thank you. Your appointment request has been received. Our clinic team will contact you to confirm availability.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-4 max-w-sm mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Lead ID:</span>
                  <span className="font-mono font-bold text-navy-900">{successLead.lead_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-semibold text-navy-900">{successLead.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Preferred Time:</span>
                  <span className="font-semibold text-navy-900">{successLead.preferred_date} ({successLead.preferred_time})</span>
                </div>
              </div>

              <button
                onClick={() => setSuccessLead(null)}
                className="w-full sm:w-auto px-6 py-3 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-semibold min-h-[44px]"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center space-x-2 text-rose-700 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Reddy"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-[52px] px-3.5 text-sm bg-white border border-slate-300 rounded-xl focus:border-navy-900 focus:ring-2 focus:ring-navy-900/10 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 78010 10268"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-[52px] px-3.5 text-sm bg-white border border-slate-300 rounded-xl focus:border-navy-900 focus:ring-2 focus:ring-navy-900/10 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Email & Service */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-[52px] px-3.5 text-sm bg-white border border-slate-300 rounded-xl focus:border-navy-900 focus:ring-2 focus:ring-navy-900/10 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1">
                    Treatment / Concern
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full h-[52px] px-3 text-sm bg-white border border-slate-300 rounded-xl focus:border-navy-900 focus:ring-2 focus:ring-navy-900/10 outline-none transition-all cursor-pointer"
                  >
                    <option value="General Dental Consultation">General Dental Consultation</option>
                    {treatments.map((t) => (
                      <option key={t.id} value={t.name}>{t.name}</option>
                    ))}
                    <option value="Consultation with Dr. Mounika (MDS)">Consultation with Dr. Mounika (MDS)</option>
                    <option value="Consultation with Dr. Sounica (MDS)">Consultation with Dr. Sounica (MDS)</option>
                  </select>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.preferred_date}
                    onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                    className="w-full h-[52px] px-3.5 text-sm bg-white border border-slate-300 rounded-xl focus:border-navy-900 focus:ring-2 focus:ring-navy-900/10 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1">
                    Preferred Time
                  </label>
                  <select
                    value={formData.preferred_time}
                    onChange={(e) => setFormData({ ...formData, preferred_time: e.target.value })}
                    className="w-full h-[52px] px-3 text-sm bg-white border border-slate-300 rounded-xl focus:border-navy-900 focus:ring-2 focus:ring-navy-900/10 outline-none transition-all cursor-pointer"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1">
                  Message (Optional)
                </label>
                <textarea
                  rows="2"
                  placeholder="Tell us anything you'd like the clinic team to know..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3.5 text-sm bg-white border border-slate-300 rounded-xl focus:border-navy-900 focus:ring-2 focus:ring-navy-900/10 outline-none transition-all resize-none"
                />
              </div>

              {/* Actions (Stack on mobile, row on tablet/desktop) */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:flex-1 h-[52px] sm:h-14 bg-navy-900 hover:bg-navy-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center space-x-2 border border-navy-700 active:scale-98 disabled:opacity-50 min-h-[48px]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-gold-400" />
                      <span>Sending Request...</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4 text-gold-400" />
                      <span>REQUEST APPOINTMENT</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => onOpenWhatsApp()}
                  className="w-full sm:w-auto px-5 h-[52px] sm:h-14 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-xl font-semibold text-xs transition-colors border border-emerald-200 flex items-center justify-center space-x-1.5 min-h-[48px]"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>WHATSAPP US</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};

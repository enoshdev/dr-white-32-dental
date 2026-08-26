import React, { useState, useEffect } from 'react';
import { X, Calendar, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { treatments, clinicInfo } from '../data/clinicData';

export const AppointmentModal = ({ isOpen, onClose, preselectedService, onLeadCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    patient_type: 'New Patient',
    service: preselectedService || 'General Dental Consultation',
    preferred_date: '',
    preferred_time: '11:00 AM',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successLead, setSuccessLead] = useState(null);

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, preferred_date: dateStr }));
  }, []);

  if (!isOpen) return null;

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
          source: 'appointment_modal'
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit appointment request');
      }

      setSuccessLead(data.lead);
      if (onLeadCreated) onLeadCreated(data.lead);
    } catch (err) {
      console.error('Booking submission error:', err);
      setError(err.message || 'Network error submitting request. Please call 7801010268.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setSuccessLead(null);
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      
      {/* Centered Modal Container (Max Width ~760px, 90vh max height, 16-20px rounded) */}
      <div 
        className="relative bg-white rounded-2xl sm:rounded-3xl w-full max-w-[760px] max-h-[90vh] shadow-2xl overflow-hidden flex flex-col border border-slate-200 text-left animate-scaleUp my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Dark Navy Header with Padding: 32px desktop / 24px mobile */}
        <div className="bg-navy-900 text-white p-5 sm:p-8 relative shrink-0 border-b border-navy-800">
          
          {/* Close Button: Top-Right, Circular, Inside Header */}
          <button
            onClick={handleResetAndClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white flex items-center justify-center transition-colors"
            aria-label="Close appointment modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="pr-10 space-y-1 sm:space-y-1.5">
            <div className="text-[10px] sm:text-xs font-bold text-gold-400 uppercase tracking-wider">
              DR'S WHITE 32 DENTAL • SANATH NAGAR
            </div>
            
            <h2 className="font-serif text-xl sm:text-3xl font-bold text-white leading-tight">
              Request an Appointment
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl pt-0.5">
              Fill in your details and preferred appointment time. Our clinic team will contact you to confirm availability.
            </p>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1 bg-white">
          
          {/* SUCCESS STATE */}
          {successLead ? (
            <div className="text-center py-6 sm:py-8 space-y-4 sm:space-y-5 animate-fadeIn">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>

              <div className="space-y-1.5">
                <h3 className="font-serif text-xl sm:text-3xl font-bold text-navy-900">
                  Appointment Request Received
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-navy-900">{successLead.patient_name}</strong>. Your request has been recorded. Our clinic team will contact you to confirm availability.
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 max-w-md mx-auto text-left space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Reference ID:</span>
                  <span className="font-mono font-bold text-navy-900 text-sm">{successLead.lead_id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Treatment:</span>
                  <span className="font-semibold text-navy-900">{successLead.service}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Preferred Slot:</span>
                  <span className="font-semibold text-navy-900">{successLead.preferred_date} ({successLead.preferred_time})</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Contact Phone:</span>
                  <span className="font-semibold text-navy-900">{successLead.phone}</span>
                </div>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row justify-center gap-2.5">
                <button
                  onClick={handleResetAndClose}
                  className="w-full sm:w-auto px-7 py-3 bg-navy-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-navy-800 transition-colors min-h-[44px]"
                >
                  Done
                </button>
                <a
                  href={`tel:${clinicInfo.contact.mobile}`}
                  className="w-full sm:w-auto px-5 py-3 bg-slate-100 text-navy-900 rounded-xl text-xs font-semibold hover:bg-slate-200 transition-colors min-h-[44px] flex items-center justify-center"
                >
                  Call Clinic Directly
                </a>
              </div>
            </div>
          ) : (
            /* FORM STATE */
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              
              {error && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center space-x-2.5 text-rose-700 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Mobile 1-Column, Desktop 2-Column Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                
                {/* 1. Full Name */}
                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                    Full Name <span className="text-slate-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Reddy"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-[52px] sm:h-[54px] px-4 text-sm bg-white border border-[#d8dee8] rounded-xl text-navy-900 placeholder:text-slate-400 focus:border-navy-900 focus:ring-2 focus:ring-navy-900/10 outline-none transition-all"
                  />
                </div>

                {/* 2. Phone Number */}
                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                    Phone Number <span className="text-slate-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 78010 10268"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-[52px] sm:h-[54px] px-4 text-sm bg-white border border-[#d8dee8] rounded-xl text-navy-900 placeholder:text-slate-400 focus:border-navy-900 focus:ring-2 focus:ring-navy-900/10 outline-none transition-all"
                  />
                </div>

                {/* 3. Email Address */}
                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                    Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-[52px] sm:h-[54px] px-4 text-sm bg-white border border-[#d8dee8] rounded-xl text-navy-900 placeholder:text-slate-400 focus:border-navy-900 focus:ring-2 focus:ring-navy-900/10 outline-none transition-all"
                  />
                </div>

                {/* 4. Patient Type */}
                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                    Patient Type
                  </label>
                  <select
                    value={formData.patient_type}
                    onChange={(e) => setFormData({ ...formData, patient_type: e.target.value })}
                    className="w-full h-[52px] sm:h-[54px] px-4 text-sm bg-white border border-[#d8dee8] rounded-xl text-navy-900 focus:border-navy-900 focus:ring-2 focus:ring-navy-900/10 outline-none transition-all cursor-pointer"
                  >
                    <option value="New Patient">New Patient (First Visit)</option>
                    <option value="Existing Patient">Existing Patient (Follow-up)</option>
                  </select>
                </div>

                {/* 5. Treatment / Concern (Full Width) */}
                <div className="sm:col-span-2">
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                    Treatment / Concern <span className="text-slate-400">*</span>
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full h-[52px] sm:h-[54px] px-4 text-sm bg-white border border-[#d8dee8] rounded-xl text-navy-900 focus:border-navy-900 focus:ring-2 focus:ring-navy-900/10 outline-none transition-all cursor-pointer"
                  >
                    <option value="General Dental Consultation">General Dental Consultation</option>
                    {treatments.map((t) => (
                      <option key={t.id} value={t.name}>{t.name}</option>
                    ))}
                    <option value="Consultation with Dr. Mounika (MDS)">Consultation with Dr. Mounika (MDS)</option>
                    <option value="Consultation with Dr. Sounica (MDS)">Consultation with Dr. Sounica (MDS)</option>
                  </select>
                </div>

                {/* 6. Preferred Date */}
                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.preferred_date}
                    onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                    className="w-full h-[52px] sm:h-[54px] px-4 text-sm bg-white border border-[#d8dee8] rounded-xl text-navy-900 focus:border-navy-900 focus:ring-2 focus:ring-navy-900/10 outline-none transition-all"
                  />
                </div>

                {/* 7. Preferred Time */}
                <div>
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                    Preferred Time
                  </label>
                  <select
                    value={formData.preferred_time}
                    onChange={(e) => setFormData({ ...formData, preferred_time: e.target.value })}
                    className="w-full h-[52px] sm:h-[54px] px-4 text-sm bg-white border border-[#d8dee8] rounded-xl text-navy-900 focus:border-navy-900 focus:ring-2 focus:ring-navy-900/10 outline-none transition-all cursor-pointer"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>

                {/* 8. Brief Note or Symptoms (Full Width) */}
                <div className="sm:col-span-2">
                  <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
                    Brief Note or Symptoms <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Tell us anything you'd like the clinic team to know..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full h-[100px] sm:h-[110px] p-3.5 sm:p-4 text-sm bg-white border border-[#d8dee8] rounded-xl text-navy-900 placeholder:text-slate-400 focus:border-navy-900 focus:ring-2 focus:ring-navy-900/10 outline-none transition-all resize-none"
                  />
                </div>

              </div>

              {/* 9. Submit CTA Button (56px height, rounded-xl) */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 bg-navy-900 hover:bg-navy-800 text-white rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-sm flex items-center justify-center space-x-2 border border-navy-700 active:scale-98 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-gold-400" />
                      <span>Submitting Request...</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4 text-gold-400" />
                      <span>REQUEST APPOINTMENT</span>
                    </>
                  )}
                </button>
              </div>

              {/* 10. Footer Note */}
              <p className="text-[11px] sm:text-xs text-slate-500 text-center pt-1 sm:pt-2 leading-relaxed">
                Your request will be reviewed by the clinic team before final confirmation.
              </p>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};

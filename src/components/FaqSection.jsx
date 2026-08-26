import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const cleanFaqs = [
    {
      question: "What treatments do you provide at Dr's White 32 Dental?",
      answer: "We provide comprehensive dental services including Dental Implants, Full Teeth Replacement, Smile Designing, Root Canal Treatment, Dental Crowns, Dental Bridges, Teeth Whitening, Laser Gum Treatment, Atraumatic Extraction, Dental Fillings, and Pediatric Dentistry."
    },
    {
      question: "What are your clinic timings?",
      answer: "Dr's White 32 Dental is open Monday through Saturday from 10:00 AM to 8:30 PM, and on Sundays from 11:00 AM to 1:00 PM."
    },
    {
      question: "Where is the clinic located?",
      answer: "Our clinic is located at SRT-283, Main St, Opposite D Mart, First Floor, Sanath Nagar, Hyderabad - 500018, Telangana (near Toyota Showroom)."
    },
    {
      question: "How can I book an appointment?",
      answer: "You can request an appointment through our online form, message us on WhatsApp, or call our desk directly at 7801010268 / 040 46035369."
    },
    {
      question: "Who are the doctors at Dr's White 32 Dental?",
      answer: "Treatments and consultations are conducted directly by qualified Master of Dental Surgery (MDS) doctors: Dr. Mounika, MDS and Dr. Sounica, MDS."
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white relative border-t border-slate-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10 sm:mb-12">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-gold-700 uppercase tracking-wider">
            <span>Inquiries</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-900 leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Common questions regarding our clinic in Sanath Nagar.
          </p>
        </div>

        {/* 5 Clean FAQ Items */}
        <div className="space-y-3">
          {cleanFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden text-left ${
                  isOpen ? 'border-gold-400 bg-slate-50/50 shadow-soft' : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between space-x-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-navy-900 leading-snug">
                    {faq.question}
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'bg-navy-900 text-gold-400 rotate-180' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3.5 animate-fadeIn">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

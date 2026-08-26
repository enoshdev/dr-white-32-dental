import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { TreatmentsSection } from './components/TreatmentsSection';
import { TreatmentDetailModal } from './components/TreatmentDetailModal';
import { FeaturedTreatments } from './components/FeaturedTreatments';
import { WhyChooseUs } from './components/WhyChooseUs';
import { DoctorsSection } from './components/DoctorsSection';
import { AppointmentSection } from './components/AppointmentSection';
import { LocationSection } from './components/LocationSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { AppointmentModal } from './components/AppointmentModal';
import { WhatsAppDemoModal } from './components/WhatsAppDemoModal';
import { AiReceptionistModal } from './components/AiReceptionistModal';

export function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState('');
  
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [whatsappInitialMessage, setWhatsappInitialMessage] = useState('');

  const [aiChatOpen, setAiChatOpen] = useState(false);

  const [selectedTreatmentDetail, setSelectedTreatmentDetail] = useState(null);
  const [treatmentDetailOpen, setTreatmentDetailOpen] = useState(false);

  const handleOpenBooking = (serviceName = 'General Dental Consultation') => {
    setSelectedServiceForBooking(serviceName);
    setBookingModalOpen(true);
  };

  const handleOpenWhatsApp = (customMessage = '') => {
    setWhatsappInitialMessage(customMessage);
    setWhatsappModalOpen(true);
  };

  const handleSelectTreatment = (treatment) => {
    setSelectedTreatmentDetail(treatment);
    setTreatmentDetailOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-navy-900 flex flex-col selection:bg-gold-500 selection:text-white">
      
      {/* 1. Single Clean Navbar */}
      <Header
        onOpenBooking={() => handleOpenBooking()}
        onOpenWhatsApp={() => handleOpenWhatsApp()}
      />

      <main className="flex-grow">
        {/* 2. Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 3. About Section */}
        <AboutSection
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 4. Comprehensive Treatments (11 Services) */}
        <TreatmentsSection
          onSelectTreatment={handleSelectTreatment}
        />

        {/* 5. Featured Treatments Spotlight */}
        <FeaturedTreatments
          onOpenBooking={(service) => handleOpenBooking(service)}
          onOpenWhatsApp={(msg) => handleOpenWhatsApp(msg)}
        />

        {/* 6. Why Choose Us (5 Factual Points) */}
        <WhyChooseUs />

        {/* 7. Meet Our Doctors (Dr. Mounika MDS & Dr. Sounica MDS) */}
        <DoctorsSection
          onOpenBooking={(service) => handleOpenBooking(service)}
        />

        {/* 8. Appointment CTA & Form */}
        <AppointmentSection
          onOpenWhatsApp={() => handleOpenWhatsApp()}
        />

        {/* 9. FAQ Section */}
        <FaqSection />

        {/* 10. Location & Contact */}
        <LocationSection
          onOpenWhatsApp={() => handleOpenWhatsApp()}
        />
      </main>

      {/* 11. Clean Footer */}
      <Footer />

      {/* Floating WhatsApp & Compact AI Chat Action */}
      <FloatingActions
        onOpenWhatsApp={() => handleOpenWhatsApp()}
        onOpenAiChat={() => setAiChatOpen(true)}
      />

      {/* Modals */}
      <AppointmentModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedService={selectedServiceForBooking}
      />

      <TreatmentDetailModal
        treatment={selectedTreatmentDetail}
        isOpen={treatmentDetailOpen}
        onClose={() => setTreatmentDetailOpen(false)}
        onSelectBooking={(service) => handleOpenBooking(service)}
        onWhatsApp={(msg) => handleOpenWhatsApp(msg)}
      />

      <WhatsAppDemoModal
        isOpen={whatsappModalOpen}
        onClose={() => setWhatsappModalOpen(false)}
        initialMessage={whatsappInitialMessage}
        onOpenBooking={() => handleOpenBooking()}
      />

      <AiReceptionistModal
        isOpen={aiChatOpen}
        onClose={() => setAiChatOpen(false)}
        onOpenBooking={() => handleOpenBooking()}
        onOpenWhatsApp={() => handleOpenWhatsApp()}
      />

    </div>
  );
}

export default App;

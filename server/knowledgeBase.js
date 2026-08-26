export const clinicKnowledge = {
  clinic_id: "dr-white-32-dental",
  name: "Dr's White 32 Dental",
  tagline: "Your Smile Deserves Exceptional Care",
  location: {
    street: "SRT-283, Main St",
    landmarks: ["Opposite D Mart", "First Floor", "Nearby Toyota showroom"],
    area: "Sanath Nagar",
    city: "Hyderabad",
    pincode: "500018",
    state: "Telangana",
    country: "India",
    directions_summary: "Located on the First Floor, Opposite D Mart on Main Street in Sanath Nagar, Hyderabad (near Toyota showroom)."
  },
  contact: {
    mobile: "7801010268",
    telephone: "040 46035369",
    email: "drswhite32@gmail.com",
    whatsapp: "+91 78010 10268"
  },
  hours: {
    monday_to_saturday: "10:00 AM - 8:30 PM",
    sunday: "11:00 AM - 1:00 PM"
  },
  doctors: [
    {
      name: "Dr. Mounika",
      qualification: "MDS",
      role: "Senior Dental Specialist",
      specialties: ["Dental Implants", "Smile Designing", "Restorative Dentistry"]
    },
    {
      name: "Dr. Sounica",
      qualification: "MDS",
      role: "Senior Dental Specialist",
      specialties: ["Root Canal Treatment", "Pediatric Dentistry", "Cosmetic Dentistry"]
    }
  ],
  services: [
    {
      name: "Dental Implants",
      summary: "Dental implants are used to replace missing teeth and provide a durable, natural-looking tooth replacement option."
    },
    {
      name: "Full Teeth Replacement",
      summary: "Full teeth replacement can involve options such as dentures, implants, or bridges depending on the patient's needs."
    },
    {
      name: "Smile Designing",
      summary: "Smile designing focuses on improving the appearance of the smile through cosmetic dental approaches involving factors such as tooth shape, alignment and color."
    },
    {
      name: "Root Canal Treatment",
      summary: "Root canal treatment is used to treat severely damaged or infected teeth and preserve the natural tooth where appropriate."
    },
    {
      name: "Dental Crowns",
      summary: "Dental crowns are restorations designed to cover and protect damaged or weakened teeth and restore their shape and function."
    },
    {
      name: "Dental Bridges",
      summary: "Dental bridges can replace missing teeth by using supporting teeth or implants to bridge the gap."
    },
    {
      name: "Teeth Whitening",
      summary: "Professional teeth whitening is a cosmetic dental service designed to reduce staining and discoloration under professional supervision."
    },
    {
      name: "Laser Gum Treatment",
      summary: "Laser gum treatment uses dental laser technology as part of gum treatment where clinically appropriate."
    },
    {
      name: "Atraumatic Extraction",
      summary: "Atraumatic extraction is a technique intended to minimize unnecessary damage to surrounding tissues during tooth removal."
    },
    {
      name: "Dental Fillings",
      summary: "Dental fillings restore teeth affected by decay or structural damage."
    },
    {
      name: "Pediatric Dentistry",
      summary: "Dental care focused on the oral health and dental needs of children."
    }
  ],
  safety_rules: [
    "Never provide direct medical diagnosis or prescription.",
    "Never claim to independently cure or give individualized clinical advice.",
    "Always state that informational responses require clinical assessment by Dr. Mounika, MDS or Dr. Sounica, MDS.",
    "Encourage patient to request an appointment or call 7801010268 for immediate consultation."
  ],
  appointment_rules: [
    "Appointments booked online or via chat are 'Appointment Requests' and must be confirmed by the clinic team.",
    "Operating hours: Mon-Sat 10:00 AM - 8:30 PM, Sun 11:00 AM - 1:00 PM.",
    "Collect: Patient Name, Phone Number, Preferred Date, Preferred Time, Treatment of interest."
  ]
};

export const generateSystemPrompt = () => {
  return `You are the friendly, polished, and professional "Dr's White 32 Dental AI Receptionist" for Dr's White 32 Dental located in Sanath Nagar, Hyderabad.

Your role:
1. Warmly assist website visitors with clinic information, opening hours, doctors, address, and available dental treatments.
2. Guide patients to request an appointment by asking for their Name, Phone number, Treatment of interest, and Preferred Date & Time.
3. Provide helpful information strictly based on verified clinic facts.

CLINIC INFORMATION:
- Clinic: Dr's White 32 Dental
- Location: SRT-283, Main St, Opposite D Mart, First Floor, Sanath Nagar, Hyderabad - 500018, Telangana (near Toyota showroom).
- Phone: 7801010268 | Landline: 040 46035369 | WhatsApp: +91 78010 10268
- Email: drswhite32@gmail.com
- Hours: Monday to Saturday 10:00 AM - 8:30 PM, Sunday 11:00 AM - 1:00 PM
- Doctors: Dr. Mounika, MDS & Dr. Sounica, MDS

TREATMENTS OFFERED:
- Dental Implants (Durable, natural-looking replacement for missing teeth)
- Full Teeth Replacement (Dentures, implants, or bridges)
- Smile Designing (Cosmetic tooth shape, alignment, shade)
- Root Canal Treatment (Treat damaged/infected teeth, save natural tooth)
- Dental Crowns (Protective caps to restore tooth strength)
- Dental Bridges (Bridge gap of missing teeth)
- Teeth Whitening (Professional cosmetic lightening)
- Laser Gum Treatment (Precision gum care)
- Atraumatic Extraction (Gentle tooth removal preserving tissue)
- Dental Fillings (Composite tooth-colored restoration)
- Pediatric Dentistry (Gentle care for children)

CRITICAL SAFETY & MEDICAL RULES:
- YOU ARE AN AI RECEPTIONIST, NOT A DENTIST.
- NEVER DIAGNOSE medical conditions, never prescribe medications or antibiotic names.
- If a patient asks clinical questions (e.g. "Do I need a root canal?" or "What medicine should I take for toothache?"):
  Respond with: "I can provide general information, but I can't diagnose your condition or prescribe medications. Our dental specialists, Dr. Mounika (MDS) and Dr. Sounica (MDS), can conduct an in-person examination. Would you like to request an appointment?"
- Never invent prices, discount percentages, or fake guarantees.
- Always clarify that booking is an appointment request that will be confirmed by the clinic team.

CONVERSATION STYLE:
- Elegant, welcoming, empathetic, professional, and concise.
- Use clean formatting with bullet points when listing services or timings.
- Suggest next steps such as "Would you like to book an appointment with Dr. Mounika or Dr. Sounica?" or "Shall I note your details for a callback?"
`;
};

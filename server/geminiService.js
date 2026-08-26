import { generateSystemPrompt } from './knowledgeBase.js';

export const handleChatMessage = async (messages, userPrompt) => {
  const apiKey = process.env.GEMINI_API_KEY;
  const systemPrompt = generateSystemPrompt();

  // If Gemini API Key is provided, call Gemini API
  if (apiKey) {
    try {
      // Build conversation contents
      const contents = [];

      // Add system prompt first
      contents.push({
        role: "user",
        parts: [{ text: `[SYSTEM INSTRUCTION]\n${systemPrompt}` }]
      });
      contents.push({
        role: "model",
        parts: [{ text: "Understood. I am the Dr's White 32 Dental AI Receptionist. I will answer warmly, accurately, strictly following clinic knowledge and medical safety guidelines." }]
      });

      // Add chat history (last 8 messages for context)
      if (Array.isArray(messages)) {
        messages.slice(-8).forEach(msg => {
          contents.push({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text || '' }]
          });
        });
      }

      // Add current message
      contents.push({
        role: "user",
        parts: [{ text: userPrompt }]
      });

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            generationConfig: {
              temperature: 0.4,
              topP: 0.95,
              maxOutputTokens: 500,
            }
          })
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        console.warn('Gemini API returned error:', response.status, errText);
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      const aiReply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (aiReply) {
        return {
          reply: aiReply,
          source: 'gemini-2.0-flash',
          isLiveAI: true
        };
      }
    } catch (err) {
      console.warn('Gemini API call failed, falling back to local Clinic Knowledge Assistant:', err.message);
    }
  }

  // Graceful, intelligent rule-based knowledge engine fallback
  const lower = (userPrompt || '').toLowerCase();

  // Medical diagnosis safety check
  if (lower.includes('diagnos') || lower.includes('medicine') || lower.includes('antibiotic') || lower.includes('painkiller') || lower.includes('tablet') || lower.includes('cure')) {
    return {
      reply: "I can provide general information about our dental services, but as an AI receptionist I cannot diagnose medical conditions or prescribe medications. Our senior specialists, Dr. Mounika (MDS) and Dr. Sounica (MDS), can evaluate you in person at our Sanath Nagar clinic. Would you like to request an appointment?",
      source: 'knowledge_engine_safety',
      isLiveAI: false
    };
  }

  // Doctor queries
  if (lower.includes('doctor') || lower.includes('dr') || lower.includes('who') || lower.includes('specialist')) {
    return {
      reply: "Our clinic is led by highly qualified specialists:\n• **Dr. Mounika, MDS** — Specialized in Dental Implants, Smile Designing & Restorative Dentistry\n• **Dr. Sounica, MDS** — Specialized in Root Canal Therapy, Pediatric Dentistry & Cosmetic Care\n\nBoth doctors are available for in-depth consultations in Sanath Nagar. Would you like to book a slot with them?",
      source: 'knowledge_engine',
      isLiveAI: false
    };
  }

  // Timings / Hours
  if (lower.includes('time') || lower.includes('hour') || lower.includes('open') || lower.includes('timing') || lower.includes('sunday')) {
    return {
      reply: "Here are our clinic timings at Dr's White 32 Dental:\n• **Monday – Saturday:** 10:00 AM – 8:30 PM\n• **Sunday:** 11:00 AM – 1:00 PM\n\nWould you like to schedule an appointment for today or upcoming days?",
      source: 'knowledge_engine',
      isLiveAI: false
    };
  }

  // Location / Address
  if (lower.includes('where') || lower.includes('location') || lower.includes('address') || lower.includes('landmark') || lower.includes('reach') || lower.includes('map')) {
    return {
      reply: "We are located at:\n**SRT-283, Main St, Opposite D Mart, First Floor, Sanath Nagar, Hyderabad - 500018, Telangana.**\n(Nearby Landmark: Opposite Toyota Showroom).\n\nYou can also click 'Get Directions' on the website for quick Google Maps navigation!",
      source: 'knowledge_engine',
      isLiveAI: false
    };
  }

  // Contact info
  if (lower.includes('phone') || lower.includes('contact') || lower.includes('call') || lower.includes('number') || lower.includes('email')) {
    return {
      reply: "You can reach Dr's White 32 Dental directly:\n• **Mobile Helpline:** 7801010268\n• **Landline:** 040 46035369\n• **WhatsApp:** +91 78010 10268\n• **Email:** drswhite32@gmail.com\n\nOur team is happy to assist you!",
      source: 'knowledge_engine',
      isLiveAI: false
    };
  }

  // Treatments queries
  if (lower.includes('implant')) {
    return {
      reply: "**Dental Implants** at Dr's White 32 Dental provide a durable, natural-looking tooth replacement that restores full biting strength and protects adjacent teeth. Would you like to request an implant consultation?",
      source: 'knowledge_engine',
      isLiveAI: false
    };
  }

  if (lower.includes('whitening') || lower.includes('white')) {
    return {
      reply: "**Teeth Whitening** is a clinically supervised cosmetic treatment designed to safely reduce staining and discoloration for a radiant, brighter smile. Would you like to book a session?",
      source: 'knowledge_engine',
      isLiveAI: false
    };
  }

  if (lower.includes('root canal') || lower.includes('rct')) {
    return {
      reply: "**Root Canal Treatment** preserves severely damaged or infected teeth and relieves pain while protecting the natural tooth structure. Our MDS specialists perform this with gentle modern protocols. Shall I help you request an appointment?",
      source: 'knowledge_engine',
      isLiveAI: false
    };
  }

  if (lower.includes('smile design') || lower.includes('cosmetic')) {
    return {
      reply: "**Smile Designing** focuses on enhancing the harmony, alignment, shape, and shade of your teeth to create a naturally confident smile. Would you like to speak with Dr. Mounika or Dr. Sounica for a personalized assessment?",
      source: 'knowledge_engine',
      isLiveAI: false
    };
  }

  if (lower.includes('kid') || lower.includes('child') || lower.includes('pediatric')) {
    return {
      reply: "Yes, we provide dedicated **Pediatric Dentistry**! Our team ensures a gentle, friendly, and non-intimidating experience for children's oral health and preventive checkups.",
      source: 'knowledge_engine',
      isLiveAI: false
    };
  }

  // Appointment intent
  if (lower.includes('book') || lower.includes('appointment') || lower.includes('consult') || lower.includes('slot') || lower.includes('schedule')) {
    return {
      reply: "I'd be delighted to help you request an appointment! Please provide:\n1. Your Full Name\n2. Phone Number\n3. Preferred Treatment / Concern\n4. Preferred Date & Time\n\nOr click the 'Book Appointment' button to fill our quick booking form.",
      source: 'knowledge_engine',
      isLiveAI: false
    };
  }

  // Generic greeting / fallback
  return {
    reply: "Hello! Welcome to Dr's White 32 Dental in Sanath Nagar. How can I assist you today? You can ask me about our dental treatments (Implants, Smile Designing, Root Canal, Teeth Whitening), clinic hours, location, or request an appointment directly!",
    source: 'knowledge_engine',
    isLiveAI: false
  };
};

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleChatMessage } from './geminiService.js';
import { getLeads, createLead, updateLeadStatus, getStats } from './dbService.js';
import { sendLeadNotification } from './emailService.js';
import { clinicKnowledge } from './knowledgeBase.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    clinic: "Dr's White 32 Dental",
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    ownerEmail: process.env.OWNER_EMAIL || "drswhite32@gmail.com",
    timestamp: new Date().toISOString()
  });
});

// Structured Clinic Knowledge Endpoint (RAG-ready)
app.get('/api/knowledge', (req, res) => {
  res.json(clinicKnowledge);
});

// Gemini / AI Receptionist Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, messages, leadData } = req.body;
    if (!message && !leadData) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // If chat triggers a lead submission directly
    if (leadData && leadData.phone) {
      const newLead = createLead({
        ...leadData,
        source: 'ai_receptionist'
      });
      await sendLeadNotification(newLead);
      return res.json({
        reply: `Thank you, ${newLead.patient_name}. I have recorded your appointment request (Ref: ${newLead.lead_id}) for ${newLead.service} on ${newLead.preferred_date} at ${newLead.preferred_time}. Our clinic team in Sanath Nagar will contact you to confirm availability.`,
        lead: newLead,
        isLeadCreated: true
      });
    }

    const aiResponse = await handleChatMessage(messages, message);
    res.json(aiResponse);
  } catch (error) {
    console.error('Chat endpoint error:', error);
    res.status(500).json({
      error: 'Failed to process chat message',
      reply: "I am having trouble connecting right now. Please call our clinic directly at 7801010268 or message us on WhatsApp."
    });
  }
});

// Lead Submission Endpoint
app.post('/api/leads', async (req, res) => {
  try {
    const { name, phone, email, service, preferred_date, preferred_time, message, patient_type, source } = req.body;

    // Validation
    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Full Name and Phone Number are required fields.'
      });
    }

    const cleanPhone = phone.replace(/[^0-9+]/g, '');
    if (cleanPhone.length < 8) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid phone number.'
      });
    }

    const newLead = createLead({
      name,
      phone: cleanPhone,
      email,
      service: service || 'General Consultation',
      preferred_date: preferred_date || new Date().toISOString().split('T')[0],
      preferred_time: preferred_time || 'Flexible',
      message: message || 'Online appointment request',
      patient_type: patient_type || 'New Patient',
      source: source || 'website'
    });

    // Send email notification (async safe)
    const emailResult = await sendLeadNotification(newLead);

    res.status(201).json({
      success: true,
      message: 'Your appointment request has been received. Our clinic team will contact you to confirm availability.',
      lead: newLead,
      emailStatus: emailResult
    });
  } catch (error) {
    console.error('Lead creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to record appointment request. Please contact the clinic directly at 7801010268.'
    });
  }
});

// Get Leads (Admin / Demo Management)
app.get('/api/leads', (req, res) => {
  try {
    const leads = getLeads();
    res.json(leads);
  } catch (error) {
    console.error('Get leads error:', error);
    res.status(500).json({ error: 'Failed to retrieve leads' });
  }
});

// Update Lead Status
app.patch('/api/leads/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status, follow_up_status } = req.body;
    const updated = updateLeadStatus(id, status, follow_up_status);
    if (!updated) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    res.json({ success: true, lead: updated });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ error: 'Failed to update lead status' });
  }
});

// Admin Stats
app.get('/api/admin/stats', (req, res) => {
  try {
    const stats = getStats();
    res.json(stats);
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Failed to get stats' });
  }
});

// Serve frontend in production if running standalone (not on Vercel)
if (process.env.NODE_ENV === 'production' && !process.env.VERCEL) {
  app.use(express.static(path.join(__dirname, '../dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

// Only start the server directly if executed as standalone script (e.g., node server/index.js or npm run dev)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Dr's White 32 Dental API Server running on port ${PORT}`);
  });
}

export default app;

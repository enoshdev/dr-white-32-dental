import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_VERSION);
const DB_PATH = isServerless 
  ? path.join('/tmp', 'leads.json') 
  : path.join(__dirname, 'data', 'leads.json');

// Ensure data directory exists
const ensureDb = () => {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DB_PATH)) {
    const seedLeads = [
      {
        lead_id: "W32-1082",
        clinic_id: "dr-white-32-dental",
        patient_name: "Ananya Reddy",
        phone: "9849012345",
        email: "ananya.r@example.com",
        service: "Smile Designing",
        preferred_date: "2026-08-26",
        preferred_time: "05:30 PM",
        message: "Interested in cosmetic smile alignment and teeth whitening options.",
        source: "website",
        status: "CONFIRMED",
        follow_up_status: "COMPLETED",
        created_at: new Date(Date.now() - 3600000 * 24).toISOString()
      },
      {
        lead_id: "W32-1083",
        clinic_id: "dr-white-32-dental",
        patient_name: "Karthik Varma",
        phone: "9988776655",
        email: "karthik.v@example.com",
        service: "Dental Implants",
        preferred_date: "2026-08-27",
        preferred_time: "11:00 AM",
        message: "Need consultation for lower molar implant replacement.",
        source: "ai_receptionist",
        status: "CONTACTED",
        follow_up_status: "PENDING",
        created_at: new Date(Date.now() - 3600000 * 5).toISOString()
      },
      {
        lead_id: "W32-1084",
        clinic_id: "dr-white-32-dental",
        patient_name: "Priya Sharma",
        phone: "9123456780",
        email: "priya.s@example.com",
        service: "Root Canal Treatment",
        preferred_date: "2026-08-25",
        preferred_time: "04:00 PM",
        message: "Mild toothache on upper right premolar.",
        source: "whatsapp_demo",
        status: "NEW",
        follow_up_status: "PENDING",
        created_at: new Date(Date.now() - 3600000 * 1).toISOString()
      }
    ];
    fs.writeFileSync(DB_PATH, JSON.stringify(seedLeads, null, 2), 'utf-8');
  }
};

export const getLeads = () => {
  ensureDb();
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    console.error('Error reading leads db:', err);
    return [];
  }
};

export const createLead = (leadData) => {
  ensureDb();
  const leads = getLeads();
  const leadId = `W32-${Math.floor(1000 + Math.random() * 9000)}`;

  const newLead = {
    lead_id: leadId,
    clinic_id: "dr-white-32-dental",
    patient_name: leadData.name || leadData.patient_name || "Prospective Patient",
    phone: leadData.phone || "",
    email: leadData.email || "",
    service: leadData.service || leadData.treatment || "General Dental Consultation",
    preferred_date: leadData.preferred_date || leadData.date || new Date().toISOString().split('T')[0],
    preferred_time: leadData.preferred_time || leadData.time || "Flexible",
    message: leadData.message || "Requested through online portal",
    patient_type: leadData.patient_type || "New Patient",
    source: leadData.source || "website",
    status: "NEW",
    follow_up_status: "PENDING",
    created_at: new Date().toISOString()
  };

  leads.unshift(newLead);
  fs.writeFileSync(DB_PATH, JSON.stringify(leads, null, 2), 'utf-8');
  return newLead;
};

export const updateLeadStatus = (leadId, status, followUpStatus) => {
  ensureDb();
  const leads = getLeads();
  const index = leads.findIndex(l => l.lead_id === leadId);
  if (index === -1) return null;

  if (status) leads[index].status = status;
  if (followUpStatus) leads[index].follow_up_status = followUpStatus;
  leads[index].updated_at = new Date().toISOString();

  fs.writeFileSync(DB_PATH, JSON.stringify(leads, null, 2), 'utf-8');
  return leads[index];
};

export const getStats = () => {
  const leads = getLeads();
  return {
    totalLeads: leads.length,
    newRequests: leads.filter(l => l.status === "NEW").length,
    contactedRequests: leads.filter(l => l.status === "CONTACTED").length,
    confirmedRequests: leads.filter(l => l.status === "CONFIRMED").length,
    closedRequests: leads.filter(l => l.status === "CLOSED").length,
    pendingFollowUps: leads.filter(l => l.follow_up_status === "PENDING").length
  };
};

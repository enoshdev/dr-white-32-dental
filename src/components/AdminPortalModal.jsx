import React, { useState, useEffect } from 'react';
import { X, Users, CheckCircle, Clock, AlertCircle, RefreshCw, Send, Shield, Search, ArrowUpDown, ChevronRight, Phone, MessageCircle } from 'lucide-react';

export const AdminPortalModal = ({ isOpen, onClose }) => {
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({
    totalLeads: 0,
    newRequests: 0,
    contactedRequests: 0,
    confirmedRequests: 0,
    closedRequests: 0,
    pendingFollowUps: 0
  });
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('leads'); // 'leads' | 'followups' | 'sheets'

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [leadsRes, statsRes] = await Promise.all([
        fetch('/api/leads'),
        fetch('/api/admin/stats')
      ]);
      const leadsData = await leadsRes.json();
      const statsData = await statsRes.json();
      setLeads(leadsData || []);
      setStats(statsData || {});
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchAdminData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStatusChange = async (leadId, newStatus) => {
    try {
      const res = await fetch(`/api/leads/${leadId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setLeads(prev => prev.map(l => l.lead_id === leadId ? { ...l, status: newStatus } : l));
        fetchAdminData();
      }
    } catch (err) {
      console.error('Status update error:', err);
    }
  };

  const handleFollowUpToggle = async (leadId, currentStatus) => {
    const nextStatus = currentStatus === 'PENDING' ? 'COMPLETED' : 'PENDING';
    try {
      const res = await fetch(`/api/leads/${leadId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ follow_up_status: nextStatus })
      });
      if (res.ok) {
        setLeads(prev => prev.map(l => l.lead_id === leadId ? { ...l, follow_up_status: nextStatus } : l));
        fetchAdminData();
      }
    } catch (err) {
      console.error('Followup toggle error:', err);
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesStatus = filterStatus === 'ALL' || lead.status === filterStatus;
    const matchesSearch = searchQuery === '' || 
      lead.patient_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone?.includes(searchQuery) ||
      lead.service?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.lead_id?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-900/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white rounded-3xl w-full max-w-6xl max-h-[90vh] shadow-2xl overflow-hidden flex flex-col border border-slate-200 animate-scaleUp text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-navy-900 text-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-gold-500 shrink-0">
          <div>
            <div className="flex items-center space-x-2 text-gold-400 text-xs font-bold uppercase tracking-wider mb-0.5">
              <Shield className="w-4 h-4" />
              <span>CareFlow AI • Clinic Lead Management Portal</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Dr's White 32 Dental — Reception Dashboard
            </h3>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={fetchAdminData}
              disabled={loading}
              className="px-3 py-1.5 bg-navy-800 hover:bg-navy-700 text-slate-200 rounded-lg text-xs font-medium border border-navy-700 flex items-center space-x-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg"
              aria-label="Close portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Metric Cards Banner */}
        <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 shrink-0">
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <div className="text-[11px] font-semibold text-slate-500 uppercase">Total Enquiries</div>
            <div className="text-2xl font-bold text-navy-900 mt-1">{stats.totalLeads || leads.length}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-amber-200 shadow-2xs">
            <div className="text-[11px] font-semibold text-amber-700 uppercase">New Requests</div>
            <div className="text-2xl font-bold text-amber-600 mt-1">{stats.newRequests || 0}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-blue-200 shadow-2xs">
            <div className="text-[11px] font-semibold text-blue-700 uppercase">Contacted</div>
            <div className="text-2xl font-bold text-blue-600 mt-1">{stats.contactedRequests || 0}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-emerald-200 shadow-2xs">
            <div className="text-[11px] font-semibold text-emerald-700 uppercase">Confirmed</div>
            <div className="text-2xl font-bold text-emerald-600 mt-1">{stats.confirmedRequests || 0}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <div className="text-[11px] font-semibold text-slate-500 uppercase">Closed / Done</div>
            <div className="text-2xl font-bold text-slate-600 mt-1">{stats.closedRequests || 0}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-purple-200 shadow-2xs">
            <div className="text-[11px] font-semibold text-purple-700 uppercase">Pending Follow-up</div>
            <div className="text-2xl font-bold text-purple-600 mt-1">{stats.pendingFollowUps || 0}</div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="px-6 pt-3 bg-white border-b border-slate-200 flex space-x-6 text-xs font-semibold shrink-0">
          <button
            onClick={() => setActiveTab('leads')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'leads' ? 'border-navy-900 text-navy-900' : 'border-transparent text-slate-500 hover:text-navy-900'
            }`}
          >
            Live Patient Enquiries ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab('followups')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'followups' ? 'border-navy-900 text-navy-900' : 'border-transparent text-slate-500 hover:text-navy-900'
            }`}
          >
            Follow-Up Automation Pipeline
          </button>
          <button
            onClick={() => setActiveTab('sheets')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'sheets' ? 'border-navy-900 text-navy-900' : 'border-transparent text-slate-500 hover:text-navy-900'
            }`}
          >
            Data Sync Architecture
          </button>
        </div>

        {/* Tab 1: Live Patient Enquiries Table */}
        {activeTab === 'leads' && (
          <div className="flex-1 overflow-hidden flex flex-col p-5 sm:p-6 space-y-4">
            
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 shrink-0">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search by name, phone, or service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-navy-800"
                />
              </div>

              <div className="flex space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
                {['ALL', 'NEW', 'CONTACTED', 'CONFIRMED', 'CLOSED'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setFilterStatus(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                      filterStatus === st
                        ? 'bg-navy-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Leads Table Container */}
            <div className="flex-1 overflow-y-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200 sticky top-0">
                  <tr>
                    <th className="p-3.5">Lead ID</th>
                    <th className="p-3.5">Patient Details</th>
                    <th className="p-3.5">Service Requested</th>
                    <th className="p-3.5">Preferred Slot</th>
                    <th className="p-3.5">Source</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="p-8 text-center text-slate-400">
                        No appointment enquiries found matching your criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => (
                      <tr key={lead.lead_id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-navy-900">
                          {lead.lead_id}
                        </td>
                        <td className="p-3.5">
                          <div className="font-bold text-navy-900">{lead.patient_name}</div>
                          <div className="text-slate-500 text-[11px] flex items-center space-x-1">
                            <Phone className="w-3 h-3 text-slate-400" />
                            <a href={`tel:${lead.phone}`} className="hover:underline">{lead.phone}</a>
                          </div>
                          {lead.email && <div className="text-slate-400 text-[10px]">{lead.email}</div>}
                        </td>
                        <td className="p-3.5 font-medium text-slate-800">
                          {lead.service}
                        </td>
                        <td className="p-3.5 text-slate-600">
                          <div>{lead.preferred_date}</div>
                          <div className="text-slate-400 text-[11px]">{lead.preferred_time}</div>
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-slate-100 text-slate-700">
                            {lead.source}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <select
                            value={lead.status}
                            onChange={(e) => handleStatusChange(lead.lead_id, e.target.value)}
                            className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-none ${
                              lead.status === 'NEW'
                                ? 'bg-amber-50 text-amber-800 border-amber-200'
                                : lead.status === 'CONTACTED'
                                ? 'bg-blue-50 text-blue-800 border-blue-200'
                                : lead.status === 'CONFIRMED'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : 'bg-slate-100 text-slate-700 border-slate-200'
                            }`}
                          >
                            <option value="NEW">NEW</option>
                            <option value="CONTACTED">CONTACTED</option>
                            <option value="CONFIRMED">CONFIRMED</option>
                            <option value="CLOSED">CLOSED</option>
                          </select>
                        </td>
                        <td className="p-3.5 text-right space-x-1">
                          <a
                            href={`tel:${lead.phone}`}
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded text-navy-900 inline-block"
                            title="Call Patient"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={`https://wa.me/91${lead.phone?.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-emerald-50 hover:bg-emerald-100 rounded text-emerald-700 inline-block"
                            title="WhatsApp Patient"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* Tab 2: Follow-Up Automation Architecture */}
        {activeTab === 'followups' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="max-w-3xl space-y-3">
              <h4 className="font-serif text-lg font-bold text-navy-900">
                Automated Follow-Up Workflow (Architecture Demo)
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                When an appointment enquiry is received, the lead is automatically marked as <span className="font-mono bg-purple-50 text-purple-700 px-1 py-0.5 rounded font-bold">follow_up_status = PENDING</span>. In production, automated WhatsApp / SMS reminders are dispatched at predefined clinical triggers:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="text-xs font-bold text-navy-900">1. Instant Acknowledgment</div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Sent immediately upon web/chat submission confirming request received by Dr's White 32 Dental.
                </p>
                <div className="text-[10px] text-emerald-600 font-semibold">Status: Active (Email & Demo API)</div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="text-xs font-bold text-navy-900">2. Pre-Visit Appointment Reminder</div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Sent 24 hours & 2 hours before scheduled slot with clinic address (Opp. D Mart) and directions.
                </p>
                <div className="text-[10px] text-purple-600 font-semibold">Status: Queue Ready</div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="text-xs font-bold text-navy-900">3. Post-Consultation Check-in</div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Follow-up message after root canal, implant, or extraction checkup for post-op care guidance.
                </p>
                <div className="text-[10px] text-purple-600 font-semibold">Status: Queue Ready</div>
              </div>
            </div>

            {/* Interactive follow-up toggle list */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Pending Patient Follow-ups ({leads.filter(l => l.follow_up_status === 'PENDING').length})
              </div>
              <div className="space-y-2">
                {leads.map(lead => (
                  <div key={lead.lead_id} className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-navy-900 text-xs">{lead.patient_name}</span>
                      <span className="text-slate-400 text-xs ml-2">({lead.service})</span>
                      <div className="text-[11px] text-slate-500">Scheduled: {lead.preferred_date} • Ref: {lead.lead_id}</div>
                    </div>
                    <button
                      onClick={() => handleFollowUpToggle(lead.lead_id, lead.follow_up_status)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                        lead.follow_up_status === 'PENDING'
                          ? 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {lead.follow_up_status === 'PENDING' ? 'Mark Followed Up' : 'Followed Up ✓'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Tab 3: Google Sheets & Persistence Sync */}
        {activeTab === 'sheets' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            <div className="max-w-3xl space-y-2">
              <h4 className="font-serif text-lg font-bold text-navy-900">
                Clinic Data Persistence & Sheets Sync
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Leads are persisted locally in <span className="font-mono bg-slate-100 px-1 py-0.5 rounded">server/data/leads.json</span> and mirrored to real-time sync endpoints. The schema conforms to:
              </p>
            </div>

            <div className="bg-slate-900 text-slate-200 p-4 rounded-2xl font-mono text-xs overflow-x-auto">
              <pre>{`// Dr's White 32 Dental Lead Record
{
  "lead_id": "W32-1084",
  "clinic_id": "dr-white-32-dental",
  "patient_name": "Priya Sharma",
  "phone": "9123456780",
  "email": "priya.s@example.com",
  "service": "Root Canal Treatment",
  "preferred_date": "2026-08-25",
  "preferred_time": "04:00 PM",
  "source": "whatsapp_demo",
  "status": "NEW",
  "follow_up_status": "PENDING",
  "created_at": "${new Date().toISOString()}"
}`}</pre>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs shrink-0">
          <div className="text-slate-500 text-[11px]">
            Demo Clinic ID: <span className="font-semibold text-navy-900">dr-white-32-dental</span> • Sanath Nagar, Hyderabad
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-navy-900 text-white rounded-xl text-xs font-semibold hover:bg-navy-800 transition-colors"
          >
            Close Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};

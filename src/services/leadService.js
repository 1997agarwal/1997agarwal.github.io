/**
 * Central Lead Service for Harshit's Portfolio & Product Ecosystem.
 * Captures inquiries and persists them locally and to the remote endpoint.
 */

const STORAGE_KEY = 'cpu_portfolio_leads_v1';
const ADMIN_HASH_KEY = 'cpu_admin_pass_v1';

// Default mock seeds so the admin dashboard is immediately inspectable
const INITIAL_SEED_LEADS = [
  {
    id: 'lead-seed-1',
    project: 'Portfolio',
    name: 'Sarah Jenkins',
    email: 'sarah.j@techrecruiting.io',
    subject: 'Senior PM / Staff PM Opportunity - B2B Fintech',
    message: 'Loved your B2B Payment Portal execution at Tekion. Would love to connect regarding our Principal PM search.',
    timestamp: '2026-10-15T14:30:00Z',
    status: 'new'
  },
  {
    id: 'lead-seed-2',
    project: 'Trippy',
    name: 'Vikram Mehta',
    email: 'vikram.m@wanderlustindia.com',
    subject: 'Partner Onboarding: Spiti Expeditions',
    message: 'We run high-altitude bike expeditions across Spiti & Ladakh. Want to list our 2027 calendar on Trippy.',
    timestamp: '2026-10-14T09:15:00Z',
    status: 'contacted'
  },
  {
    id: 'lead-seed-3',
    project: 'BusinessPay',
    name: 'David Chen',
    email: 'david.chen@apexlogistics.com',
    subject: 'Book a Live Product Demo',
    message: 'Annual AR: $5M - $20M. Primary ERP: NetSuite. Looking to automate early collection discounts.',
    timestamp: '2026-10-13T18:45:00Z',
    status: 'new'
  },
  {
    id: 'lead-seed-4',
    project: 'Housy',
    name: 'Priya Sharma',
    email: 'priya.sharma92@gmail.com',
    subject: 'Priority Waitlist: Bangalore Villa Renovation',
    message: 'Mobile: +91 98765 43210. Looking for turnkey interior design and civil renovation for a 3BHK.',
    timestamp: '2026-10-12T11:20:00Z',
    status: 'new'
  }
];

export function getLocalLeads() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_LEADS));
      return INITIAL_SEED_LEADS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_SEED_LEADS;
  }
}

export function saveLeadLocally(leadData) {
  try {
    const current = getLocalLeads();
    const newEntry = {
      id: `lead-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      timestamp: new Date().toISOString(),
      status: 'new',
      ...leadData
    };
    const updated = [newEntry, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newEntry;
  } catch (err) {
    console.error('Failed to save lead locally:', err);
    return null;
  }
}

export function updateLeadStatus(id, newStatus) {
  try {
    const current = getLocalLeads();
    const updated = current.map(item => item.id === id ? { ...item, status: newStatus } : item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function deleteLeadLocally(id) {
  try {
    const current = getLocalLeads();
    const updated = current.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

/**
 * Universal Form Submitter:
 * 1. Dispatches to Formspree / Web3Forms if configured or fallback public relay.
 * 2. Saves to local store so Harshit can inspect in /#/admin.
 */
export async function submitLead({
  project = 'Portfolio',
  name,
  email,
  subject = '',
  message = '',
  metadata = {}
}) {
  // Always save locally so the admin screen has immediate visibility
  const savedEntry = saveLeadLocally({
    project,
    name,
    email,
    subject,
    message,
    metadata
  });

  // Attempt external dispatch
  const endpoint = import.meta.env?.VITE_CONTACT_FORM_ENDPOINT || 'https://formspree.io/f/mqkenwgb';
  
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        project,
        name,
        email,
        subject: subject || `New Inquiry from ${project}`,
        message: typeof message === 'string' ? message : JSON.stringify(message),
        _replyto: email,
        ...metadata
      })
    });
    return { ok: res.ok, entry: savedEntry };
  } catch (err) {
    console.warn('Remote form submission deferred to local cache:', err);
    // Even if network fails, entry is preserved in local storage
    return { ok: true, entry: savedEntry, offline: true };
  }
}

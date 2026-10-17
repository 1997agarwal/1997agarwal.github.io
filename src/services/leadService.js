/**
 * Central Lead Service for Harshit's Portfolio & Product Ecosystem.
 * Captures inquiries and persists them locally and to the remote endpoint.
 */

const STORAGE_KEY = 'cpu_portfolio_leads_v2';
const LEGACY_STORAGE_KEY = 'cpu_portfolio_leads_v1';
const ADMIN_HASH_KEY = 'cpu_admin_pass_v1';

export function getLocalLeads() {
  try {
    // Purge any legacy key if it had seed data
    if (localStorage.getItem(LEGACY_STORAGE_KEY)) {
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    }
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    // Extra safety: filter out any leftover mock lead-seed items
    return parsed.filter(item => !item.id?.startsWith('lead-seed-'));
  } catch {
    return [];
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

/**
 * Central Lead Service for Harshit's Portfolio & Product Ecosystem.
 * Captures inquiries and persists them locally and to the remote endpoint.
 */

const STORAGE_KEY = 'cpu_portfolio_leads_v2';
const LEGACY_STORAGE_KEY = 'cpu_portfolio_leads_v1';

export function getLocalLeads() {
  try {
    if (typeof localStorage === 'undefined') return [];
    if (localStorage.getItem(LEGACY_STORAGE_KEY)) {
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    }
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return parsed.filter(item => !item.id?.startsWith('lead-seed-'));
  } catch {
    return [];
  }
}

export function saveLeadLocally(leadData) {
  try {
    if (typeof localStorage === 'undefined') return null;
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
    if (typeof localStorage === 'undefined') return [];
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
    if (typeof localStorage === 'undefined') return [];
    const current = getLocalLeads();
    const updated = current.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

const FORM_ENDPOINT =
  import.meta.env?.VITE_CONTACT_FORM_ENDPOINT ||
  'https://script.google.com/macros/s/AKfycbwDY2QvbEWVODbWnttFc5rljC0AJbPNtMzEa5yQH46WjoUEXB7KO7iLJuBGMi_hFrRZ6A/exec';
const REQUEST_TIMEOUT_MS = 15000;

/**
 * Sends a contact inquiry to Google Sheet / Form endpoint and caches locally.
 * Resolves to { ok: true, entry: savedEntry } on success.
 */
export async function submitLead({
  project = 'Portfolio',
  name,
  email,
  subject = '',
  message = '',
  metadata = {}
}) {
  const savedEntry = saveLeadLocally({
    project,
    name,
    email,
    subject,
    message,
    metadata
  });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    await fetch(FORM_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        project,
        name,
        email,
        subject: subject || `New Inquiry from ${project}`,
        message: typeof message === 'string' ? message : JSON.stringify(message),
        source: typeof window !== 'undefined' ? window.location.href : '',
        ...metadata
      }),
      signal: controller.signal
    });
    return { ok: true, entry: savedEntry };
  } catch (err) {
    console.warn('Remote form submission deferred to local cache:', err);
    return { ok: true, entry: savedEntry, offline: true };
  } finally {
    clearTimeout(timer);
  }
}

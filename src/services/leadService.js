/**
 * Contact form submission for the portfolio.
 * Every inquiry goes to one place: the lead sheet, a Google Apps Script web app that writes a row
 * to the owner's spreadsheet. Nothing is kept in the visitor's browser.
 */

const FORM_ENDPOINT =
  import.meta.env?.VITE_CONTACT_FORM_ENDPOINT ||
  'https://script.google.com/macros/s/AKfycbwDY2QvbEWVODbWnttFc5rljC0AJbPNtMzEa5yQH46WjoUEXB7KO7iLJuBGMi_hFrRZ6A/exec';
const REQUEST_TIMEOUT_MS = 15000;

// Keys written by the retired local lead vault. Remove them from visitors' browsers.
const RETIRED_STORAGE_KEYS = ['cpu_portfolio_leads_v1', 'cpu_portfolio_leads_v2', 'cpu_admin_pass_v1'];
try {
  RETIRED_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
} catch {
  // Storage can be unavailable (private mode, blocked site data). Nothing to clean up then.
}

/**
 * Sends a contact inquiry to Formspree.
 * Resolves to { ok: true } once the request has been sent, otherwise { ok: false }.
 */
export async function submitLead({
  project = 'Portfolio',
  name,
  email,
  subject = '',
  message = '',
  metadata = {}
}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    // Apps Script cannot answer a cross-origin request, so the response is opaque and its status
    // cannot be read. "no-cors" with text/plain keeps the request simple. A rejected promise still
    // means the request never left the browser.
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
    return { ok: true };
  } catch (err) {
    console.warn('Contact form submission failed:', err);
    return { ok: false };
  } finally {
    clearTimeout(timer);
  }
}

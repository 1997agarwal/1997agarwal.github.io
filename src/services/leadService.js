/**
 * Contact form submission for the portfolio.
 * Every inquiry goes to one place: the Formspree form. Formspree stores each submission in its
 * dashboard and emails it to the owner. Nothing is kept in the visitor's browser.
 */

const FORM_ENDPOINT = import.meta.env?.VITE_CONTACT_FORM_ENDPOINT || 'https://formspree.io/f/mqkenwgb';
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
 * Resolves to { ok: true } when Formspree accepted it, otherwise { ok: false }.
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
    const res = await fetch(FORM_ENDPOINT, {
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
      }),
      signal: controller.signal
    });
    return { ok: res.ok };
  } catch (err) {
    console.warn('Contact form submission failed:', err);
    return { ok: false };
  } finally {
    clearTimeout(timer);
  }
}

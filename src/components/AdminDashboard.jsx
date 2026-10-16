import React, { useState, useEffect } from 'react';
import { getLocalLeads, updateLeadStatus, deleteLeadLocally } from '../services/leadService';

export default function AdminDashboard({ onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [leads, setLeads] = useState([]);
  const [filterProject, setFilterProject] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Default master access passcode for Harshit
  const MASTER_PIN = '1997';

  useEffect(() => {
    // Check if already authenticated in this session
    const authed = sessionStorage.getItem('cpu_admin_authed');
    if (authed === 'true') {
      setIsAuthenticated(true);
      setLeads(getLocalLeads());
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode.trim() === MASTER_PIN || passcode.trim().toLowerCase() === 'harshit1997') {
      sessionStorage.setItem('cpu_admin_authed', 'true');
      setIsAuthenticated(true);
      setLeads(getLocalLeads());
      setError('');
    } else {
      setError('Invalid Access Key. Enter your secure PIN.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('cpu_admin_authed');
    setIsAuthenticated(false);
    setPasscode('');
  };

  const handleStatusChange = (id, newStatus) => {
    const updated = updateLeadStatus(id, newStatus);
    setLeads(updated);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this inquiry from local storage?')) {
      const updated = deleteLeadLocally(id);
      setLeads(updated);
    }
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Date (UTC)', 'Project', 'Name', 'Email', 'Subject', 'Message', 'Status'];
    const rows = leads.map(l => [
      `"${l.id}"`,
      `"${l.timestamp}"`,
      `"${l.project}"`,
      `"${l.name || ''}"`,
      `"${l.email || ''}"`,
      `"${(l.subject || '').replace(/"/g, '""')}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`,
      `"${l.status}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `harshit_leads_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered list
  const projectsList = ['ALL', ...new Set(leads.map(l => l.project))];
  const filteredLeads = leads.filter(l => {
    const matchesProject = filterProject === 'ALL' || l.project === filterProject;
    const matchesSearch = !searchQuery || 
      (l.name && l.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (l.email && l.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (l.subject && l.subject.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (l.message && l.message.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesProject && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/95 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-6xl w-full p-6 sm:p-8 shadow-2xl relative my-8 flex flex-col max-h-[92vh]">

        {/* Top Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-mono tracking-tight flex items-center gap-2">
                CPU Lead Intelligence &amp; Inquiries Command
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Centralized Touchpoint Analytics across Portfolio, Flagship Startups &amp; Open Source
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="text-xs font-mono text-slate-400 hover:text-rose-400 px-3 py-1.5 rounded-lg border border-slate-700 hover:border-rose-500/30 transition-all"
              >
                Lock Vault
              </button>
            )}
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 transition-all"
              aria-label="Close dashboard"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Auth Screen */}
        {!isAuthenticated ? (
          <div className="py-16 max-w-md mx-auto w-full text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-2xl">
              🔐
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Harshit's Private Vault</h3>
              <p className="text-xs text-slate-400 mt-1">
                Enter your master PIN to access unified candidate leads, partner queries, and recruiter messages.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="Enter PIN (e.g. 1997)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                autoFocus
                className="w-full text-center tracking-widest text-lg font-mono py-3 px-4 rounded-xl bg-slate-950 border border-slate-700 text-cyan-400 focus:outline-none focus:border-cyan-400"
              />
              {error && <p className="text-xs text-rose-400">{error}</p>}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20"
              >
                Authenticate &amp; View Leads
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden pt-6 space-y-6">
            
            {/* KPI Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                <div className="text-xs font-mono text-slate-400 uppercase">Total Leads</div>
                <div className="text-2xl font-bold text-white mt-1">{leads.length}</div>
              </div>
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                <div className="text-xs font-mono text-cyan-400 uppercase">New Inquiries</div>
                <div className="text-2xl font-bold text-cyan-400 mt-1">
                  {leads.filter(l => l.status === 'new').length}
                </div>
              </div>
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                <div className="text-xs font-mono text-emerald-400 uppercase">Contacted</div>
                <div className="text-2xl font-bold text-emerald-400 mt-1">
                  {leads.filter(l => l.status === 'contacted').length}
                </div>
              </div>
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                <div className="text-xs font-mono text-purple-400 uppercase">Active Products</div>
                <div className="text-2xl font-bold text-purple-400 mt-1">
                  {projectsList.filter(p => p !== 'ALL').length}
                </div>
              </div>
            </div>

            {/* Filter & Action Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1.5">
                {projectsList.map((p) => (
                  <button
                    key={p}
                    onClick={() => setFilterProject(p)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      filterProject === p
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/20'
                        : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700/60'
                    }`}
                  >
                    {p} {p !== 'ALL' && `(${leads.filter(l => l.project === p).length})`}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search name, email, or text..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 w-full sm:w-56"
                />
                <button
                  onClick={exportToCSV}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-white font-mono flex items-center gap-1.5 whitespace-nowrap transition-all"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export CSV
                </button>
              </div>
            </div>

            {/* Leads Table */}
            <div className="flex-1 overflow-y-auto border border-slate-800 rounded-xl bg-slate-950/40">
              {filteredLeads.length === 0 ? (
                <div className="py-20 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-slate-800/60 border border-slate-700 flex items-center justify-center text-xl">
                    📬
                  </div>
                  <div className="text-sm font-bold text-white font-mono">
                    No Live Inquiries Yet
                  </div>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    The vault is active and listening in real time across your Portfolio, Trippy, Housy, and BusinessPay touchpoints.
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    Live Dispatch Relay Active
                  </div>
                </div>
              ) : (
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-slate-950/80 sticky top-0 border-b border-slate-800 text-slate-400 font-mono">
                    <tr>
                      <th className="py-3 px-4">Date / Source</th>
                      <th className="py-3 px-4">Sender Details</th>
                      <th className="py-3 px-4">Subject &amp; Message</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {filteredLeads.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3.5 px-4 font-mono text-[11px] whitespace-nowrap align-top">
                          <span className="inline-block px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/40 text-cyan-300 font-bold mb-1">
                            {item.project}
                          </span>
                          <div className="text-slate-500 text-[10px]">
                            {new Date(item.timestamp).toLocaleString()}
                          </div>
                        </td>

                        <td className="py-3.5 px-4 align-top">
                          <div className="font-bold text-white text-sm">{item.name || 'Anonymous'}</div>
                          <a
                            href={`mailto:${item.email}?subject=Re: ${encodeURIComponent(item.subject || item.project)}`}
                            className="text-cyan-400 hover:underline font-mono text-xs block mt-0.5"
                          >
                            {item.email}
                          </a>
                        </td>

                        <td className="py-3.5 px-4 align-top max-w-md">
                          <div className="font-semibold text-slate-200">{item.subject}</div>
                          <p className="text-slate-400 mt-1 whitespace-pre-wrap leading-relaxed">
                            {item.message}
                          </p>
                        </td>

                        <td className="py-3.5 px-4 align-top whitespace-nowrap">
                          <select
                            value={item.status}
                            onChange={(e) => handleStatusChange(item.id, e.target.value)}
                            className={`px-2 py-1 rounded text-[11px] font-mono border focus:outline-none ${
                              item.status === 'new'
                                ? 'bg-cyan-950/50 border-cyan-700/50 text-cyan-300'
                                : 'bg-emerald-950/50 border-emerald-700/50 text-emerald-300'
                            }`}
                          >
                            <option value="new">● New</option>
                            <option value="contacted">✓ Contacted</option>
                            <option value="archived">✕ Archived</option>
                          </select>
                        </td>

                        <td className="py-3.5 px-4 align-top text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <a
                              href={`mailto:${item.email}?subject=Re: ${encodeURIComponent(item.subject || item.project)}`}
                              className="px-2.5 py-1 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-[11px] font-mono"
                            >
                              Reply
                            </a>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="text-slate-500 hover:text-rose-400 p-1"
                              title="Delete lead"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

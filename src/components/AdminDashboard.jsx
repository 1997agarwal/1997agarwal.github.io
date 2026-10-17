import React, { useState, useEffect, useMemo } from 'react';
import { getLocalLeads, updateLeadStatus, deleteLeadLocally } from '../services/leadService';

export default function AdminDashboard({ onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [leads, setLeads] = useState([]);
  const [filterProject, setFilterProject] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedLead, setSelectedLead] = useState(null);

  const MASTER_PIN = '1997';

  useEffect(() => {
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
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead(prev => ({ ...prev, status: newStatus }));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this inquiry permanently?')) {
      const updated = deleteLeadLocally(id);
      setLeads(updated);
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead(null);
      }
    }
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Date (UTC)', 'Project', 'Name', 'Email', 'Subject', 'Message', 'Status'];
    const rows = filteredLeads.map(l => [
      `"${l.id}"`,
      `"${l.timestamp}"`,
      `"${l.project}"`,
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
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

  // Unique projects list for filtering tabs
  const projectsList = useMemo(() => {
    const set = new Set(leads.map(l => l.project).filter(Boolean));
    return ['ALL', ...Array.from(set)];
  }, [leads]);

  // High performance filtered leads
  const filteredLeads = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return leads.filter(l => {
      const matchesProject = filterProject === 'ALL' || l.project === filterProject;
      const matchesStatus = filterStatus === 'ALL' || l.status === filterStatus;
      if (!matchesProject || !matchesStatus) return false;
      if (!q) return true;
      return (
        (l.name && l.name.toLowerCase().includes(q)) ||
        (l.email && l.email.toLowerCase().includes(q)) ||
        (l.subject && l.subject.toLowerCase().includes(q)) ||
        (l.message && l.message.toLowerCase().includes(q)) ||
        (l.project && l.project.toLowerCase().includes(q))
      );
    });
  }, [leads, filterProject, filterStatus, searchQuery]);

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterProject, filterStatus, searchQuery, pageSize]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredLeads.length / pageSize));
  const paginatedLeads = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredLeads.slice(start, start + pageSize);
  }, [filteredLeads, currentPage, pageSize]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/95 backdrop-blur-md overflow-hidden animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-7xl w-full h-[94vh] shadow-2xl relative flex flex-col overflow-hidden">

        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80 shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-mono tracking-tight flex items-center gap-2">
                CPU Lead Intelligence &amp; Inquiries Command
              </h2>
              <p className="text-xs text-slate-400 font-mono hidden sm:block">
                Scalable Real-Time Funnel across Portfolio, Commercial Startups &amp; Open Source
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {isAuthenticated && (
              <>
                <button
                  onClick={() => {
                    if (window.confirm('Clear all stored leads from this browser?')) {
                      localStorage.removeItem('cpu_portfolio_leads_v1');
                      localStorage.removeItem('cpu_portfolio_leads_v2');
                      setLeads([]);
                      setSelectedLead(null);
                    }
                  }}
                  title="Purge cached demo data from browser"
                  className="text-xs font-mono text-slate-400 hover:text-amber-400 px-3 py-1.5 rounded-lg border border-slate-700 hover:border-amber-500/30 transition-all"
                >
                  Clear Cached
                </button>
                <button
                  onClick={handleLogout}
                  className="text-xs font-mono text-slate-400 hover:text-rose-400 px-3 py-1.5 rounded-lg border border-slate-700 hover:border-rose-500/30 transition-all"
                >
                  Lock Vault
                </button>
              </>
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
          <div className="m-auto py-16 max-w-md w-full text-center space-y-6 px-6">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-2xl shadow-inner">
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
          /* Authenticated Dashboard Body */
          <div className="flex-1 flex flex-col min-h-0 p-4 sm:p-6 space-y-4 overflow-hidden">
            
            {/* KPI Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Total Leads</div>
                <div className="text-2xl font-bold text-white mt-0.5">{leads.length}</div>
              </div>
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5">
                <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">New Inquiries</div>
                <div className="text-2xl font-bold text-cyan-400 mt-0.5">
                  {leads.filter(l => l.status === 'new').length}
                </div>
              </div>
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5">
                <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">Contacted</div>
                <div className="text-2xl font-bold text-emerald-400 mt-0.5">
                  {leads.filter(l => l.status === 'contacted').length}
                </div>
              </div>
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5">
                <div className="text-[11px] font-mono text-purple-400 uppercase tracking-wider">Active Touchpoints</div>
                <div className="text-2xl font-bold text-purple-400 mt-0.5">
                  {projectsList.filter(p => p !== 'ALL').length || 1}
                </div>
              </div>
            </div>

            {/* Filter & Control Bar */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 shrink-0 bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
              
              {/* Product Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
                {projectsList.map((p) => {
                  const count = p === 'ALL' ? leads.length : leads.filter(l => l.project === p).length;
                  return (
                    <button
                      key={p}
                      onClick={() => setFilterProject(p)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
                        filterProject === p
                          ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/20'
                          : 'bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700/60'
                      }`}
                    >
                      {p} <span className="text-[10px] opacity-80">({count})</span>
                    </button>
                  );
                })}
              </div>

              {/* Status filter + Search + CSV */}
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 focus:outline-none focus:border-cyan-400"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="new">● New</option>
                  <option value="contacted">✓ Contacted</option>
                  <option value="archived">✕ Archived</option>
                </select>

                <div className="relative flex-1 sm:w-64">
                  <input
                    type="text"
                    placeholder="Search sender, email, query..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-1.5 pl-8 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                  <svg className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                <button
                  onClick={exportToCSV}
                  disabled={filteredLeads.length === 0}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 disabled:opacity-50 text-xs text-white font-mono flex items-center gap-1.5 whitespace-nowrap transition-all"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export CSV
                </button>
              </div>
            </div>

            {/* Split View: Table on Left / Reader Drawer on Right */}
            <div className="flex-1 flex gap-4 min-h-0 overflow-hidden">
              
              {/* Virtualized/Scrollable Table */}
              <div className="flex-1 flex flex-col border border-slate-800 rounded-xl bg-slate-950/40 overflow-hidden">
                {filteredLeads.length === 0 ? (
                  <div className="m-auto py-16 text-center space-y-3">
                    <div className="w-12 h-12 mx-auto rounded-full bg-slate-800/60 border border-slate-700 flex items-center justify-center text-xl">
                      📬
                    </div>
                    <div className="text-sm font-bold text-white font-mono">
                      No Inquiries Found
                    </div>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      {leads.length === 0
                        ? 'The vault is active and listening in real time across all touchpoints.'
                        : 'No leads match your current search or filter combination.'}
                    </p>
                  </div>
                ) : (
                  <div className="flex-1 overflow-y-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead className="bg-slate-950/90 backdrop-blur-md sticky top-0 border-b border-slate-800 text-slate-400 font-mono z-10">
                        <tr>
                          <th className="py-3 px-4">Date / Source</th>
                          <th className="py-3 px-4">Sender Details</th>
                          <th className="py-3 px-4">Subject &amp; Excerpt</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 text-slate-300">
                        {paginatedLeads.map((item) => {
                          const isSelected = selectedLead && selectedLead.id === item.id;
                          return (
                            <tr
                              key={item.id}
                              onClick={() => setSelectedLead(item)}
                              className={`cursor-pointer transition-colors ${
                                isSelected ? 'bg-cyan-950/40 border-l-2 border-cyan-400' : 'hover:bg-slate-800/30'
                              }`}
                            >
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
                                  onClick={(e) => e.stopPropagation()}
                                  className="text-cyan-400 hover:underline font-mono text-xs block mt-0.5 truncate max-w-[200px]"
                                >
                                  {item.email}
                                </a>
                              </td>

                              <td className="py-3.5 px-4 align-top max-w-xs sm:max-w-md">
                                <div className="font-semibold text-slate-200 truncate">{item.subject}</div>
                                <p className="text-slate-400 mt-0.5 text-xs line-clamp-2 leading-relaxed">
                                  {item.message}
                                </p>
                              </td>

                              <td className="py-3.5 px-4 align-top whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                                <select
                                  value={item.status}
                                  onChange={(e) => handleStatusChange(item.id, e.target.value)}
                                  className={`px-2 py-1 rounded text-[11px] font-mono border focus:outline-none ${
                                    item.status === 'new'
                                      ? 'bg-cyan-950/50 border-cyan-700/50 text-cyan-300'
                                      : item.status === 'contacted'
                                      ? 'bg-emerald-950/50 border-emerald-700/50 text-emerald-300'
                                      : 'bg-slate-800 border-slate-700 text-slate-400'
                                  }`}
                                >
                                  <option value="new">● New</option>
                                  <option value="contacted">✓ Contacted</option>
                                  <option value="archived">✕ Archived</option>
                                </select>
                              </td>

                              <td className="py-3.5 px-4 align-top text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                                <div className="flex items-center justify-end gap-1.5">
                                  <a
                                    href={`mailto:${item.email}?subject=Re: ${encodeURIComponent(item.subject || item.project)}`}
                                    className="px-2.5 py-1 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-[11px] font-mono shadow-xs"
                                  >
                                    Reply
                                  </a>
                                  <button
                                    onClick={() => handleDelete(item.id)}
                                    className="text-slate-500 hover:text-rose-400 p-1 rounded"
                                    title="Delete lead"
                                  >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Pagination Controls Footer */}
                {filteredLeads.length > 0 && (
                  <div className="flex items-center justify-between px-4 py-3 border-t border-slate-800 bg-slate-950/90 text-xs font-mono text-slate-400 shrink-0">
                    <div className="flex items-center gap-2">
                      <span>Show</span>
                      <select
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                        className="bg-slate-900 border border-slate-700 rounded px-2 py-0.5 text-xs text-white"
                      >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                      </select>
                      <span>of {filteredLeads.length} inquiries</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 disabled:opacity-30 hover:text-white"
                      >
                        ← Prev
                      </button>
                      <span className="px-2 py-1 text-slate-200">
                        {currentPage} / {totalPages}
                      </span>
                      <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 disabled:opacity-30 hover:text-white"
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Side Reader Panel (When a lead is selected) */}
              {selectedLead && (
                <div className="w-80 lg:w-96 border border-slate-800 rounded-xl bg-slate-950/80 p-5 flex flex-col justify-between overflow-y-auto shrink-0 animate-fadeIn">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <span className="px-2.5 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono text-xs font-bold">
                        {selectedLead.project}
                      </span>
                      <button
                        onClick={() => setSelectedLead(null)}
                        className="text-slate-500 hover:text-white p-1"
                      >
                        ✕
                      </button>
                    </div>

                    <div>
                      <div className="text-xs text-slate-500 font-mono">Date Received</div>
                      <div className="text-xs text-slate-300 mt-0.5">
                        {new Date(selectedLead.timestamp).toLocaleString()}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-slate-500 font-mono">Sender Name &amp; Contact</div>
                      <div className="text-base font-bold text-white mt-0.5">{selectedLead.name || 'Anonymous'}</div>
                      <a
                        href={`mailto:${selectedLead.email}?subject=Re: ${encodeURIComponent(selectedLead.subject || selectedLead.project)}`}
                        className="text-cyan-400 hover:underline font-mono text-xs block mt-0.5"
                      >
                        {selectedLead.email}
                      </a>
                    </div>

                    <div>
                      <div className="text-xs text-slate-500 font-mono">Subject</div>
                      <div className="text-sm font-semibold text-slate-200 mt-0.5">{selectedLead.subject}</div>
                    </div>

                    <div>
                      <div className="text-xs text-slate-500 font-mono">Full Message</div>
                      <div className="mt-1 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto">
                        {selectedLead.message}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                    <a
                      href={`mailto:${selectedLead.email}?subject=Re: ${encodeURIComponent(selectedLead.subject || selectedLead.project)}`}
                      className="flex-1 text-center py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs shadow-sm transition-all"
                    >
                      Reply to Sender ↗
                    </a>
                    <button
                      onClick={() => handleDelete(selectedLead.id)}
                      className="px-3 py-2 rounded-lg border border-slate-700 hover:border-rose-500/40 text-slate-400 hover:text-rose-400 text-xs transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

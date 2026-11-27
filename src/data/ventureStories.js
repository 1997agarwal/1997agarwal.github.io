// Expanded problem and solution copy for each commercial platform.
// Written only from facts already in portfolioData.js (COMMERCIAL_VENTURES). Keep the short
// problem/solution lines there as the one-line summary; these expand on them.
export const VENTURE_STORIES = {
  'startup-os': {
    audience: 'Solo founders and student builders taking an idea to a first working product.',
    problemDetail:
      'A first version usually lives in several places at once: a doc for the idea, chat threads for the plan, AI agents producing code nobody has verified, and a repository whose structure drifts. With no single place to validate and specify an idea, most projects stall as dead prototypes.',
    solutionDetail:
      'StartupOS brings the whole journey into one operating system. A launchpad puts the idea in front of other people, a Blueprint Studio turns it into a spec, an IdeaLab scorer gives an early read on feasibility, and an automated 4-file parity auditor keeps the project\'s governance files consistent as it grows.',
  },
  'dupe-scout': {
    audience: 'Shoppers who want the look of luxury goods at a fair price.',
    problemDetail:
      'Shoppers who love a luxury look usually face two choices: pay full price, or buy a cheap counterfeit from a seller they cannot verify. Comparing the two takes time and trust that most people do not have.',
    solutionDetail:
      'DupeScout searches by image. A shopper uploads a photo, and multimodal CLIP embeddings with pgvector cosine similarity return close-matching, affordable alternatives in under a second. A Chrome extension brings the same comparison to the page the shopper is already viewing.',
  },
  'business-pay': {
    audience: 'B2B sellers with large receivables, and the collections teams who chase them.',
    problemDetail:
      'Buyers often pay late, so sellers carry large overdue balances, high Days Sales Outstanding, and expensive working-capital credit lines to cover the gap. Standard payment terms give buyers no reason to pay early.',
    solutionDetail:
      'BusinessPay gives buyers a real reason to pay now. A dynamic discounting engine calculates an APR-based discount for immediate payment in real time, collectors work a risk-scored queue so the right invoices get chased first, and buyers choose the early-payment option in a self-serve portal.',
  },
  'collab-karo': {
    audience: 'Brands and agencies commissioning creators, and the creators they work with.',
    problemDetail:
      'Brands cannot count on deliverables arriving on time. Creators, especially smaller ones, wait for payment and absorb scope creep, with no contract protection on either side.',
    solutionDetail:
      'CollabKaro structures each collaboration as escrow-backed milestones. Payment is held and released as each deliverable is signed off. Creators keep a verified media kit, and an escrow admin console shows both sides where every milestone stands.',
  },
  housy: {
    audience: 'Homeowners running a build or renovation, especially remote and NRI owners who cannot be on site.',
    problemDetail:
      'Contractor coordination is chaotic, pricing hides markups, timelines have no one accountable, and budgets run over with nobody physically checking the work. Owners who live far away have the least visibility of all.',
    solutionDetail:
      'Housy runs the whole project as one system. Phase-wise estimates are instant across 20 cities, expert measurement visits happen on site, a structural feasibility advisor flags problems early, and milestone payments are released only against verified photo proof.',
  },
  hinged: {
    audience: 'Families planning multi-event Indian weddings, and the coordinators who run them.',
    problemDetail:
      'A wedding that runs three to five days across four to seven functions collapses under spreadsheets. Email invitations get poor open rates, uninvited guests turn up, and relatives see invitations they were never meant to receive.',
    solutionDetail:
      'Hinged sends WhatsApp-native invitation links, each one scoped to only the ceremonies that guest is invited to, with household attendee limits enforced. Coordinators import guest lists from CSV and track headcount from a single dashboard.',
  },
};

import React, { useMemo } from 'react';
import { COMMERCIAL_VENTURES } from '../data/portfolioData';
import { VENTURE_STORIES } from '../data/ventureStories';
import { useSite } from '../context/SiteContext';
import ProjectScroller from './ProjectScroller';
import { usePageMeta } from './PageMeta';

// Commercial projects: the shared project reader, fed with the commercial data.
export default function CommercialShowcase() {
  usePageMeta({ title: 'Commercial Projects', description: 'Six commercial platforms built end to end, from problem to shipped product.' });
  const { openContact } = useSite();
  const items = useMemo(
    () =>
      COMMERCIAL_VENTURES.map((v) => {
        const story = VENTURE_STORIES[v.id] || { audience: '', problemDetail: v.problem, solutionDetail: v.solution };
        return {
          id: v.id,
          name: v.name,
          category: v.category,
          stage: v.stage,
          tagline: v.tagline,
          audience: story.audience,
          problem: story.problemDetail,
          solution: story.solutionDetail,
          summary: v.resumeBlurb,
          access: v.access ? `${v.access}. Walkthroughs on request.` : '',
          points: v.surfaces,
          stack: v.stack,
          demoUrl: v.demoUrl,
        };
      }),
    []
  );

  const betaCount = COMMERCIAL_VENTURES.filter((v) => v.stage === 'BETA').length;

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      <header className="mb-14 max-w-3xl">
        <p className="text-xs font-mono uppercase tracking-widest text-brand-blue mb-3">Commercial projects</p>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.05] mb-5">
          Six platforms, built end to end.
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          Scroll to read each one, or pick a name from the list. {betaCount} are in beta and the rest are in alpha.
        </p>
      </header>
      <ProjectScroller items={items} onRequest={(name) => openContact(`${name} walkthrough`)} />
    </section>
  );
}

import React, { useMemo } from 'react';
import BackLink from '../components/BackLink';
import ProjectScroller from '../components/ProjectScroller';
import { OPEN_SOURCE_TOOLS } from '../data/portfolioData';
import { OPEN_SOURCE_STORIES } from '../data/openSourceStories';
import { usePageMeta } from '../components/PageMeta';

// Open-source projects: the same reader as commercial projects, fed with the open-source data.
export default function OpenSourcePage() {
  usePageMeta({
    title: 'Open-Source Projects',
    description: `${OPEN_SOURCE_TOOLS.length} MIT-licensed open-source projects: agentic dev tools, LLM cost control and playful AI experiments.`,
  });

  const items = useMemo(
    () =>
      OPEN_SOURCE_TOOLS.map((t) => {
        const story = OPEN_SOURCE_STORIES[t.id] || { audience: '', problemDetail: t.description, solutionDetail: t.description };
        return {
          id: t.id,
          name: t.name,
          category: t.category,
          license: t.license || 'MIT',
          tagline: t.tagline,
          audience: story.audience,
          problem: story.problemDetail,
          solution: story.solutionDetail,
          description: t.description,
          summary: t.resumeSummary,
          points: t.highlights || [],
          stack: t.stack || [],
          demoUrl: t.demoUrl,
          repoUrl: t.repoUrl,
        };
      }),
    []
  );

  return (
    <div className="pt-28 md:pt-36 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackLink />
        <header className="mt-8 mb-14 max-w-3xl">
          <p className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-3">Open-source projects</p>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.05] mb-5">
            {OPEN_SOURCE_TOOLS.length} projects, all MIT licensed.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Agentic dev tools, LLM cost control, and interactive AI experiments. Scroll to read each one, or pick a name from the list.
          </p>
        </header>
        <ProjectScroller items={items} />
      </div>
    </div>
  );
}

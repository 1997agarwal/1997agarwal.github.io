import React from 'react';
import BackLink from '../components/BackLink';
import ExperienceSection from '../components/ExperienceSection';
import { usePageMeta } from '../components/PageMeta';

export default function Experience() {
  usePageMeta({ title: 'Experience', description: 'Product roles at Tekion, Tally, Shiprocket and Frendy, with outcomes and skills.' });
  return (
    <div className="pt-28 md:pt-36">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackLink />
      </div>
      <ExperienceSection />
    </div>
  );
}

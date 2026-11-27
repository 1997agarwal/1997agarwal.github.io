import React from 'react';
import BackLink from '../components/BackLink';
import CaseStudiesArchive from '../components/CaseStudiesArchive';
import { usePageMeta } from '../components/PageMeta';

export default function CaseStudiesPage() {
  usePageMeta({ title: 'Case Studies & PRDs', description: 'Product documents: market research, analytics, MVP specs and unit economics.' });
  return (
    <div className="pt-28 md:pt-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackLink />
      </div>
      <CaseStudiesArchive />
    </div>
  );
}

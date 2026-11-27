import React from 'react';
import BackLink from '../components/BackLink';
import CommercialShowcase from '../components/CommercialShowcase';

export default function VenturesPage() {
  return (
    <div className="pt-28 md:pt-36">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackLink />
      </div>
      <div className="mt-8">
        <CommercialShowcase />
      </div>
    </div>
  );
}

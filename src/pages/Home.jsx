import React from 'react';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Lanes from '../components/Lanes';
import ChartsSection from '../components/ChartsSection';
import GoDeeper from '../components/GoDeeper';
import ClosingCTA from '../components/ClosingCTA';
import { usePageMeta } from '../components/PageMeta';

// Every block gets the same top spacing, so the gap between any two blocks is identical.
function Block({ children }) {
  return <div className="pt-24 md:pt-28">{children}</div>;
}

// Landing page, top to bottom: who I am, what I've built, the numbers, then credentials.
export default function Home() {
  usePageMeta({});
  return (
    <>
      <Hero />
      <Marquee />
      <Block><Lanes /></Block>
      <Block><ChartsSection /></Block>
      <Block><GoDeeper /></Block>
      <Block><ClosingCTA /></Block>
      <div className="pb-24 md:pb-28" />
    </>
  );
}

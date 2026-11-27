import React, { useEffect, useState } from 'react';

// Thin gradient bar at the top of the viewport showing how far down the page the reader is.
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? el.scrollTop / max : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-0.5 z-[60] origin-left bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-purple"
      style={{ transform: `scaleX(${progress})` }}
    />
  );
}

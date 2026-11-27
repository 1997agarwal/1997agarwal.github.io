import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Each route change should start at the top of the new page, not where the last one ended.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

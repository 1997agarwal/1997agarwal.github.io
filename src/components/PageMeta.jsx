import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Per-page title, description, and share image. Pages are client-rendered, so these are set
// when each page mounts. Link previews from crawlers that do not run JavaScript still get the
// homepage defaults from index.html.
const SITE = 'https://harshit.buzz';
const DEFAULT_TITLE = 'Harshit Agarwal — Senior Product Manager';
const DEFAULT_DESCRIPTION =
  'Harshit Agarwal builds B2B fintech, AI tools and startups, from zero to live. Experience, products, open source and credentials.';
const SHARE_IMAGE = `${SITE}/og-image.png`;

function setTag(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function usePageMeta({ title, description } = {}) {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = title ? `${title} · Harshit Agarwal` : DEFAULT_TITLE;
    const desc = description || DEFAULT_DESCRIPTION;
    const url = `${SITE}${pathname}`;

    document.title = fullTitle;
    setTag('name', 'description', desc);
    setTag('property', 'og:title', fullTitle);
    setTag('property', 'og:description', desc);
    setTag('property', 'og:url', url);
    setTag('property', 'og:image', SHARE_IMAGE);
    setTag('name', 'twitter:title', fullTitle);
    setTag('name', 'twitter:description', desc);
    setTag('name', 'twitter:image', SHARE_IMAGE);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [title, description, pathname]);
}

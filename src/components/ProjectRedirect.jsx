import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import NotFound from '../pages/NotFound';

// Individual project URLs (/ventures/housy, /open-source/reverse-ui) now open the shared reader
// on its list page at that project, so every project is read in one layout.
export default function ProjectRedirect({ base, items }) {
  const { projectId } = useParams();
  if (!items.some((i) => i.id === projectId)) return <NotFound />;
  return <Navigate to={`${base}#${projectId}`} replace />;
}

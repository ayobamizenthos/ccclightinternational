import React, { Suspense } from 'react';

const YouTubeLightbox = React.lazy(() => import('./YouTubeLightbox'));

const LazyYouTubeLightbox = (props: any) => {
  return (
    <Suspense fallback={null}>
      <YouTubeLightbox {...props} />
    </Suspense>
  );
};

export default LazyYouTubeLightbox;

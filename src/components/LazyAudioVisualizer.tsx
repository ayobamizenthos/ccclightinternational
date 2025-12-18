import React, { Suspense } from 'react';

const AudioVisualizer = React.lazy(() => import('./AudioVisualizer'));

const LazyAudioVisualizer = (props: any) => {
  return (
    <Suspense fallback={<div className="w-6 h-6 bg-white/10 rounded animate-pulse" />}>
      <AudioVisualizer {...props} />
    </Suspense>
  );
};

export default LazyAudioVisualizer;

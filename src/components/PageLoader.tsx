import { memo } from "react";

// Simplified PageLoader - the main instant preloader is now in index.html
// This component is kept for the React Suspense fallback
const PageLoader = memo(() => {
  // Return null since the HTML preloader handles initial load
  // and Suspense should just show a minimal loading state
  return null;
});

PageLoader.displayName = 'PageLoader';

export default PageLoader;

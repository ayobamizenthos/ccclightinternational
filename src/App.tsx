import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { Suspense, lazy, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import LoadingAnimation from "@/components/LoadingAnimation";

import ErrorBoundary from "@/components/ErrorBoundary";
import PageTransition from "@/components/PageTransition";
import LiveIndicator from "@/components/LiveIndicator";
import BottomNavigation from "@/components/BottomNavigation";
import { OfflineIndicator } from "@/components/OfflineIndicator";
import usePageChime from "@/hooks/usePageChime";
import { trackPageView } from "@/lib/analytics";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ChoirMediaTeam = lazy(() => import("./pages/ChoirMediaTeam"));
const Sermons = lazy(() => import("./pages/Sermons"));
const SermonDetail = lazy(() => import("./pages/SermonDetail"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Search = lazy(() => import("./pages/Search"));
const Feedback = lazy(() => import("./pages/Feedback"));
const BranchPage = lazy(() => import("./pages/BranchPage"));
const Bible = lazy(() => import("./pages/Bible"));
const Install = lazy(() => import("./pages/Install"));
const Live = lazy(() => import("./pages/Live"));
const More = lazy(() => import("./pages/More"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const PrayerRequests = lazy(() => import("./pages/PrayerRequests"));
const Testimonies = lazy(() => import("./pages/Testimonies"));
const Gallery = lazy(() => import("./pages/Gallery"));

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  
  // Play chime sound on page navigation
  usePageChime();
  
  // Track page views on route change
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);
  
  // Check if we're on Bible page - hide main nav
  const isBiblePage = location.pathname === '/bible';
  
  return (
    <>
      <AnimatePresence mode="wait">
        <Suspense fallback={<LoadingAnimation />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Index /></PageTransition>} />
            <Route path="/bible" element={<PageTransition><Bible /></PageTransition>} />
            <Route path="/install" element={<PageTransition><Install /></PageTransition>} />
            <Route path="/live" element={<PageTransition><Live /></PageTransition>} />
            <Route path="/more" element={<PageTransition><More /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/prayer" element={<PageTransition><PrayerRequests /></PageTransition>} />
            <Route path="/testimonies" element={<PageTransition><Testimonies /></PageTransition>} />
            <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
            <Route path="/branch/:slug" element={<BranchPage />} />
            <Route path="/choir-media" element={<PageTransition><ChoirMediaTeam /></PageTransition>} />
            <Route path="/sermons" element={<PageTransition><Sermons /></PageTransition>} />
            <Route path="/sermon/:id" element={<PageTransition><SermonDetail /></PageTransition>} />
            <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
            <Route path="/blog/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
            <Route path="/search" element={<PageTransition><Search /></PageTransition>} />
            <Route path="/feedback" element={<PageTransition><Feedback /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </Suspense>
      </AnimatePresence>
      {/* Hide main bottom navigation when on Bible page */}
      {!isBiblePage && <BottomNavigation />}
    </>
  );
};

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <PWAInstallPrompt />
          <BrowserRouter>
            {/* Skip link - visually hidden, only visible on keyboard focus for accessibility */}
            <a 
              href="#main-content" 
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:outline-none"
            >
              Skip to main content
            </a>
            <LiveIndicator />
            <OfflineIndicator />
            <AnimatedRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;

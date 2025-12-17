import { useState, useCallback, useEffect, lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Welcome from "@/components/Welcome";
import ServiceTimes from "@/components/ServiceTimes";
import Shepherd from "@/components/Shepherd";
import LiveService from "@/components/LiveService";
import DonationSystem from "@/components/DonationSystem";
import SermonsGrid from "@/components/SermonsGrid";
import NewsletterSignup from "@/components/NewsletterSignup";
import Testimonials from "@/components/Testimonials";
import NextSteps from "@/components/NextSteps";
import Footer from "@/components/Footer";
import ProgressIndicator from "@/components/ProgressIndicator";
import SEO from "@/components/SEO";
import PullToRefresh from "@/components/PullToRefresh";
import CelestialBackground from "@/components/CelestialBackground";
import SectionDivider from "@/components/SectionDivider";
import FeaturedVideoSpotlight from "@/components/FeaturedVideoSpotlight";
import BranchesSection from "@/components/BranchesSection";
import AnnualEventsCalendar from "@/components/AnnualEventsCalendar";
import DailyVerse from "@/components/DailyVerse";


import PageLoader from "@/components/PageLoader";
import FloatingActionMenu from "@/components/FloatingActionMenu";

// Lazy load non-critical components
const Events = lazy(() => import("@/components/Events"));

const Index = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [showFloatingButtons, setShowFloatingButtons] = useState(false);
  const [actionMenuOpen, setActionMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingButtons(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleRefresh = useCallback(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshKey(prev => prev + 1);
  }, []);

  return (
    <>
      <PageLoader />
      
      <SEO
        title="CCC Light International Parish | Imole - Celestial Church of Christ" 
        description="Experience divine worship at CCC Light International Parish (Imole) — spreading the light of Christ across 6 parishes in Nigeria, UAE, and Georgia." 
        url="/" 
      />
      <CelestialBackground />
      <ProgressIndicator />
      <Navigation />
      <PullToRefresh onRefresh={handleRefresh}>
        <main id="main-content" className="bg-background min-h-screen relative z-10" key={refreshKey}>
          <Hero />
          <Welcome />
          <SectionDivider variant="celestial" />
          <DailyVerse />
          <SectionDivider variant="gold" />
          <ServiceTimes />
          <SectionDivider variant="teal" showCross={false} />
          <BranchesSection />
          <SectionDivider variant="gold" />
          <Shepherd />
          <SectionDivider variant="teal" />
          <LiveService />
          <SectionDivider variant="gold" showCross={false} />
          <FeaturedVideoSpotlight />
          <SectionDivider variant="celestial" />
          <SermonsGrid />
          <SectionDivider variant="teal" showCross={false} />
          <AnnualEventsCalendar />
          <SectionDivider variant="gold" />
          <Suspense fallback={<div className="h-64" />}>
            <Events />
          </Suspense>
          <SectionDivider variant="celestial" showCross={false} />
          <DonationSystem />
          <SectionDivider variant="teal" />
          <NewsletterSignup />
          <SectionDivider variant="gold" showCross={false} />
          <Testimonials />
          <SectionDivider variant="celestial" />
          <NextSteps />
        </main>
      </PullToRefresh>
      <Footer />
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 items-end">
        <FloatingActionMenu isVisible={showFloatingButtons} onOpenChange={setActionMenuOpen} />
      </div>
    </>
  );
};

export default Index;

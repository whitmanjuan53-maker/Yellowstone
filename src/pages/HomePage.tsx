import { Hero } from '@/sections/Hero';
import { PortfolioStrip } from '@/sections/PortfolioStrip';
import { PromotionsCarousel } from '@/sections/PromotionsCarousel';
import { TourCTASection } from '@/sections/TourCTASection';
import { WhyRentSection } from '@/sections/WhyRentSection';
import { TrustStrip } from '@/sections/TrustStrip';
import { MobileStickyCTA } from '@/components/MobileStickyCTA';
import { ChatBot } from '@/components/ChatBot';

export function HomePage() {
  return (
    <>
      {/* 1. Hero — split layout, renter-focused */}
      <Hero />

      {/* 2. Now Leasing Promotions — revolving carousel */}
      <PromotionsCarousel />

      {/* 3. Featured Communities — card grid */}
      <PortfolioStrip />

      {/* 4. Tour CTA — high-conversion, primary-blue */}
      <TourCTASection />

      {/* 4. Why Rent With Yellowstone — renter benefit cards */}
      <WhyRentSection />

      {/* 5. Trust Strip — minimal credibility */}
      <TrustStrip />

      {/* Mobile Sticky Bar — View | Tour | Apply */}
      <MobileStickyCTA />

      {/* AI Chat */}
      <ChatBot />
    </>
  );
}

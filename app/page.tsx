import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import ScrollingCards from "@/components/scrolling-cards"
import HowItworks from "@/components/How-it-works";
import { Trust } from "@/components/Trust";
import { ImpactSection } from "@/components/ImpactSection";
import FAQSection from "@/components/faq-section";
import Footer from "@/components/footer-section";
import DownloadSection from "@/components/download-app";
import WhyChooseSection from "@/components/why-choose-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFF5E9]">
      <Navbar />
      <HeroSection />
      <ScrollingCards />
      <HowItworks />
      <DownloadSection/>
      <Trust />
      <ImpactSection />
      <WhyChooseSection/>
      <FAQSection />
      <Footer/>
    </main>
  );
}

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import RequestPickup from "@/components/RequestPickup";
import AboutSection from "@/components/AboutSection";
import BenefitsSection from "@/components/BenefitsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import RequestsViewer from "@/components/RequestsViewer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <HowItWorks />
    <RequestPickup />
    <AboutSection />
    <BenefitsSection />
    <ContactSection />
    <Footer />
    <RequestsViewer />
  </div>
);

export default Index;

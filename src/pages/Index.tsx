import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LearningPaths from "@/components/LearningPaths";
import SubjectLibrary from "@/components/SubjectLibrary";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import HowItWorks from "@/components/HowItWorks";
import OnboardingForm from "@/components/OnboardingForm";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import StatsBar from "@/components/StatsBar";
import WhyEdunova from "@/components/WhyEdunova";

const Index = () => (
  <main>
    <Navbar />
    <HeroSection />
    <StatsBar />
    <LearningPaths />
    <WhyEdunova />
    <SubjectLibrary />
    <Features />
    <HowItWorks />
    <Pricing />
    <Testimonials />
    <OnboardingForm />
    <FAQ />
    <FinalCTA />
    <Footer />
  </main>
);

export default Index;

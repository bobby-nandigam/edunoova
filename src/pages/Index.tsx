import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import UserTypes from "@/components/UserTypes";
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

const Index = () => (
  <main>
    <Navbar />
    <HeroSection />
    <UserTypes />
    <LearningPaths />
    <SubjectLibrary />
    <Features />
    <Pricing />
    <HowItWorks />
    <OnboardingForm />
    <Testimonials />
    <FAQ />
    <FinalCTA />
    <Footer />
  </main>
);

export default Index;

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import heroImg from "@/assets/hero-illustration.png";

const HeroSection = () => (
  <section className="relative gradient-hero min-h-screen flex items-center overflow-hidden pt-20">
    {/* Ambient glow orbs */}
    <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[120px] animate-pulse-glow" />
    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-[100px] animate-pulse-glow" />

    <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/15 text-primary mb-6">
          AI-Powered Learning Platform
        </span>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-primary-foreground mb-6">
          From Curious Kid to{" "}
          <span className="gradient-text">AI Engineer</span> — One Platform.
        </h1>
        <p className="text-lg text-primary-foreground/70 max-w-lg mb-8 leading-relaxed">
          Master Computer Science, Coding, and Artificial Intelligence with
          structured learning paths for every age and level.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="#onboarding"
            className="gradient-btn inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground shadow-lg hover:shadow-xl transition-all"
          >
            Start Learning Free <ArrowRight size={16} />
          </a>
          <a
            href="#learning-paths"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground/80 border border-primary-foreground/20 hover:bg-primary-foreground/5 transition-all"
          >
            <Play size={16} /> Explore Courses
          </a>
        </div>

        <div className="flex items-center gap-8 mt-10 text-primary-foreground/60 text-sm">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            10,000+ Learners
          </span>
          <span>50+ Subjects</span>
          <span>AI-Powered</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hidden lg:block"
      >
        <img
          src={heroImg}
          alt="AI and Computer Science learning visualization with neural networks and code"
          className="w-full rounded-2xl shadow-2xl animate-float"
          loading="eager"
        />
      </motion.div>
    </div>
  </section>
);

export default HeroSection;

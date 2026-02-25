import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

const HeroSection = () => (
  <section className="relative hero-section min-h-screen flex items-center pt-20">
    <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary-foreground/10 text-primary-foreground/80 mb-6 border border-primary-foreground/10">
          AI-Powered Learning Platform
        </span>
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl italic leading-[1.1] text-primary-foreground mb-6">
          From Curious Kid to{" "}
          <span className="text-accent">AI Engineer</span> — One Platform.
        </h1>
        <p className="text-lg text-primary-foreground/60 max-w-lg mb-10 leading-relaxed">
          Master Computer Science, Coding, and Artificial Intelligence with
          structured learning paths for every age and level.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="#onboarding"
            className="bg-accent text-accent-foreground inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Start Learning Free <ArrowRight size={16} />
          </a>
          <a
            href="#learning-paths"
            className="btn-outline inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold"
          >
            <Play size={16} /> Explore Courses
          </a>
        </div>

        <div className="flex items-center gap-8 mt-12 text-primary-foreground/40 text-sm">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            10,000+ Learners
          </span>
          <span>50+ Subjects</span>
          <span>AI-Powered</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hidden lg:flex flex-col items-center justify-center"
      >
        <div className="w-full max-w-md aspect-square rounded-3xl bg-primary-foreground/5 border border-primary-foreground/10 flex items-center justify-center">
          <div className="text-center">
            <span className="font-display text-8xl italic text-primary-foreground/20">E</span>
            <p className="text-primary-foreground/30 text-sm mt-2 tracking-widest uppercase">Eduva</p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;

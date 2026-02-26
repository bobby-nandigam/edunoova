import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Send } from "lucide-react";

const HeroSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
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
            Master <span className="gradient-text">Coding & New Technologies</span> — Your Way.
          </h1>
          <p className="text-lg text-primary-foreground/70 max-w-lg mb-8 leading-relaxed">
            Whether you're just starting out or leveling up, get structured learning paths in programming, CS, and AI tailored to your goals.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#learning-paths"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground/80 border border-primary-foreground/20 hover:bg-primary-foreground/5 transition-all"
            >
              Explore Courses <ArrowRight size={16} />
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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {submitted ? (
            <div className="glass rounded-2xl p-10 text-center">
              <div className="w-14 h-14 mx-auto rounded-full gradient-btn flex items-center justify-center text-primary-foreground text-xl mb-4">✓</div>
              <h3 className="font-display text-xl font-bold text-primary-foreground mb-2">You're All Set!</h3>
              <p className="text-primary-foreground/60 text-sm">Your personalized learning plan is being created.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-4">
              <h3 className="font-display text-lg font-bold text-primary-foreground mb-1">Start Learning Free</h3>
              <p className="text-primary-foreground/50 text-sm mb-4">Tell us a bit about yourself to get started.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <input required type="text" placeholder="Full Name" className="w-full px-4 py-2.5 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <input required type="email" placeholder="Email" className="w-full px-4 py-2.5 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <select required className="w-full px-4 py-2.5 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10 text-sm text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option value="" className="text-muted-foreground">Select your level...</option>
                <option>Beginner</option>
                <option>High School / Intermediate</option>
                <option>B.Tech / College</option>
                <option>Working Professional</option>
              </select>
              <select required className="w-full px-4 py-2.5 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10 text-sm text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option value="" className="text-muted-foreground">Your career goal...</option>
                <option>Software Engineer</option>
                <option>AI/ML Engineer</option>
                <option>Data Scientist</option>
                <option>Full Stack Developer</option>
                <option>Other</option>
              </select>
              <button
                type="submit"
                className="w-full gradient-btn text-primary-foreground py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-lg transition-all"
              >
                <Send size={16} /> Create My Learning Plan
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

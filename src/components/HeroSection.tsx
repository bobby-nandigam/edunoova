import { motion } from "framer-motion";
import { ArrowRight, Play, Code2, BookOpen, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative gradient-hero min-h-[90vh] flex items-center overflow-hidden pt-20">
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-[100px] animate-pulse-glow" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/15 text-primary mb-6">
              <Sparkles size={14} /> AI-Powered Learning Platform
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-primary-foreground mb-6">
              Master{" "}
              <span className="gradient-text">Coding &{"\n"}New Technologies</span>
              <br className="hidden sm:block" />
              — Your Way.
            </h1>
            <p className="text-lg sm:text-xl text-primary-foreground/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              Structured learning paths, hands-on practice, AI mentoring, and gamified modules — 
              everything you need to build a career in tech.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <button
              onClick={() => navigate("/auth")}
              className="gradient-btn inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-primary-foreground shadow-lg hover:shadow-xl transition-all"
            >
              Start Learning Free <ArrowRight size={16} />
            </button>
            <a
              href="#learning-paths"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-primary-foreground/80 border border-primary-foreground/20 hover:bg-primary-foreground/5 transition-all"
            >
              <Play size={14} /> Explore Paths
            </a>
          </motion.div>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {[
              { icon: Code2, label: "Built-in Compiler" },
              { icon: BookOpen, label: "50+ Subjects" },
              { icon: Sparkles, label: "AI Mentor" },
            ].map((pill) => (
              <span
                key={pill.label}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium bg-primary-foreground/5 text-primary-foreground/60 border border-primary-foreground/10"
              >
                <pill.icon size={13} /> {pill.label}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

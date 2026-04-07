import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, Code2, BookOpen, Sparkles, Terminal, Users, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const codeLines = [
  { text: "def solve(nums, target):", color: "text-accent" },
  { text: '    seen = {}', color: "text-primary-foreground/80" },
  { text: "    for i, num in enumerate(nums):", color: "text-primary-foreground/80" },
  { text: "        diff = target - num", color: "text-primary-foreground/70" },
  { text: "        if diff in seen:", color: "text-accent" },
  { text: "            return [seen[diff], i]", color: "text-green-400" },
  { text: "        seen[num] = i", color: "text-primary-foreground/70" },
];

const roles = ["Software Engineer", "Data Scientist", "AI Engineer", "Full Stack Developer", "ML Researcher"];

const HeroSection = () => {
  const navigate = useNavigate();
  const [roleIndex, setRoleIndex] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (visibleLines < codeLines.length) {
      const t = setTimeout(() => setVisibleLines((v) => v + 1), 400);
      return () => clearTimeout(t);
    }
  }, [visibleLines]);

  return (
    <section className="relative gradient-hero min-h-[92vh] flex items-center overflow-hidden pt-20">
      {/* Ambient */}
      <div className="absolute top-20 left-[10%] w-[500px] h-[500px] rounded-full bg-primary/8 blur-[140px] animate-pulse-glow" />
      <div className="absolute bottom-10 right-[10%] w-[400px] h-[400px] rounded-full bg-accent/6 blur-[120px] animate-pulse-glow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[hsl(260,70%,55%)]/4 blur-[200px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Copy */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-primary/15 text-primary border border-primary/20 mb-6">
              <Sparkles size={14} /> AI-Powered Learning Platform
            </span>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] xl:text-6xl font-bold leading-[1.1] text-primary-foreground mb-4">
              Learn to Code.
              <br />
              Become a{" "}
              <span className="relative inline-block">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="gradient-text inline-block"
                  >
                    {roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            <p className="text-base sm:text-lg text-primary-foreground/60 max-w-lg mb-8 leading-relaxed">
              Structured paths, hands-on practice, AI mentoring, and gamified modules — master in-demand skills with India's most comprehensive tech learning platform.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <button
                onClick={() => navigate("/auth")}
                className="gradient-btn inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground shadow-lg hover:shadow-xl transition-all"
              >
                Start Learning Free <ArrowRight size={16} />
              </button>
              <a
                href="#learning-paths"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground/70 border border-primary-foreground/15 hover:bg-primary-foreground/5 transition-all"
              >
                <Play size={14} /> Explore Paths
              </a>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-6 text-primary-foreground/50 text-xs">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["PS", "AM", "SR", "RV"].map((a) => (
                    <div key={a} className="w-7 h-7 rounded-full bg-primary/30 border-2 border-[hsl(220,60%,8%)] flex items-center justify-center text-[10px] font-bold text-primary-foreground/80">
                      {a}
                    </div>
                  ))}
                </div>
                <span>10,000+ learners</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles size={14} className="text-accent" />
                <span>AI-powered mentoring</span>
              </div>
            </div>
          </motion.div>

          {/* Right — Code Editor Mock */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Editor window */}
              <div className="rounded-2xl overflow-hidden border border-primary-foreground/10 bg-[hsl(220,40%,8%)] shadow-2xl">
                {/* Title bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[hsl(220,30%,10%)] border-b border-primary-foreground/8">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  </div>
                  <span className="text-[11px] text-primary-foreground/40 ml-2 flex items-center gap-1.5">
                    <Terminal size={12} /> solution.py
                  </span>
                </div>

                {/* Code area */}
                <div className="p-5 font-mono text-sm leading-7 min-h-[260px]">
                  {codeLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={i < visibleLines ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.3 }}
                      className={`${line.color} ${i >= visibleLines ? "opacity-0" : ""}`}
                    >
                      <span className="text-primary-foreground/20 mr-4 select-none text-xs">{i + 1}</span>
                      {line.text}
                    </motion.div>
                  ))}
                  {visibleLines >= codeLines.length && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-3 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs"
                    >
                      ✓ All test cases passed — Time: O(n) · Space: O(n)
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 glass rounded-xl px-4 py-2.5 flex items-center gap-2"
              >
                <Sparkles size={16} className="text-accent" />
                <div>
                  <div className="text-[11px] font-semibold text-primary-foreground">AI Mentor</div>
                  <div className="text-[10px] text-primary-foreground/50">Always available</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 glass rounded-xl px-4 py-2.5 flex items-center gap-2"
              >
                <Code2 size={16} className="text-primary" />
                <div>
                  <div className="text-[11px] font-semibold text-primary-foreground">500+ Problems</div>
                  <div className="text-[10px] text-primary-foreground/50">with solutions</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

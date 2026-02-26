import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code, BookOpen, Laptop, Target, Brain, Briefcase, X, Clock, BarChart3, Zap,
} from "lucide-react";

const types = [
  {
    icon: BookOpen,
    title: "Beginners",
    desc: "Zero to basics in programming & CS fundamentals.",
    paths: [
      { title: "Foundations of Computing", duration: "8 weeks", level: "Beginner", skills: "Logic, Scratch, Basics" },
      { title: "Coding & Programming Basics", duration: "10 weeks", level: "Beginner", skills: "Python, C, Problem Solving" },
    ],
  },
  {
    icon: Code,
    title: "High School / Intermediate",
    desc: "Data structures, algorithms & competitive coding.",
    paths: [
      { title: "Pre-Engineering CS", duration: "12 weeks", level: "Intermediate", skills: "DSA, Math, Algorithms" },
      { title: "Competitive Programming", duration: "10 weeks", level: "Intermediate", skills: "Codeforces, Leetcode, Contests" },
    ],
  },
  {
    icon: Laptop,
    title: "B.Tech CSE Students",
    desc: "Full university-level CS curriculum coverage.",
    paths: [
      { title: "B.Tech CSE Core Subjects", duration: "24 weeks", level: "Intermediate", skills: "OS, DBMS, CN, OOP" },
      { title: "Software Engineer Path", duration: "20 weeks", level: "Advanced", skills: "Full Stack, DevOps, Cloud" },
    ],
  },
  {
    icon: Target,
    title: "Placement Aspirants",
    desc: "Crack product-based company interviews.",
    paths: [
      { title: "Placement Preparation", duration: "16 weeks", level: "Advanced", skills: "DSA, System Design, Aptitude" },
      { title: "Interview Mastery", duration: "8 weeks", level: "Advanced", skills: "Mock Interviews, HR, Coding Rounds" },
    ],
  },
  {
    icon: Brain,
    title: "AI / ML Career Seekers",
    desc: "Deep learning, NLP, computer vision & more.",
    paths: [
      { title: "AI & Machine Learning", duration: "20 weeks", level: "Advanced", skills: "ML, DL, NLP, CV" },
      { title: "Data Science & AI Engineer", duration: "24 weeks", level: "Expert", skills: "Stats, ML, MLOps, GenAI" },
    ],
  },
  {
    icon: Briefcase,
    title: "Professionals",
    desc: "Upskill with AI, system design & advanced topics.",
    paths: [
      { title: "Advanced System Design", duration: "12 weeks", level: "Advanced", skills: "HLD, LLD, Scalability" },
      { title: "GenAI & MLOps", duration: "16 weeks", level: "Expert", skills: "LLMs, RAG, Deployment" },
    ],
  },
];

const levelColor: Record<string, string> = {
  Beginner: "bg-accent/15 text-accent",
  Intermediate: "bg-primary/15 text-primary",
  Advanced: "bg-[hsl(260,70%,55%)]/15 text-[hsl(260,70%,55%)]",
  Expert: "bg-destructive/15 text-destructive",
};

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const UserTypes = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="py-24 section-gradient" id="user-types">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Built for <span className="gradient-text">Every Learner</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Whether you're a beginner or a professional — find the perfect starting point for your journey.
          </p>
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {types.map((t, i) => (
            <motion.div
              key={t.title}
              variants={item}
              className="bg-card rounded-xl p-6 border border-border card-hover cursor-pointer group"
              onClick={() => setSelected(i)}
            >
              <div className="w-11 h-11 rounded-lg gradient-btn flex items-center justify-center mb-4 text-primary-foreground">
                <t.icon size={20} />
              </div>
              <h3 className="font-display font-semibold text-card-foreground mb-1.5">{t.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t.desc}</p>
              <span className="text-xs font-semibold text-primary group-hover:underline">
                Explore Path →
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Path detail modal */}
        <AnimatePresence>
          {selected !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-card rounded-2xl border border-border p-8 max-w-lg w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg gradient-btn flex items-center justify-center text-primary-foreground">
                      {(() => { const Icon = types[selected].icon; return <Icon size={18} />; })()}
                    </div>
                    <h3 className="font-display text-xl font-bold">{types[selected].title}</h3>
                  </div>
                  <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground transition-colors">
                    <X size={20} />
                  </button>
                </div>
                <p className="text-muted-foreground text-sm mb-6">{types[selected].desc}</p>
                <div className="space-y-4">
                  {types[selected].paths.map((p) => (
                    <div key={p.title} className="bg-secondary rounded-xl p-5 border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-display font-semibold text-sm">{p.title}</h4>
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${levelColor[p.level]}`}>{p.level}</span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock size={12} /> {p.duration}</span>
                        <span className="flex items-center gap-1"><Zap size={12} /> {p.skills}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <a
                  href="#onboarding"
                  onClick={() => setSelected(null)}
                  className="mt-6 w-full gradient-btn text-primary-foreground py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                >
                  Start This Path <BarChart3 size={14} />
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default UserTypes;

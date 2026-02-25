import { motion } from "framer-motion";
import { Clock, BarChart3, Zap } from "lucide-react";

const paths = [
  { title: "Foundations of Computing", age: "Age 10+", duration: "8 weeks", level: "Beginner", skills: "Logic, Scratch, Basics" },
  { title: "Coding & Programming Basics", age: "All ages", duration: "10 weeks", level: "Beginner", skills: "Python, C, Problem Solving" },
  { title: "Pre-Engineering CS", age: "High School", duration: "12 weeks", level: "Intermediate", skills: "DSA, Math, Algorithms" },
  { title: "B.Tech CSE Core Subjects", age: "College", duration: "24 weeks", level: "Intermediate", skills: "OS, DBMS, CN, OOP" },
  { title: "Placement Preparation", age: "All levels", duration: "16 weeks", level: "Advanced", skills: "DSA, System Design, Aptitude" },
  { title: "AI & Machine Learning", age: "Intermediate+", duration: "20 weeks", level: "Advanced", skills: "ML, DL, NLP, CV" },
  { title: "Software Engineer Path", age: "Intermediate+", duration: "20 weeks", level: "Advanced", skills: "Full Stack, DevOps, Cloud" },
  { title: "Data Science & AI Engineer", age: "Intermediate+", duration: "24 weeks", level: "Expert", skills: "Stats, ML, MLOps, GenAI" },
];

const levelColor: Record<string, string> = {
  Beginner: "bg-accent/15 text-accent",
  Intermediate: "bg-primary/15 text-primary",
  Advanced: "bg-foreground/10 text-foreground",
  Expert: "bg-destructive/15 text-destructive",
};

const LearningPaths = () => (
  <section className="py-24 section-alt" id="learning-paths">
    <div className="container mx-auto px-6">
      <div className="text-center mb-14">
        <h2 className="font-display text-3xl sm:text-4xl italic mb-4">
          Structured <span className="text-accent">Learning Paths</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Follow a guided roadmap from fundamentals to career-ready expertise.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {paths.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="card-elevated rounded-xl p-6 card-hover group"
          >
            <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold mb-4 ${levelColor[p.level]}`}>
              {p.level}
            </span>
            <h3 className="font-semibold text-card-foreground mb-3 leading-snug">{p.title}</h3>
            <div className="space-y-2 text-xs text-muted-foreground mb-4">
              <div className="flex items-center gap-1.5"><Clock size={12} /> {p.duration}</div>
              <div className="flex items-center gap-1.5"><BarChart3 size={12} /> {p.age}</div>
              <div className="flex items-center gap-1.5"><Zap size={12} /> {p.skills}</div>
            </div>
            <span className="text-xs font-semibold text-primary group-hover:underline cursor-pointer">
              View Path →
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default LearningPaths;

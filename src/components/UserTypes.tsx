import { motion } from "framer-motion";
import {
  GraduationCap, Code, BookOpen, Laptop, Target, Brain, Briefcase,
} from "lucide-react";

const types = [
  { icon: GraduationCap, title: "School Students (Age 10+)", desc: "Fun intro to computing, logic & scratch coding." },
  { icon: BookOpen, title: "Beginners", desc: "Zero to basics in programming & CS fundamentals." },
  { icon: Code, title: "High School / Intermediate", desc: "Data structures, algorithms & competitive coding." },
  { icon: Laptop, title: "B.Tech CSE Students", desc: "Full university-level CS curriculum coverage." },
  { icon: Target, title: "Placement Aspirants", desc: "Crack product-based company interviews." },
  { icon: Brain, title: "AI / ML Career Seekers", desc: "Deep learning, NLP, computer vision & more." },
  { icon: Briefcase, title: "Professionals", desc: "Upskill with AI, system design & advanced topics." },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const UserTypes = () => (
  <section className="py-24 section-gradient" id="user-types">
    <div className="container mx-auto px-6">
      <div className="text-center mb-14">
        <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
          Built for <span className="gradient-text">Every Learner</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Whether you're 10 or 40 — find the perfect starting point for your CS journey.
        </p>
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {types.map((t) => (
          <motion.div
            key={t.title}
            variants={item}
            className="bg-card rounded-xl p-6 border border-border card-hover cursor-pointer group"
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
    </div>
  </section>
);

export default UserTypes;

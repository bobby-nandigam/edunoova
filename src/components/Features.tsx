import { motion } from "framer-motion";
import {
  FileText, Award, Bot, RefreshCw, HelpCircle, FolderKanban,
  TrendingUp, Gamepad2, Compass, Users,
} from "lucide-react";

const features = [
  { icon: FileText, title: "Structured Notes", desc: "Beginner to expert, all in one place." },
  { icon: Award, title: "Exam & Interview Prep", desc: "Targeted practice for placements." },
  { icon: Bot, title: "AI Mentor", desc: "Personalized help powered by AI." },
  { icon: RefreshCw, title: "Smart Revision", desc: "Spaced repetition for retention." },
  { icon: HelpCircle, title: "Practice Challenges", desc: "Coding problems & quizzes." },
  { icon: FolderKanban, title: "Real-World Projects", desc: "Build portfolio-worthy apps." },
  { icon: TrendingUp, title: "Progress Tracking", desc: "Visual dashboards & streaks." },
  { icon: Gamepad2, title: "Gamified Learning", desc: "Earn XP, badges & rewards." },
  { icon: Compass, title: "Career Guidance", desc: "Role-based roadmaps & tips." },
  { icon: Users, title: "Role-Based Paths", desc: "Custom tracks for every goal." },
];

const Features = () => (
  <section className="py-24 section-alt" id="features">
    <div className="container mx-auto px-6">
      <div className="text-center mb-14">
        <h2 className="font-display text-3xl sm:text-4xl italic mb-4">
          Platform <span className="text-accent">Features</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Everything you need to learn, practice, and grow — all in one place.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="card-elevated rounded-xl p-5 card-hover text-center"
          >
            <div className="icon-box mx-auto mb-3">
              <f.icon size={18} />
            </div>
            <h4 className="font-semibold text-sm text-card-foreground mb-1">{f.title}</h4>
            <p className="text-xs text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;

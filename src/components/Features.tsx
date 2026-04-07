import { motion } from "framer-motion";
import {
  FileText, Award, Bot, RefreshCw, HelpCircle, FolderKanban,
  TrendingUp, Gamepad2, Compass, Users, ArrowRight,
} from "lucide-react";

const features = [
  { icon: Bot, title: "AI Mentor", desc: "Get instant help, explanations, and personalized guidance from an AI tutor that understands your level.", highlight: true },
  { icon: FileText, title: "Structured Notes", desc: "Comprehensive, beginner-to-expert notes for every topic." },
  { icon: Award, title: "Exam & Interview Prep", desc: "Targeted practice for placements and tech interviews." },
  { icon: HelpCircle, title: "Practice Challenges", desc: "500+ coding problems, quizzes, and hands-on exercises." },
  { icon: FolderKanban, title: "Real-World Projects", desc: "Build portfolio-worthy applications and systems." },
  { icon: RefreshCw, title: "Smart Revision", desc: "Spaced repetition algorithms to maximize retention." },
  { icon: TrendingUp, title: "Progress Tracking", desc: "Detailed analytics, streaks, and visual dashboards." },
  { icon: Gamepad2, title: "Gamified Learning", desc: "Earn XP, unlock badges, and level up as you learn." },
  { icon: Compass, title: "Career Guidance", desc: "Role-based roadmaps and industry-specific tips." },
  { icon: Users, title: "Community", desc: "Connect with peers, discuss problems, and grow together." },
];

const Features = () => (
  <section className="py-24 section-gradient-alt" id="features">
    <div className="container mx-auto px-6">
      <div className="text-center mb-14">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">Powerful Tools</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Everything You Need to <span className="gradient-text">Succeed</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A complete toolkit designed for serious learners who want real results.
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Featured AI Mentor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary/10 via-card to-accent/5 rounded-2xl p-8 border border-primary/15 mb-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-14 h-14 rounded-2xl gradient-btn flex items-center justify-center text-primary-foreground shrink-0">
              <Bot size={26} />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-xl font-bold text-card-foreground mb-1">AI-Powered Mentor</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                Get instant, context-aware explanations, debug your code, and receive personalized study recommendations — available 24/7.
              </p>
            </div>
            <a href="#onboarding" className="gradient-btn px-5 py-2.5 rounded-xl text-sm font-semibold text-primary-foreground inline-flex items-center gap-2 shrink-0">
              Try it free <ArrowRight size={14} />
            </a>
          </div>
        </motion.div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.filter(f => !f.highlight).map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="bg-card rounded-xl p-5 border border-border hover:border-primary/15 hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 group-hover:bg-primary/15 flex items-center justify-center shrink-0 transition-colors">
                  <f.icon size={18} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-sm text-card-foreground mb-1">{f.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Features;

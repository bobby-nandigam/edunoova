import { motion } from "framer-motion";
import { UserCheck, Map, BookOpen, Dumbbell, TrendingUp, Trophy } from "lucide-react";

const steps = [
  { icon: UserCheck, title: "Sign Up & Set Goals", desc: "Tell us about your background, experience level, and career aspirations." },
  { icon: Map, title: "Get Your Roadmap", desc: "AI generates a personalized learning path tailored to your goals." },
  { icon: BookOpen, title: "Learn with Depth", desc: "Study from curated notes, videos, and interactive content." },
  { icon: Dumbbell, title: "Practice & Build", desc: "Solve problems, complete projects, and reinforce every concept." },
  { icon: TrendingUp, title: "Track & Improve", desc: "Monitor streaks, XP, and analytics to stay on track." },
  { icon: Trophy, title: "Achieve Your Goals", desc: "Land your dream role with interview prep and portfolio." },
];

const HowItWorks = () => (
  <section className="py-24 relative overflow-hidden" id="how-it-works">
    <div className="absolute inset-0 section-gradient-alt" />
    <div className="container mx-auto px-6 relative z-10">
      <div className="text-center mb-14">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">Simple Process</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Six steps from sign-up to career success.
          </p>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-accent/20 to-transparent hidden sm:block" />

        <div className="space-y-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex gap-5 items-start group"
            >
              <div className="relative z-10 w-12 h-12 rounded-2xl gradient-btn flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all">
                {i + 1}
              </div>
              <div className="bg-card rounded-xl p-5 border border-border flex-1 group-hover:border-primary/15 group-hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <s.icon size={18} className="text-primary" />
                  <h4 className="font-display font-semibold text-card-foreground">{s.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorks;

import { motion } from "framer-motion";
import { Zap, Brain, Target, Gamepad2, BarChart3, Shield } from "lucide-react";

const reasons = [
  { icon: Brain, title: "AI-Powered Learning", desc: "Personalized study plans that adapt to your pace and style." },
  { icon: Target, title: "Goal-Oriented Paths", desc: "Structured roadmaps from fundamentals to job-ready skills." },
  { icon: Gamepad2, title: "Gamified Experience", desc: "Earn XP, unlock badges, and compete on leaderboards." },
  { icon: Zap, title: "Hands-On Practice", desc: "Built-in compiler, quizzes, and real coding challenges." },
  { icon: BarChart3, title: "Track Progress", desc: "Visual dashboards, streaks, and completion analytics." },
  { icon: Shield, title: "Industry-Ready", desc: "Interview prep, system design, and placement-focused content." },
];

const WhyEdunova = () => (
  <section className="py-24 section-gradient" id="why-edunova">
    <div className="container mx-auto px-6">
      <div className="text-center mb-14">
        <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
          Why Choose <span className="gradient-text">Edunova</span>?
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Everything you need to go from curious beginner to confident professional.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {reasons.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="bg-card rounded-xl p-6 border border-border card-hover group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <r.icon size={22} className="text-primary" />
            </div>
            <h4 className="font-display font-semibold text-card-foreground mb-1.5">{r.title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyEdunova;

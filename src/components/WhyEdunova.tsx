import { motion } from "framer-motion";
import { Zap, Brain, Target, Gamepad2, BarChart3, Shield, ArrowRight } from "lucide-react";

const reasons = [
  { icon: Brain, title: "AI-Powered Learning", desc: "Personalized study plans that adapt to your pace, style, and goals using advanced AI.", accent: true },
  { icon: Target, title: "Goal-Oriented Paths", desc: "Structured roadmaps from fundamentals to job-ready skills." },
  { icon: Gamepad2, title: "Gamified Experience", desc: "Earn XP, unlock badges, and compete on leaderboards." },
  { icon: Zap, title: "Hands-On Practice", desc: "Built-in compiler, quizzes, and real coding challenges." },
  { icon: BarChart3, title: "Track Progress", desc: "Visual dashboards, streaks, and completion analytics." },
  { icon: Shield, title: "Industry-Ready", desc: "Real-world projects, system design, and skills employers demand." },
];

const WhyEdunova = () => (
  <section className="py-24 relative overflow-hidden" id="why-edunova">
    <div className="absolute inset-0 section-gradient" />
    <div className="container mx-auto px-6 relative z-10">
      <div className="text-center mb-14">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">Why Choose Us</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Why Choose <span className="gradient-text">Edunova</span>?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Everything you need to go from curious beginner to confident professional.
          </p>
        </motion.div>
      </div>

      {/* Bento grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {reasons.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className={`group rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 ${
              r.accent
                ? "bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20 sm:col-span-2 lg:col-span-1 lg:row-span-2 flex flex-col justify-between"
                : "bg-card border-border hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
            }`}
          >
            <div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                r.accent ? "gradient-btn text-primary-foreground" : "bg-primary/10 group-hover:bg-primary/15"
              }`}>
                <r.icon size={22} className={r.accent ? "" : "text-primary"} />
              </div>
              <h4 className="font-display font-semibold text-lg text-card-foreground mb-2">{r.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
            </div>
            {r.accent && (
              <a href="#learning-paths" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary mt-6 hover:gap-2.5 transition-all">
                Explore paths <ArrowRight size={14} />
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyEdunova;

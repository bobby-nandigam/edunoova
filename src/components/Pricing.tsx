import { motion } from "framer-motion";
import { Check, X, ArrowRight, Sparkles } from "lucide-react";

const free = ["Basic notes & intro topics", "Limited practice problems", "Community access", "Basic AI assistance"];
const premium = [
  "Complete curriculum (50+ subjects)", "Unlimited AI mentor access", "500+ coding challenges",
  "Placement & interview prep", "Real-world projects", "Personalized study plans",
  "Downloadable resources", "Priority community support",
];

const plans = [
  { name: "Monthly", price: "₹499", period: "/month", highlight: false, save: "" },
  { name: "Semester", price: "₹1,999", period: "/6 months", highlight: true, badge: "Best Value", save: "Save 33%" },
  { name: "Placement Master", price: "₹3,999", period: "/year", highlight: false, save: "Save 50%" },
];

const Pricing = () => (
  <section className="py-24 relative overflow-hidden" id="pricing">
    <div className="absolute inset-0 section-gradient" />
    <div className="container mx-auto px-6 relative z-10">
      <div className="text-center mb-14">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">Pricing</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Start Free, <span className="gradient-text">Upgrade Anytime</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            No hidden fees. Cancel anytime. Full access with Premium.
          </p>
        </motion.div>
      </div>

      {/* Comparison */}
      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-14">
        <div className="bg-card rounded-2xl p-7 border border-border">
          <h3 className="font-display font-bold text-lg mb-5 flex items-center gap-2">Free Plan</h3>
          <ul className="space-y-3">
            {free.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <Check size={15} className="text-accent shrink-0 mt-0.5" /> {f}
              </li>
            ))}
            {["Advanced topics", "Placement prep", "Unlimited AI"].map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground/40 line-through">
                <X size={15} className="shrink-0 mt-0.5" /> {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-card rounded-2xl p-7 border-2 border-primary relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-lg">RECOMMENDED</div>
          <h3 className="font-display font-bold text-lg mb-5 flex items-center gap-2">
            <Sparkles size={18} className="text-primary" /> Premium
          </h3>
          <ul className="space-y-3">
            {premium.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-card-foreground">
                <Check size={15} className="text-primary shrink-0 mt-0.5" /> {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Plans */}
      <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
        {plans.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={`rounded-2xl p-7 text-center transition-all duration-300 hover:-translate-y-1 ${
              p.highlight
                ? "bg-card border-2 border-primary shadow-lg shadow-primary/10 relative"
                : "bg-card border border-border hover:border-primary/20"
            }`}
          >
            {p.badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-bold gradient-btn text-primary-foreground">
                {p.badge}
              </span>
            )}
            <h4 className="font-display font-semibold mb-1 mt-2">{p.name}</h4>
            {p.save && <span className="text-[11px] text-accent font-semibold">{p.save}</span>}
            <div className="my-4">
              <span className="text-4xl font-bold">{p.price}</span>
              <span className="text-sm text-muted-foreground">{p.period}</span>
            </div>
            <a
              href="#onboarding"
              className={`block w-full py-3 rounded-xl text-sm font-semibold transition-all ${
                p.highlight
                  ? "gradient-btn text-primary-foreground hover:shadow-lg"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              Get Started
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Pricing;

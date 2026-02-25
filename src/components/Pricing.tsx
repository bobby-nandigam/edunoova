import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const free = ["Basic notes", "Intro topics", "Limited practice", "Beginner AI help", "Community access"];
const premium = [
  "Complete curriculum", "Advanced topics", "Full subject coverage",
  "Unlimited AI tutor", "Placement preparation", "Project-based learning",
  "Downloadable resources", "Personalized study plans",
];

const plans = [
  { name: "Monthly Plan", price: "₹499", period: "/month", highlight: false },
  { name: "Semester Plan", price: "₹1,999", period: "/6 months", highlight: true, badge: "Best Value" },
  { name: "Placement Master", price: "₹3,999", period: "/year", highlight: false },
];

const Pricing = () => (
  <section className="py-24 section-light" id="pricing">
    <div className="container mx-auto px-6">
      <div className="text-center mb-14">
        <h2 className="font-display text-3xl sm:text-4xl italic mb-4">
          Free vs <span className="text-accent">Premium</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Start free, upgrade when you're ready for the full experience.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
        <div className="card-elevated rounded-xl p-6">
          <h3 className="font-semibold text-lg mb-4">Free</h3>
          <ul className="space-y-3">
            {free.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check size={14} className="text-accent shrink-0" /> {f}
              </li>
            ))}
            {["Advanced topics", "Placement prep", "Unlimited AI"].map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground/40 line-through">
                <X size={14} className="shrink-0" /> {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="card-elevated rounded-xl p-6 border-2 border-primary">
          <h3 className="font-semibold text-lg mb-4 text-primary">Premium</h3>
          <ul className="space-y-3">
            {premium.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-card-foreground">
                <Check size={14} className="text-primary shrink-0" /> {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {plans.map((p) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`rounded-xl p-6 text-center card-hover ${
              p.highlight
                ? "card-elevated border-2 border-primary"
                : "card-elevated"
            }`}
          >
            {p.badge && (
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-primary text-primary-foreground mb-3">
                {p.badge}
              </span>
            )}
            <h4 className="font-semibold mb-2">{p.name}</h4>
            <div className="mb-4">
              <span className="text-3xl font-bold">{p.price}</span>
              <span className="text-sm text-muted-foreground">{p.period}</span>
            </div>
            <a
              href="#onboarding"
              className={`block w-full py-2.5 rounded-lg text-sm font-semibold transition-all ${
                p.highlight
                  ? "bg-primary text-primary-foreground hover:opacity-90"
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

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Priya Sharma", role: "B.Tech CSE, IIT Delhi", text: "Edunova transformed my placement prep. The structured DSA track helped me crack Google's interview.", rating: 5, avatar: "PS" },
  { name: "Arjun Mehta", role: "Software Developer", text: "I went from zero coding experience to building full apps in 4 months. The AI mentor is incredible!", rating: 5, avatar: "AM" },
  { name: "Sneha Reddy", role: "ML Engineer at Amazon", text: "The AI/ML track is genuinely world-class. Went from basics to deploying production models in 6 months.", rating: 5, avatar: "SR" },
  { name: "Rahul Verma", role: "Placed at Microsoft", text: "Got placed at Microsoft thanks to the interview prep module. The gamified quizzes kept me motivated!", rating: 5, avatar: "RV" },
];

const Testimonials = () => (
  <section className="py-24 section-gradient-alt" id="testimonials">
    <div className="container mx-auto px-6">
      <div className="text-center mb-14">
        <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
          Loved by <span className="gradient-text">Learners</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Join thousands who've accelerated their tech careers with Edunova.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bg-card rounded-xl p-6 border border-border card-hover"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full gradient-btn flex items-center justify-center text-primary-foreground text-sm font-bold">
                {t.avatar}
              </div>
              <div>
                <h4 className="font-display font-semibold text-sm">{t.name}</h4>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} size={14} className="fill-accent text-accent" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">"{t.text}"</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;

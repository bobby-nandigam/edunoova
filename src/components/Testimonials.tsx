import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Priya Sharma", role: "B.Tech CSE, IIT Delhi", text: "Edunova transformed my placement prep. The structured DSA track and gamified quizzes helped me crack Google's interview on my first attempt.", rating: 5, avatar: "PS", featured: true },
  { name: "Arjun Mehta", role: "Software Developer", text: "I went from zero coding experience to building full apps in 4 months. The AI mentor is incredible!", rating: 5, avatar: "AM" },
  { name: "Sneha Reddy", role: "ML Engineer at Amazon", text: "The AI/ML track is genuinely world-class. Went from basics to deploying production models in 6 months.", rating: 5, avatar: "SR" },
  { name: "Rahul Verma", role: "Placed at Microsoft", text: "Got placed at Microsoft thanks to the interview prep module. The gamified quizzes kept me motivated!", rating: 5, avatar: "RV" },
];

const Testimonials = () => {
  const featured = testimonials[0];
  const rest = testimonials.slice(1);

  return (
    <section className="py-24 section-gradient-alt" id="testimonials">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">Success Stories</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Loved by <span className="gradient-text">Learners</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Join thousands who've accelerated their tech careers with Edunova.
            </p>
          </motion.div>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Featured */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary/8 via-card to-accent/5 rounded-2xl p-8 border border-primary/15 mb-6 relative"
          >
            <Quote size={40} className="text-primary/10 absolute top-6 right-8" />
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-full gradient-btn flex items-center justify-center text-primary-foreground text-lg font-bold">
                {featured.avatar}
              </div>
              <div>
                <h4 className="font-display font-semibold text-lg">{featured.name}</h4>
                <p className="text-sm text-muted-foreground">{featured.role}</p>
              </div>
            </div>
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: featured.rating }).map((_, j) => (
                <Star key={j} size={16} className="fill-accent text-accent" />
              ))}
            </div>
            <p className="text-base text-card-foreground/80 leading-relaxed max-w-2xl">"{featured.text}"</p>
          </motion.div>

          {/* Rest */}
          <div className="grid sm:grid-cols-3 gap-5">
            {rest.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-xl p-6 border border-border hover:border-primary/15 transition-all duration-300"
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
                    <Star key={j} size={13} className="fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">"{t.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

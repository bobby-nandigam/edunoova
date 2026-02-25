import { motion } from "framer-motion";
import { UserCheck, Map, BookOpen, Dumbbell, TrendingUp, Trophy } from "lucide-react";

const steps = [
  { icon: UserCheck, title: "Choose Your Level", desc: "Tell us about your background and goals." },
  { icon: Map, title: "Get Personalized Roadmap", desc: "AI creates your custom learning plan." },
  { icon: BookOpen, title: "Learn with Structured Content", desc: "Study from curated notes and videos." },
  { icon: Dumbbell, title: "Practice & Revise", desc: "Solve problems and reinforce concepts." },
  { icon: TrendingUp, title: "Track Progress", desc: "See your growth with detailed analytics." },
  { icon: Trophy, title: "Achieve Career Goals", desc: "Land your dream role in tech." },
];

const HowItWorks = () => (
  <section className="py-24 section-alt" id="how-it-works">
    <div className="container mx-auto px-6">
      <div className="text-center mb-14">
        <h2 className="font-display text-3xl sm:text-4xl italic mb-4">
          How It <span className="text-accent">Works</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Six simple steps from sign-up to career success.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="relative flex gap-4"
          >
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg shrink-0">
                {i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className="w-px h-full bg-border mt-2 hidden sm:block" />
              )}
            </div>
            <div className="pb-8">
              <h4 className="font-semibold mb-1">{s.title}</h4>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;

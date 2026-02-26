import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const FinalCTA = () => (
  <section className="py-24 gradient-hero relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[150px]" />
    <div className="container mx-auto px-6 text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 max-w-3xl mx-auto leading-tight">
          Start Your Journey to Becoming a Software or{" "}
          <span className="gradient-text">AI Engineer</span> Today.
        </h2>
        <p className="text-primary-foreground/60 max-w-lg mx-auto mb-8">
          Join thousands of learners building their dream careers in tech.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#onboarding"
            className="gradient-btn inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground shadow-lg hover:shadow-xl transition-all"
          >
            Start Free <ArrowRight size={16} />
          </a>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground/80 border border-primary-foreground/20 hover:bg-primary-foreground/5 transition-all"
          >
            View Premium Plans
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

export default FinalCTA;

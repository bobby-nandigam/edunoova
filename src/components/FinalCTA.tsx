import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const FinalCTA = () => (
  <section className="py-24 hero-section relative overflow-hidden">
    <div className="container mx-auto px-6 text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl italic text-primary-foreground mb-6 max-w-3xl mx-auto leading-tight">
          Start Your Journey to Becoming a Software or{" "}
          <span className="text-accent">AI Engineer</span> Today.
        </h2>
        <p className="text-primary-foreground/50 max-w-lg mx-auto mb-8">
          Join thousands of learners building their dream careers in tech.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#onboarding"
            className="bg-accent text-accent-foreground inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Start Free <ArrowRight size={16} />
          </a>
          <a
            href="#pricing"
            className="btn-outline inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold"
          >
            View Premium Plans
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

export default FinalCTA;

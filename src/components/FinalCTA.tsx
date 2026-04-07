import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const FinalCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-28 gradient-hero relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/8 blur-[180px]" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[150px]" />
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/15 text-primary border border-primary/20 mb-6">
            <Sparkles size={14} /> Join 10,000+ Learners
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 max-w-3xl mx-auto leading-tight">
            Ready to Start Your Journey in{" "}
            <span className="gradient-text">Tech</span>?
          </h2>
          <p className="text-primary-foreground/50 max-w-lg mx-auto mb-10 leading-relaxed">
            From your first line of code to mastering AI — Edunova is with you every step of the way.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate("/auth")}
              className="gradient-btn inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-primary-foreground shadow-lg hover:shadow-xl transition-all"
            >
              Start Learning Free <ArrowRight size={16} />
            </button>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-primary-foreground/70 border border-primary-foreground/15 hover:bg-primary-foreground/5 transition-all"
            >
              View Premium Plans
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;

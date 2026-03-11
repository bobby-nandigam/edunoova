import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Clock, BookOpen, Code2, ChevronRight, Layers } from "lucide-react";
import { userTypes } from "@/data/learningData";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const UserTypes = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 section-gradient" id="user-types">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Built for <span className="gradient-text">Every Learner</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Whether you're a beginner or a professional — find the perfect starting point for your journey.
          </p>
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {userTypes.map((t) => (
            <motion.div
              key={t.title}
              variants={item}
              className="bg-card rounded-xl p-6 border border-border card-hover cursor-pointer group"
              onClick={() => navigate(`/paths/${t.slug}`)}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-lg gradient-btn flex items-center justify-center text-primary-foreground shrink-0">
                  <t.icon size={20} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-card-foreground">{t.title}</h3>
                  <span className="text-[11px] text-muted-foreground">{t.stats.paths} paths · {t.stats.hours}+ hours</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{t.longDesc}</p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {t.idealFor.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground pt-3 border-t border-border">
                <span className="flex items-center gap-1"><Layers size={12} /> {t.stats.paths} Paths</span>
                <span className="flex items-center gap-1"><Code2 size={12} /> {t.stats.projects}+ Projects</span>
                <span className="ml-auto text-primary font-semibold group-hover:underline flex items-center gap-0.5">
                  Explore <ChevronRight size={12} />
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default UserTypes;

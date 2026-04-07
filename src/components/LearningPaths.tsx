import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Clock, BookOpen, Zap, ChevronRight, ArrowRight, Layers, Target } from "lucide-react";
import { userTypes } from "@/data/learningData";

const paths = userTypes.flatMap((ut) =>
  ut.paths.map((p) => ({ ...p, parentSlug: ut.slug, parentTitle: ut.title }))
);

const levelColor: Record<string, string> = {
  Beginner: "bg-accent/15 text-accent",
  Intermediate: "bg-primary/15 text-primary",
  Advanced: "bg-[hsl(260,70%,55%)]/15 text-[hsl(260,70%,55%)]",
  Expert: "bg-destructive/15 text-destructive",
};

const LearningPaths = () => {
  const navigate = useNavigate();
  const featured = paths[0];
  const rest = paths.slice(1, 7);

  return (
    <section className="py-24 section-gradient-alt" id="learning-paths">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">Curated Roadmaps</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Structured <span className="gradient-text">Learning Paths</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Follow a guided roadmap from fundamentals to career-ready expertise.
            </p>
          </motion.div>
        </div>

        {/* Featured path */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onClick={() => navigate(`/paths/${featured.parentSlug}`)}
          className="bg-gradient-to-br from-primary/10 via-card to-accent/5 rounded-2xl p-8 border border-primary/15 cursor-pointer group mb-8 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-3 py-1 rounded-full text-[11px] font-semibold ${levelColor[featured.level]}`}>
                  {featured.level}
                </span>
                <span className="text-[11px] text-muted-foreground font-medium bg-muted px-2.5 py-1 rounded-full">Most Popular</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-card-foreground mb-2">{featured.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 max-w-2xl leading-relaxed">{featured.description}</p>
              <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><Clock size={13} /> {featured.duration}</span>
                <span className="flex items-center gap-1.5"><BookOpen size={13} /> {featured.totalLessons} lessons</span>
                <span className="flex items-center gap-1.5"><Layers size={13} /> {featured.modules.length} modules</span>
                <span className="flex items-center gap-1.5"><Target size={13} /> {featured.totalExercises} exercises</span>
              </div>
            </div>
            <button className="gradient-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-primary-foreground shrink-0 group-hover:shadow-lg transition-all">
              Start This Path <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>

        {/* Rest */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => navigate(`/paths/${p.parentSlug}`)}
              className="bg-card rounded-2xl p-6 border border-border hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            >
              <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold mb-4 ${levelColor[p.level]}`}>
                {p.level}
              </span>
              <h3 className="font-display font-semibold text-card-foreground mb-2 leading-snug">{p.title}</h3>
              <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{p.description}</p>
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1"><Clock size={12} /> {p.duration}</span>
                <span className="flex items-center gap-1"><BookOpen size={12} /> {p.totalLessons} lessons</span>
              </div>
              <span className="text-xs font-semibold text-primary group-hover:gap-2 flex items-center gap-1 transition-all">
                View Path <ChevronRight size={12} />
              </span>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => navigate("/topics")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            View All Learning Paths <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default LearningPaths;

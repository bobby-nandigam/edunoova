import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Clock, BarChart3, Zap, BookOpen, Code2, ChevronRight } from "lucide-react";
import { userTypes } from "@/data/learningData";

// Flatten all paths from all user types
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

  return (
    <section className="py-24 section-gradient-alt" id="learning-paths">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Structured <span className="gradient-text">Learning Paths</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Follow a guided roadmap from fundamentals to career-ready expertise.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {paths.slice(0, 8).map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl p-6 border border-border card-hover group cursor-pointer"
              onClick={() => navigate(`/paths/${p.parentSlug}`)}
            >
              <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold mb-4 ${levelColor[p.level]}`}>
                {p.level}
              </span>
              <h3 className="font-display font-semibold text-card-foreground mb-2 leading-snug">{p.title}</h3>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{p.description}</p>
              <div className="space-y-1.5 text-xs text-muted-foreground mb-4">
                <div className="flex items-center gap-1.5"><Clock size={12} /> {p.duration}</div>
                <div className="flex items-center gap-1.5"><BookOpen size={12} /> {p.totalLessons} lessons</div>
                <div className="flex items-center gap-1.5"><Zap size={12} /> {p.skills}</div>
              </div>
              <span className="text-xs font-semibold text-primary group-hover:underline flex items-center gap-0.5">
                View Path <ChevronRight size={12} />
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningPaths;

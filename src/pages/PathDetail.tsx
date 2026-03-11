import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Clock, Zap, CheckCircle2, BookOpen, Code2,
  ChevronDown, ChevronRight, Users, Award, BarChart3,
  GraduationCap, Target, Layers, Play,
} from "lucide-react";
import { userTypes } from "@/data/learningData";
import type { LearningPath, PathModule } from "@/data/learningData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Progress } from "@/components/ui/progress";

const levelColor: Record<string, string> = {
  Beginner: "bg-accent/15 text-accent border-accent/20",
  Intermediate: "bg-primary/15 text-primary border-primary/20",
  Advanced: "bg-[hsl(260,70%,55%)]/15 text-[hsl(260,70%,55%)] border-[hsl(260,70%,55%)]/20",
  Expert: "bg-destructive/15 text-destructive border-destructive/20",
};

const levelIcon: Record<string, typeof BarChart3> = {
  Beginner: BookOpen,
  Intermediate: Code2,
  Advanced: Target,
  Expert: Award,
};

const ModuleAccordion = ({ module, index }: { module: PathModule; index: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="border border-border rounded-xl overflow-hidden bg-card"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-5 text-left hover:bg-muted/50 transition-colors"
      >
        <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-display font-semibold text-sm text-card-foreground">{module.title}</h4>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">{module.description}</p>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-xs text-muted-foreground shrink-0">
          <span className="flex items-center gap-1"><BookOpen size={12} /> {module.lessons}</span>
          <span className="flex items-center gap-1"><Code2 size={12} /> {module.exercises}</span>
          <span className="flex items-center gap-1"><Clock size={12} /> {module.duration}</span>
        </div>
        <ChevronDown size={16} className={`text-muted-foreground transition-transform shrink-0 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0">
              <div className="flex sm:hidden items-center gap-4 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1"><BookOpen size={12} /> {module.lessons} lessons</span>
                <span className="flex items-center gap-1"><Code2 size={12} /> {module.exercises} exercises</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {module.duration}</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-1.5">
                {module.topics.map((topic) => (
                  <div key={topic} className="flex items-center gap-2 text-sm text-muted-foreground py-1">
                    <ChevronRight size={12} className="text-primary shrink-0" />
                    {topic}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const PathCard = ({ path, pathIndex }: { path: LearningPath; pathIndex: number }) => {
  const [expanded, setExpanded] = useState(pathIndex === 0);
  const LevelIcon = levelIcon[path.level] || BarChart3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: pathIndex * 0.15 }}
      className="rounded-2xl border border-border overflow-hidden bg-card"
    >
      {/* Path Header */}
      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-btn flex items-center justify-center text-primary-foreground shrink-0">
              <LevelIcon size={18} />
            </div>
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-card-foreground">{path.title}</h2>
              <div className="flex flex-wrap items-center gap-3 mt-1">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${levelColor[path.level]}`}>{path.level}</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock size={12} /> {path.duration}</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Zap size={12} /> {path.skills}</span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mt-3">{path.description}</p>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          {[
            { label: "Lessons", value: path.totalLessons, icon: BookOpen },
            { label: "Exercises", value: path.totalExercises, icon: Code2 },
            { label: "Modules", value: path.modules.length, icon: Layers },
            { label: "Duration", value: path.duration, icon: Clock },
          ].map((stat) => (
            <div key={stat.label} className="bg-muted/50 rounded-xl p-3 text-center">
              <stat.icon size={16} className="mx-auto text-primary mb-1" />
              <div className="font-display font-bold text-card-foreground text-sm">{stat.value}</div>
              <div className="text-[11px] text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-6 text-sm font-semibold text-primary hover:underline flex items-center gap-1"
        >
          {expanded ? "Hide Details" : "View Full Curriculum"}
          <ChevronDown size={14} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 sm:px-8 pb-8 space-y-8">
              {/* Prerequisites */}
              <div>
                <h3 className="font-display font-semibold text-sm mb-3 flex items-center gap-2 text-card-foreground">
                  <GraduationCap size={16} className="text-primary" /> Prerequisites
                </h3>
                <div className="space-y-1.5">
                  {path.prerequisites.map((p) => (
                    <div key={p} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
                      {p}
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Outcomes */}
              <div>
                <h3 className="font-display font-semibold text-sm mb-3 flex items-center gap-2 text-card-foreground">
                  <Target size={16} className="text-accent" /> What You'll Achieve
                </h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {path.outcomes.map((o) => (
                    <div key={o} className="flex items-start gap-2 text-sm text-muted-foreground py-1">
                      <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                      {o}
                    </div>
                  ))}
                </div>
              </div>

              {/* Modules */}
              <div>
                <h3 className="font-display font-semibold text-sm mb-3 flex items-center gap-2 text-card-foreground">
                  <Layers size={16} className="text-primary" /> Curriculum — {path.modules.length} Modules
                </h3>
                <div className="space-y-2">
                  {path.modules.map((mod, i) => (
                    <ModuleAccordion key={mod.title} module={mod} index={i} />
                  ))}
                </div>
              </div>

              {/* Start Button */}
              <div className="pt-2">
                <a
                  href="/#onboarding"
                  className="gradient-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-primary-foreground shadow-lg hover:shadow-xl transition-all"
                >
                  <Play size={16} /> Start This Path
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const PathDetail = () => {
  const { slug } = useParams();
  const userType = userTypes.find((t) => t.slug === slug);

  if (!userType) {
    return (
      <main>
        <Navbar />
        <section className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold mb-4">Path not found</h1>
            <Link to="/" className="text-primary hover:underline">← Back to Home</Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  const Icon = userType.icon;
  const totalLessons = userType.paths.reduce((s, p) => s + p.totalLessons, 0);
  const totalExercises = userType.paths.reduce((s, p) => s + p.totalExercises, 0);

  return (
    <main>
      <Navbar />
      <section className="min-h-screen pt-24 pb-16 section-gradient">
        <div className="container mx-auto px-6 max-w-5xl">
          <Link to="/#user-types" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft size={16} /> Back to All Paths
          </Link>

          {/* Hero Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <div className="bg-card rounded-2xl border border-border p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="w-14 h-14 rounded-2xl gradient-btn flex items-center justify-center text-primary-foreground shrink-0">
                  <Icon size={26} />
                </div>
                <div className="flex-1">
                  <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-card-foreground">{userType.title}</h1>
                  <p className="text-muted-foreground mt-2 leading-relaxed max-w-2xl">{userType.longDesc}</p>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                    {[
                      { label: "Learning Paths", value: userType.stats.paths, icon: Layers },
                      { label: "Total Hours", value: `${userType.stats.hours}+`, icon: Clock },
                      { label: "Lessons", value: totalLessons, icon: BookOpen },
                      { label: "Projects", value: `${userType.stats.projects}+`, icon: Code2 },
                    ].map((s) => (
                      <div key={s.label} className="bg-muted/50 rounded-xl p-3.5 text-center">
                        <s.icon size={18} className="mx-auto text-primary mb-1.5" />
                        <div className="font-display font-bold text-lg text-card-foreground">{s.value}</div>
                        <div className="text-[11px] text-muted-foreground">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Ideal For */}
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="font-display font-semibold text-sm mb-3 flex items-center gap-2 text-card-foreground">
                  <Users size={16} className="text-accent" /> Ideal For
                </h3>
                <div className="flex flex-wrap gap-2">
                  {userType.idealFor.map((item) => (
                    <span key={item} className="text-xs bg-accent/10 text-accent px-3 py-1.5 rounded-full font-medium">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Path Cards */}
          <div className="space-y-6">
            <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
              <BarChart3 size={20} className="text-primary" /> Learning Paths ({userType.paths.length})
            </h2>
            {userType.paths.map((path, i) => (
              <PathCard key={path.title} path={path} pathIndex={i} />
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-12 text-center">
            <div className="bg-card rounded-2xl border border-border p-8">
              <h3 className="font-display text-xl font-bold mb-2 text-card-foreground">Ready to Start?</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                Join thousands of learners on the {userType.title} track. Create your personalized learning plan in 2 minutes.
              </p>
              <a
                href="/#onboarding"
                className="gradient-btn inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground shadow-lg hover:shadow-xl transition-all"
              >
                <Play size={16} /> Get Started Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default PathDetail;

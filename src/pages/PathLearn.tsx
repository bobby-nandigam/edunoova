import { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ChevronLeft, ChevronRight, CheckCircle2, Circle,
  BookOpen, Code2, Clock, Layers, Play, Lock, Trophy,
  Lightbulb, Target, Rocket,
} from "lucide-react";
import { userTypes } from "@/data/learningData";
import type { PathModule } from "@/data/learningData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Progress } from "@/components/ui/progress";

/* ─── Topic content card ─── */
const TopicCard = ({
  topic,
  index,
  isActive,
  isCompleted,
  onSelect,
}: {
  topic: string;
  index: number;
  isActive: boolean;
  isCompleted: boolean;
  onSelect: () => void;
}) => (
  <button
    onClick={onSelect}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-all ${
      isActive
        ? "bg-primary/10 text-primary font-semibold border border-primary/20"
        : isCompleted
        ? "text-muted-foreground hover:bg-muted/50"
        : "text-card-foreground hover:bg-muted/50"
    }`}
  >
    {isCompleted ? (
      <CheckCircle2 size={16} className="text-accent shrink-0" />
    ) : isActive ? (
      <Play size={14} className="text-primary shrink-0" />
    ) : (
      <Circle size={14} className="text-muted-foreground/40 shrink-0" />
    )}
    <span className="truncate">{topic}</span>
  </button>
);

/* ─── Module sidebar section ─── */
const ModuleSection = ({
  module,
  moduleIndex,
  activeModule,
  activeTopic,
  completedTopics,
  onSelectTopic,
}: {
  module: PathModule;
  moduleIndex: number;
  activeModule: number;
  activeTopic: number;
  completedTopics: Set<string>;
  onSelectTopic: (mod: number, topic: number) => void;
}) => {
  const isActiveModule = moduleIndex === activeModule;
  const completedCount = module.topics.filter((_, i) =>
    completedTopics.has(`${moduleIndex}-${i}`)
  ).length;
  const allDone = completedCount === module.topics.length;

  return (
    <div className="mb-1">
      <div
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider ${
          isActiveModule
            ? "text-primary bg-primary/5"
            : allDone
            ? "text-accent"
            : "text-muted-foreground"
        }`}
      >
        {allDone ? (
          <Trophy size={14} className="text-accent" />
        ) : (
          <Layers size={14} />
        )}
        <span className="truncate flex-1">
          Module {moduleIndex + 1}: {module.title}
        </span>
        <span className="text-[10px] font-normal">
          {completedCount}/{module.topics.length}
        </span>
      </div>
      {isActiveModule && (
        <div className="ml-1 mt-1 space-y-0.5">
          {module.topics.map((topic, tIdx) => (
            <TopicCard
              key={`${moduleIndex}-${tIdx}`}
              topic={topic}
              index={tIdx}
              isActive={moduleIndex === activeModule && tIdx === activeTopic}
              isCompleted={completedTopics.has(`${moduleIndex}-${tIdx}`)}
              onSelect={() => onSelectTopic(moduleIndex, tIdx)}
            />
          ))}
        </div>
      )}
      {!isActiveModule && (
        <button
          onClick={() => onSelectTopic(moduleIndex, 0)}
          className="ml-1 mt-1 text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 px-3 py-1"
        >
          {allDone ? "Review module" : "Jump to module"} →
        </button>
      )}
    </div>
  );
};

/* ─── Main learning content ─── */
const LearningContent = ({
  topicName,
  moduleName,
  moduleIndex,
  topicIndex,
  totalTopicsInModule,
}: {
  topicName: string;
  moduleName: string;
  moduleIndex: number;
  topicIndex: number;
  totalTopicsInModule: number;
}) => (
  <motion.div
    key={`${moduleIndex}-${topicIndex}`}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.25 }}
    className="space-y-6"
  >
    {/* Topic header */}
    <div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
        <Layers size={12} />
        Module {moduleIndex + 1} · Topic {topicIndex + 1} of {totalTopicsInModule}
      </div>
      <h2 className="font-display text-2xl sm:text-3xl font-bold text-card-foreground">
        {topicName}
      </h2>
      <p className="text-muted-foreground mt-1 text-sm">
        Part of <span className="font-medium text-foreground">{moduleName}</span>
      </p>
    </div>

    {/* Theory section */}
    <div className="bg-card border border-border rounded-xl p-5 sm:p-6">
      <h3 className="font-display font-semibold text-base flex items-center gap-2 mb-3 text-card-foreground">
        <BookOpen size={18} className="text-primary" /> Theory & Concepts
      </h3>
      <div className="prose prose-sm text-muted-foreground max-w-none leading-relaxed">
        <p>
          {topicName} is a fundamental concept that every developer should master.
          Understanding this topic will help you build efficient, scalable, and maintainable software.
        </p>
        <p className="mt-3">
          This topic covers the core principles, common patterns, and real-world
          applications. As you progress, you'll see how it connects with other
          modules in this learning path.
        </p>
      </div>
    </div>

    {/* Key points */}
    <div className="bg-card border border-border rounded-xl p-5 sm:p-6">
      <h3 className="font-display font-semibold text-base flex items-center gap-2 mb-3 text-card-foreground">
        <Target size={18} className="text-accent" /> Key Takeaways
      </h3>
      <div className="grid sm:grid-cols-2 gap-2">
        {[
          `Understand the fundamentals of ${topicName}`,
          "Apply concepts through hands-on exercises",
          "Connect theory to real-world scenarios",
          "Build problem-solving intuition",
        ].map((point) => (
          <div
            key={point}
            className="flex items-start gap-2 text-sm text-muted-foreground"
          >
            <CheckCircle2
              size={14}
              className="text-accent shrink-0 mt-0.5"
            />
            {point}
          </div>
        ))}
      </div>
    </div>

    {/* Practice prompt */}
    <div className="bg-primary/5 border border-primary/15 rounded-xl p-5 sm:p-6">
      <h3 className="font-display font-semibold text-base flex items-center gap-2 mb-2 text-card-foreground">
        <Lightbulb size={18} className="text-primary" /> Practice Exercise
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Put your knowledge to the test! Try implementing a solution that
        demonstrates your understanding of {topicName}.
      </p>
      <Link
        to="/compiler"
        className="gradient-btn inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-primary-foreground shadow hover:shadow-lg transition-all"
      >
        <Code2 size={14} /> Open Compiler
      </Link>
    </div>
  </motion.div>
);

/* ─── Page ─── */
const PathLearn = () => {
  const { slug, pathIndex: pathIdxParam } = useParams();
  const navigate = useNavigate();
  const pathIdx = Number(pathIdxParam || 0);

  const userType = userTypes.find((t) => t.slug === slug);
  const path = userType?.paths[pathIdx];

  const [activeModule, setActiveModule] = useState(0);
  const [activeTopic, setActiveTopic] = useState(0);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());

  const totalTopics = useMemo(
    () => path?.modules.reduce((s, m) => s + m.topics.length, 0) ?? 0,
    [path]
  );

  const progress = totalTopics > 0
    ? Math.round((completedTopics.size / totalTopics) * 100)
    : 0;

  if (!userType || !path) {
    return (
      <main>
        <Navbar />
        <section className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold mb-4">
              Path not found
            </h1>
            <Link to="/" className="text-primary hover:underline">
              ← Back to Home
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  const currentModule = path.modules[activeModule];
  const currentTopic = currentModule?.topics[activeTopic] ?? "";

  const handleSelectTopic = (mod: number, topic: number) => {
    setActiveModule(mod);
    setActiveTopic(topic);
  };

  const handleMarkComplete = () => {
    const key = `${activeModule}-${activeTopic}`;
    setCompletedTopics((prev) => new Set(prev).add(key));
    // Auto-advance
    if (activeTopic < currentModule.topics.length - 1) {
      setActiveTopic(activeTopic + 1);
    } else if (activeModule < path.modules.length - 1) {
      setActiveModule(activeModule + 1);
      setActiveTopic(0);
    }
  };

  const handlePrev = () => {
    if (activeTopic > 0) {
      setActiveTopic(activeTopic - 1);
    } else if (activeModule > 0) {
      const prevMod = path.modules[activeModule - 1];
      setActiveModule(activeModule - 1);
      setActiveTopic(prevMod.topics.length - 1);
    }
  };

  const handleNext = () => {
    if (activeTopic < currentModule.topics.length - 1) {
      setActiveTopic(activeTopic + 1);
    } else if (activeModule < path.modules.length - 1) {
      setActiveModule(activeModule + 1);
      setActiveTopic(0);
    }
  };

  const isFirst = activeModule === 0 && activeTopic === 0;
  const isLast =
    activeModule === path.modules.length - 1 &&
    activeTopic === currentModule.topics.length - 1;
  const isCurrentCompleted = completedTopics.has(`${activeModule}-${activeTopic}`);

  return (
    <main>
      <Navbar />
      <section className="min-h-screen pt-20 pb-8 section-gradient">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          {/* Top bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <Link
                to={`/paths/${slug}`}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft size={16} /> Back
              </Link>
              <div className="h-4 w-px bg-border" />
              <h1 className="font-display text-base sm:text-lg font-bold text-foreground truncate">
                {path.title}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground font-medium">
                {progress}% complete
              </span>
              <Progress value={progress} className="w-32 h-2" />
              <span className="text-xs text-muted-foreground">
                {completedTopics.size}/{totalTopics}
              </span>
            </div>
          </div>

          {/* Main layout */}
          <div className="flex gap-5">
            {/* Sidebar — desktop only */}
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-24 bg-card border border-border rounded-xl p-3 max-h-[calc(100vh-7rem)] overflow-y-auto">
                <div className="flex items-center gap-2 px-2 pb-3 border-b border-border mb-3">
                  <Rocket size={16} className="text-primary" />
                  <span className="font-display font-bold text-sm text-card-foreground truncate">
                    {path.title}
                  </span>
                </div>
                {path.modules.map((mod, mIdx) => (
                  <ModuleSection
                    key={mod.title}
                    module={mod}
                    moduleIndex={mIdx}
                    activeModule={activeModule}
                    activeTopic={activeTopic}
                    completedTopics={completedTopics}
                    onSelectTopic={handleSelectTopic}
                  />
                ))}
              </div>
            </aside>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Mobile module/topic selector */}
              <div className="lg:hidden mb-4">
                <div className="bg-card border border-border rounded-xl p-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-2">
                    <Layers size={12} />
                    Module {activeModule + 1} of {path.modules.length}
                  </div>
                  <select
                    value={`${activeModule}-${activeTopic}`}
                    onChange={(e) => {
                      const [m, t] = e.target.value.split("-").map(Number);
                      handleSelectTopic(m, t);
                    }}
                    className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-sm text-foreground"
                  >
                    {path.modules.map((mod, mIdx) =>
                      mod.topics.map((topic, tIdx) => (
                        <option key={`${mIdx}-${tIdx}`} value={`${mIdx}-${tIdx}`}>
                          M{mIdx + 1}: {topic}
                        </option>
                      ))
                    )}
                  </select>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <LearningContent
                  topicName={currentTopic}
                  moduleName={currentModule.title}
                  moduleIndex={activeModule}
                  topicIndex={activeTopic}
                  totalTopicsInModule={currentModule.topics.length}
                />
              </AnimatePresence>

              {/* Bottom nav */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                <button
                  onClick={handlePrev}
                  disabled={isFirst}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border border-border bg-card text-card-foreground hover:bg-muted/50 transition-colors disabled:opacity-30 disabled:pointer-events-none"
                >
                  <ChevronLeft size={16} /> Previous
                </button>

                {!isCurrentCompleted ? (
                  <button
                    onClick={handleMarkComplete}
                    className="gradient-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-primary-foreground shadow hover:shadow-lg transition-all"
                  >
                    <CheckCircle2 size={16} /> Mark Complete & Continue
                  </button>
                ) : (
                  <span className="text-xs text-accent flex items-center gap-1 font-medium">
                    <CheckCircle2 size={14} /> Completed
                  </span>
                )}

                <button
                  onClick={handleNext}
                  disabled={isLast}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border border-border bg-card text-card-foreground hover:bg-muted/50 transition-colors disabled:opacity-30 disabled:pointer-events-none"
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>

              {/* Completion banner */}
              {progress === 100 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 bg-accent/10 border border-accent/20 rounded-xl p-6 text-center"
                >
                  <Trophy size={32} className="mx-auto text-accent mb-2" />
                  <h3 className="font-display text-lg font-bold text-card-foreground">
                    🎉 Path Completed!
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    You've finished all modules in "{path.title}". Amazing work!
                  </p>
                  <Link
                    to={`/paths/${slug}`}
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                  >
                    Explore more paths →
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default PathLearn;

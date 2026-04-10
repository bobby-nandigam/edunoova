import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, Circle, Layers, Code2, Lightbulb, TrendingUp, ChevronDown, ChevronRight, BookOpen, Clock } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getTopicById } from "@/data/systemDesignData";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const SystemDesignDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const topic = getTopicById(id || "");
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  if (!topic) {
    return (
      <main>
        <Navbar />
        <div className="pt-32 pb-20 min-h-screen section-gradient flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Topic not found</h1>
            <button onClick={() => navigate("/system-design")} className="text-primary font-semibold">← Back to System Design</button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const toggleComplete = (stepId: string) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      next.has(stepId) ? next.delete(stepId) : next.add(stepId);
      return next;
    });
  };

  const toggleExpand = (stepId: string) => {
    setExpandedStep((prev) => (prev === stepId ? null : stepId));
  };

  const hasHLD = !!topic.hld;
  const hasLLD = !!topic.lld;
  const defaultTab = hasHLD ? "hld" : "lld";

  const allSteps = [
    ...(topic.hld?.steps.map(s => s.title) || []),
    ...(topic.lld?.steps.map(s => s.title) || []),
  ];
  const totalSteps = allSteps.length;
  const completedCount = completedSteps.size;
  const progress = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

  const levelColor: Record<string, string> = {
    Easy: "text-green-500 bg-green-500/10",
    Medium: "text-yellow-500 bg-yellow-500/10",
    Hard: "text-red-500 bg-red-500/10",
  };

  const renderSteps = (steps: typeof topic.hld extends undefined ? never : NonNullable<typeof topic.hld>["steps"], prefix: string) => (
    <div className="space-y-3">
      {steps.map((step, i) => {
        const stepId = `${prefix}-${i}`;
        const isCompleted = completedSteps.has(stepId);
        const isExpanded = expandedStep === stepId;

        return (
          <motion.div
            key={stepId}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`rounded-xl border transition-colors ${isCompleted ? "border-green-500/30 bg-green-500/5" : "border-border bg-card"}`}
          >
            <div
              className="flex items-start gap-3 p-4 cursor-pointer"
              onClick={() => toggleExpand(stepId)}
            >
              <button
                onClick={(e) => { e.stopPropagation(); toggleComplete(stepId); }}
                className="mt-0.5 shrink-0"
              >
                {isCompleted ? (
                  <CheckCircle2 size={20} className="text-green-500" />
                ) : (
                  <Circle size={20} className="text-muted-foreground/40" />
                )}
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className={`font-display font-semibold text-sm ${isCompleted ? "text-green-600 dark:text-green-400 line-through" : "text-card-foreground"}`}>
                    {step.title}
                  </h4>
                  {isExpanded ? <ChevronDown size={16} className="text-muted-foreground" /> : <ChevronRight size={16} className="text-muted-foreground" />}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
              </div>
            </div>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 pl-12">
                    <ul className="space-y-2">
                      {step.details.map((detail, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <span className="text-primary mt-0.5 shrink-0">▸</span>
                          <span className="font-mono leading-relaxed">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );

  return (
    <main>
      <Navbar />
      <div className="pt-28 pb-20 min-h-screen section-gradient">
        <div className="container mx-auto px-6">
          {/* Breadcrumb */}
          <button
            onClick={() => navigate("/system-design")}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft size={14} /> Back to System Design
          </button>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">{topic.title}</h1>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${levelColor[topic.difficulty]}`}>{topic.difficulty}</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary">{topic.type}</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-2xl mb-4">{topic.overview}</p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Clock size={12} /> {topic.estimatedTime}</span>
              <span className="flex items-center gap-1"><BookOpen size={12} /> {totalSteps} steps</span>
            </div>
          </motion.div>

          {/* Progress bar */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-8">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-foreground">Progress</span>
              <span className="text-muted-foreground">{completedCount}/{totalSteps} steps • {progress}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
              <motion.div
                className="h-full rounded-full gradient-btn"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Requirements */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-card rounded-xl border border-border p-5 mb-6">
                <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                  <BookOpen size={16} className="text-primary" /> Functional Requirements
                </h3>
                <ul className="space-y-1.5">
                  {topic.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 size={14} className="text-primary mt-0.5 shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* HLD / LLD Tabs */}
              <Tabs defaultValue={defaultTab}>
                <TabsList className="mb-4">
                  {hasHLD && <TabsTrigger value="hld" className="gap-1.5"><Layers size={14} /> HLD</TabsTrigger>}
                  {hasLLD && <TabsTrigger value="lld" className="gap-1.5"><Code2 size={14} /> LLD</TabsTrigger>}
                </TabsList>

                {hasHLD && (
                  <TabsContent value="hld">
                    {/* Architecture Components */}
                    <div className="bg-card rounded-xl border border-border p-5 mb-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Architecture Components</h4>
                      <div className="flex flex-wrap gap-2">
                        {topic.hld!.components.map((c) => (
                          <span key={c} className="text-xs px-2.5 py-1 rounded-lg bg-primary/10 text-primary font-medium">{c}</span>
                        ))}
                      </div>
                    </div>
                    {/* Diagram */}
                    <div className="bg-card rounded-xl border border-border p-5 mb-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Architecture Overview</h4>
                      <pre className="text-xs text-foreground font-mono whitespace-pre-wrap leading-relaxed bg-secondary/50 rounded-lg p-4 overflow-x-auto">
                        {topic.hld!.diagram}
                      </pre>
                    </div>
                    {/* Steps */}
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Design Steps</h4>
                    {renderSteps(topic.hld!.steps, "hld")}
                  </TabsContent>
                )}

                {hasLLD && (
                  <TabsContent value="lld">
                    {/* Design Patterns */}
                    {topic.lld!.patterns && (
                      <div className="bg-card rounded-xl border border-border p-5 mb-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Design Patterns Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {topic.lld!.patterns.map((p) => (
                            <span key={p} className="text-xs px-2.5 py-1 rounded-lg bg-accent/10 text-accent font-medium">{p}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* Class Diagram */}
                    <div className="bg-card rounded-xl border border-border p-5 mb-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Class Responsibilities</h4>
                      <div className="space-y-3">
                        {topic.lld!.classes.map((cls) => (
                          <div key={cls.name} className="border border-border rounded-lg p-3">
                            <h5 className="font-mono text-sm font-bold text-foreground mb-1.5">{cls.name}</h5>
                            <ul className="space-y-0.5">
                              {cls.responsibilities.map((r, i) => (
                                <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                                  <span className="text-primary">•</span> {r}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Steps */}
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Design Steps</h4>
                    {renderSteps(topic.lld!.steps, "lld")}
                  </TabsContent>
                )}
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Scale Considerations */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-xl border border-border p-5">
                <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                  <TrendingUp size={16} className="text-primary" /> Scale Considerations
                </h3>
                <ul className="space-y-2">
                  {topic.scaleConsiderations.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="text-primary shrink-0 mt-0.5">▸</span> {s}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Interview Tips */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-card rounded-xl border border-border p-5">
                <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Lightbulb size={16} className="text-yellow-500" /> Interview Tips
                </h3>
                <ul className="space-y-2">
                  {topic.interviewTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="text-yellow-500 shrink-0 mt-0.5">💡</span> {tip}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Tags */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-card rounded-xl border border-border p-5">
                <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Tag size={16} className="text-primary" /> Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {topic.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">{tag}</span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default SystemDesignDetail;

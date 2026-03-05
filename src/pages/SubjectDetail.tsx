import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, BookOpen, Code2, Lightbulb, ChevronRight, PlayCircle } from "lucide-react";
import { subjects, subjectDisplayNames } from "@/data/learningData";
import { getTopicContent, TopicContent } from "@/data/topicContent";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const SubjectDetail = () => {
  const { slug } = useParams();
  const subject = slug ? subjects[slug] : null;
  const [activeTopic, setActiveTopic] = useState(0);
  const [completedTopics, setCompletedTopics] = useState<Set<number>>(new Set());

  const displayName = Object.entries(subjectDisplayNames).find(
    ([, s]) => s === slug
  )?.[0] || slug || "";

  if (!subject) {
    return (
      <main>
        <Navbar />
        <section className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold mb-4">Subject not found</h1>
            <Link to="/" className="text-primary hover:underline">← Back to Home</Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  const topicData = getTopicContent(slug!, subject.topics);
  const currentTopic = topicData[activeTopic];
  const progress = Math.round((completedTopics.size / topicData.length) * 100);

  const handleNext = () => {
    setCompletedTopics((prev) => new Set(prev).add(activeTopic));
    if (activeTopic < topicData.length - 1) {
      setActiveTopic(activeTopic + 1);
    }
  };

  const handlePrev = () => {
    if (activeTopic > 0) {
      setActiveTopic(activeTopic - 1);
    }
  };

  return (
    <main>
      <Navbar />
      <section className="min-h-screen pt-24 pb-0">
        {/* Header */}
        <div className="bg-card border-b border-border">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link to="/#subjects" className="text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft size={18} />
                </Link>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg gradient-btn flex items-center justify-center text-primary-foreground">
                    <BookOpen size={16} />
                  </div>
                  <div>
                    <h1 className="font-display text-lg font-bold">{displayName}</h1>
                    <p className="text-xs text-muted-foreground">{subject.category} • {topicData.length} Topics</p>
                  </div>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-3">
                <div className="text-xs text-muted-foreground">{progress}% complete</div>
                <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full gradient-btn rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content area: sidebar + main */}
        <div className="flex min-h-[calc(100vh-10rem)]">
          {/* Left sidebar — topic list */}
          <aside className="hidden lg:block w-72 xl:w-80 border-r border-border bg-card/50 shrink-0">
            <ScrollArea className="h-[calc(100vh-10rem)]">
              <div className="p-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">Topics</p>
                <div className="space-y-0.5">
                  {topicData.map((topic, i) => {
                    const isActive = i === activeTopic;
                    const isCompleted = completedTopics.has(i);
                    return (
                      <button
                        key={i}
                        onClick={() => setActiveTopic(i)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-all ${
                          isActive
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        }`}
                      >
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                          isCompleted
                            ? "bg-primary text-primary-foreground"
                            : isActive
                            ? "bg-primary/20 text-primary border border-primary/30"
                            : "bg-secondary text-muted-foreground"
                        }`}>
                          {isCompleted ? <CheckCircle2 size={12} /> : i + 1}
                        </span>
                        <span className="truncate">{topic.title}</span>
                        {isActive && <ChevronRight size={14} className="ml-auto shrink-0 text-primary" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </ScrollArea>
          </aside>

          {/* Mobile topic selector */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border px-4 py-3 flex items-center justify-between">
            <Button variant="outline" size="sm" onClick={handlePrev} disabled={activeTopic === 0}>
              <ArrowLeft size={14} className="mr-1" /> Prev
            </Button>
            <span className="text-xs text-muted-foreground font-medium">
              {activeTopic + 1} / {topicData.length}
            </span>
            <Button size="sm" onClick={handleNext} className="gradient-btn text-primary-foreground">
              {activeTopic === topicData.length - 1 ? "Finish" : "Next"} <ArrowRight size={14} className="ml-1" />
            </Button>
          </div>

          {/* Right main content */}
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTopic}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="max-w-3xl mx-auto px-6 py-8 pb-28 lg:pb-8"
              >
                {/* Topic title */}
                <div className="mb-8">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    Topic {activeTopic + 1} of {topicData.length}
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold mt-1 mb-2">{currentTopic.title}</h2>
                </div>

                {/* Theory section */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen size={18} className="text-primary" />
                    <h3 className="font-display font-semibold text-lg">Theory</h3>
                  </div>
                  <div className="prose prose-sm max-w-none">
                    {currentTopic.theory.split("\n\n").map((p, i) => (
                      <p key={i} className="text-muted-foreground leading-relaxed mb-4">{p}</p>
                    ))}
                  </div>
                </div>

                {/* Key Points */}
                <div className="mb-8 bg-primary/5 border border-primary/10 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb size={18} className="text-primary" />
                    <h3 className="font-display font-semibold text-lg">Key Points</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {currentTopic.keyPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                        <span className="text-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Code Example */}
                {currentTopic.codeExample && (
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Code2 size={18} className="text-primary" />
                      <h3 className="font-display font-semibold text-lg">Code Example</h3>
                      <span className="ml-auto text-xs bg-secondary px-2.5 py-1 rounded-full text-muted-foreground font-medium uppercase">
                        {currentTopic.codeExample.language}
                      </span>
                    </div>
                    <div className="bg-[hsl(220,20%,8%)] rounded-xl overflow-hidden border border-border">
                      <pre className="p-5 overflow-x-auto text-sm leading-relaxed">
                        <code className="text-[hsl(190,90%,70%)]">{currentTopic.codeExample.code}</code>
                      </pre>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3 flex items-start gap-2">
                      <Lightbulb size={14} className="shrink-0 mt-0.5 text-accent" />
                      {currentTopic.codeExample.explanation}
                    </p>
                  </div>
                )}

                {/* Hands-On Exercises */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <PlayCircle size={18} className="text-primary" />
                    <h3 className="font-display font-semibold text-lg">Hands-On Practice</h3>
                  </div>
                  <div className="space-y-4">
                    {currentTopic.handsOn.map((exercise, i) => {
                      const isCoding = exercise.task.toLowerCase().includes("implement") ||
                        exercise.task.toLowerCase().includes("build") ||
                        exercise.task.toLowerCase().includes("write") ||
                        exercise.task.toLowerCase().includes("create") ||
                        exercise.task.toLowerCase().includes("code") ||
                        exercise.task.toLowerCase().includes("simulate") ||
                        exercise.task.toLowerCase().includes("program");
                      return (
                        <div key={i} className="bg-card border border-border rounded-xl p-5">
                          <div className="flex items-start gap-3">
                            <span className="w-7 h-7 rounded-lg gradient-btn flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0">
                              {i + 1}
                            </span>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-foreground mb-2">{exercise.task}</p>
                              <div className="flex items-center gap-3 mt-3">
                                <details className="group flex-1">
                                  <summary className="text-xs font-medium text-primary cursor-pointer hover:underline">
                                    Show Hint
                                  </summary>
                                  <p className="text-xs text-muted-foreground mt-2 pl-3 border-l-2 border-primary/30">
                                    {exercise.hint}
                                  </p>
                                </details>
                                {isCoding && (
                                  <Link to="/compiler" className="shrink-0">
                                    <Button size="sm" variant="outline" className="text-xs gap-1.5 border-primary/30 text-primary hover:bg-primary/10">
                                      <Code2 size={12} />
                                      Try in Compiler
                                    </Button>
                                  </Link>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Navigation buttons — desktop */}
                <div className="hidden lg:flex items-center justify-between pt-6 border-t border-border">
                  <Button variant="outline" onClick={handlePrev} disabled={activeTopic === 0}>
                    <ArrowLeft size={16} className="mr-2" /> Previous Topic
                  </Button>
                  <Button onClick={handleNext} className="gradient-btn text-primary-foreground">
                    {activeTopic === topicData.length - 1 ? "Complete Subject" : "Next Topic"}
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SubjectDetail;

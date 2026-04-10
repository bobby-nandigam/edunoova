import { motion } from "framer-motion";
import { Layout, ArrowRight, Clock, Tag, Filter, Search, Layers, Code2, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { systemDesignTopics } from "@/data/systemDesignData";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const levelColor: Record<string, string> = {
  Easy: "text-green-500 bg-green-500/10 border-green-500/20",
  Medium: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20",
  Hard: "text-red-500 bg-red-500/10 border-red-500/20",
};

const typeIcon: Record<string, typeof Layout> = {
  HLD: Layers,
  LLD: Code2,
  Both: BookOpen,
};

const SystemDesign = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"All" | "HLD" | "LLD" | "Both">("All");
  const [filterDiff, setFilterDiff] = useState<"All" | "Easy" | "Medium" | "Hard">("All");

  const filtered = useMemo(() => {
    return systemDesignTopics.filter((t) => {
      const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
      const matchType = filterType === "All" || t.type === filterType;
      const matchDiff = filterDiff === "All" || t.difficulty === filterDiff;
      return matchSearch && matchType && matchDiff;
    });
  }, [search, filterType, filterDiff]);

  const hldTopics = filtered.filter(t => t.type === "HLD" || t.type === "Both");
  const lldTopics = filtered.filter(t => t.type === "LLD" || t.type === "Both");

  return (
    <main>
      <Navbar />
      <div className="pt-32 pb-20 min-h-screen section-gradient">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Header */}
            <div className="mb-10">
              <h1 className="font-display text-3xl sm:text-4xl font-bold mb-3">
                System <span className="gradient-text">Design</span> Practice
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                Master High-Level Design (HLD) &amp; Low-Level Design (LLD) with structured, step-by-step case studies used in top tech interviews.
              </p>
            </div>

            {/* Workflow overview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
              {[
                { label: "Understand Requirements", step: "01", color: "from-blue-500/10 to-blue-600/5" },
                { label: "Capacity & API Design", step: "02", color: "from-cyan-500/10 to-cyan-600/5" },
                { label: "Component Architecture", step: "03", color: "from-violet-500/10 to-violet-600/5" },
                { label: "Deep Dive & Scale", step: "04", color: "from-amber-500/10 to-amber-600/5" },
              ].map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`rounded-xl border border-border p-4 bg-gradient-to-br ${s.color}`}
                >
                  <span className="text-xs font-bold text-primary mb-1 block">STEP {s.step}</span>
                  <span className="text-sm font-semibold text-card-foreground">{s.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <div className="relative flex-1 min-w-[200px] max-w-sm">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search topics or tags..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div className="flex gap-1.5">
                {(["All", "HLD", "LLD", "Both"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setFilterType(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${filterType === t ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground hover:text-foreground"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="flex gap-1.5">
                {(["All", "Easy", "Medium", "Hard"] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setFilterDiff(d)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${filterDiff === d ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground hover:text-foreground"}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Tabbed view */}
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="all">All ({filtered.length})</TabsTrigger>
                <TabsTrigger value="hld">HLD ({hldTopics.length})</TabsTrigger>
                <TabsTrigger value="lld">LLD ({lldTopics.length})</TabsTrigger>
              </TabsList>

              {(["all", "hld", "lld"] as const).map((tab) => {
                const items = tab === "hld" ? hldTopics : tab === "lld" ? lldTopics : filtered;
                return (
                  <TabsContent key={tab} value={tab}>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {items.map((t, i) => {
                        const TypeIcon = typeIcon[t.type];
                        return (
                          <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.03 }}
                            onClick={() => navigate(`/system-design/${t.id}`)}
                            className="bg-card rounded-xl p-5 border border-border card-hover cursor-pointer group flex flex-col"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <TypeIcon size={16} className="text-primary" />
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{t.type}</span>
                              </div>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${levelColor[t.difficulty]}`}>
                                {t.difficulty}
                              </span>
                            </div>
                            <h3 className="font-display font-semibold text-card-foreground mb-1">{t.title}</h3>
                            <p className="text-xs text-muted-foreground mb-3 flex-1">{t.subtitle}</p>
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {t.tags.slice(0, 3).map((tag) => (
                                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{tag}</span>
                              ))}
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                                <Clock size={11} /> {t.estimatedTime}
                              </span>
                              <span className="flex items-center gap-1 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                Start Practice <ArrowRight size={12} />
                              </span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                    {items.length === 0 && (
                      <div className="text-center py-16 text-muted-foreground">
                        No topics match your filters.
                      </div>
                    )}
                  </TabsContent>
                );
              })}
            </Tabs>
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default SystemDesign;

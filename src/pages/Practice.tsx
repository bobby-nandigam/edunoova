import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Search, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Problem = {
  id: string;
  title: string;
  difficulty: string;
  category: string;
  acceptance_rate: number | null;
  solved?: boolean;
};

const diffColor: Record<string, string> = {
  easy: "text-green-500",
  medium: "text-yellow-500",
  hard: "text-red-500",
};

const Practice = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const initialDifficulty = searchParams.get("difficulty") || "all";
  const [difficulty, setDifficulty] = useState(initialDifficulty);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblems = async () => {
      const { data: problemsData } = await supabase
        .from("practice_problems")
        .select("id, title, difficulty, category, acceptance_rate")
        .order("created_at");

      let solvedIds = new Set<string>();
      if (user) {
        const { data: solutions } = await supabase
          .from("user_solutions")
          .select("problem_id, status")
          .eq("user_id", user.id)
          .eq("status", "accepted");
        solvedIds = new Set((solutions || []).map(s => s.problem_id));
      }

      setProblems(
        (problemsData || []).map(p => ({ ...p, solved: solvedIds.has(p.id) }))
      );
      setLoading(false);
    };
    fetchProblems();
  }, [user]);

  const categories = ["all", ...Array.from(new Set(problems.map(p => p.category)))];

  const filtered = problems.filter(p => {
    if (difficulty !== "all" && p.difficulty !== difficulty) return false;
    if (category !== "all" && p.category !== category) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <main>
      <Navbar />
      <div className="pt-32 pb-20 min-h-screen section-gradient">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">
              Practice <span className="gradient-text">Problems</span>
            </h1>
            <p className="text-muted-foreground mb-8">Sharpen your skills with curated coding challenges.</p>

            <div className="flex flex-wrap gap-3 mb-6">
              <div className="relative flex-1 min-w-[200px] max-w-md">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search problems..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-card text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="flex gap-2">
                {["all", "easy", "medium", "hard"].map(d => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold capitalize transition-all ${
                      difficulty === d
                        ? "gradient-btn text-primary-foreground"
                        : "bg-card border border-border text-card-foreground hover:bg-secondary"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="px-4 py-2 rounded-lg border border-border bg-card text-sm text-card-foreground"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c === "all" ? "All Categories" : c}</option>
                ))}
              </select>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="animate-spin text-primary" size={32} />
              </div>
            ) : (
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="grid grid-cols-[40px_1fr_120px_140px_100px] gap-2 px-4 py-3 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <span></span>
                  <span>Title</span>
                  <span>Difficulty</span>
                  <span>Category</span>
                  <span>Acceptance</span>
                </div>
                {filtered.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.02 }}
                    onClick={() => navigate(`/compiler?problem=${p.id}`)}
                    className="grid grid-cols-[40px_1fr_120px_140px_100px] gap-2 px-4 py-3 border-b border-border last:border-0 hover:bg-secondary/50 cursor-pointer transition-colors items-center"
                  >
                    <span>{p.solved ? <CheckCircle2 size={16} className="text-green-500" /> : <Circle size={16} className="text-muted-foreground" />}</span>
                    <span className="text-sm font-medium text-card-foreground">{p.title}</span>
                    <span className={`text-xs font-semibold capitalize ${diffColor[p.difficulty]}`}>{p.difficulty}</span>
                    <span className="text-xs text-muted-foreground">{p.category}</span>
                    <span className="text-xs text-muted-foreground">{p.acceptance_rate ? `${p.acceptance_rate}%` : "-"}</span>
                  </motion.div>
                ))}
                {filtered.length === 0 && (
                  <div className="px-4 py-12 text-center text-muted-foreground text-sm">No problems match your filters.</div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Practice;

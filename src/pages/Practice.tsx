import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Search, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const problems = [
  { id: 1, title: "Two Sum", difficulty: "easy", category: "Arrays", acceptance: "49.2%", solved: true },
  { id: 2, title: "Reverse Linked List", difficulty: "easy", category: "Linked List", acceptance: "72.1%", solved: true },
  { id: 3, title: "Valid Parentheses", difficulty: "easy", category: "Stacks", acceptance: "40.5%", solved: false },
  { id: 4, title: "Maximum Subarray", difficulty: "medium", category: "Arrays", acceptance: "50.1%", solved: false },
  { id: 5, title: "Binary Tree Inorder Traversal", difficulty: "easy", category: "Trees", acceptance: "73.4%", solved: false },
  { id: 6, title: "Merge Two Sorted Lists", difficulty: "easy", category: "Linked List", acceptance: "62.0%", solved: true },
  { id: 7, title: "Longest Substring Without Repeating Characters", difficulty: "medium", category: "Strings", acceptance: "33.8%", solved: false },
  { id: 8, title: "Container With Most Water", difficulty: "medium", category: "Two Pointers", acceptance: "54.3%", solved: false },
  { id: 9, title: "3Sum", difficulty: "medium", category: "Two Pointers", acceptance: "32.4%", solved: false },
  { id: 10, title: "Trapping Rain Water", difficulty: "hard", category: "Arrays", acceptance: "58.7%", solved: false },
  { id: 11, title: "Median of Two Sorted Arrays", difficulty: "hard", category: "Binary Search", acceptance: "36.1%", solved: false },
  { id: 12, title: "Regular Expression Matching", difficulty: "hard", category: "Dynamic Programming", acceptance: "28.2%", solved: false },
  { id: 13, title: "Merge K Sorted Lists", difficulty: "hard", category: "Heaps", acceptance: "49.8%", solved: false },
  { id: 14, title: "Climbing Stairs", difficulty: "easy", category: "Dynamic Programming", acceptance: "51.6%", solved: true },
  { id: 15, title: "Best Time to Buy and Sell Stock", difficulty: "easy", category: "Arrays", acceptance: "54.2%", solved: false },
  { id: 16, title: "Coin Change", difficulty: "medium", category: "Dynamic Programming", acceptance: "41.8%", solved: false },
  { id: 17, title: "Word Break", difficulty: "medium", category: "Dynamic Programming", acceptance: "45.6%", solved: false },
  { id: 18, title: "N-Queens", difficulty: "hard", category: "Backtracking", acceptance: "63.8%", solved: false },
  { id: 19, title: "LRU Cache", difficulty: "medium", category: "Design", acceptance: "40.5%", solved: false },
  { id: 20, title: "Number of Islands", difficulty: "medium", category: "Graphs", acceptance: "56.2%", solved: false },
];

const diffColor: Record<string, string> = {
  easy: "text-green-500",
  medium: "text-yellow-500",
  hard: "text-red-500",
};

const Practice = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialDifficulty = searchParams.get("difficulty") || "all";
  const [difficulty, setDifficulty] = useState(initialDifficulty);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const categories = ["all", ...Array.from(new Set(problems.map((p) => p.category)))];

  const filtered = problems.filter((p) => {
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

            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="relative flex-1 min-w-[200px] max-w-md">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search problems..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-card text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="flex gap-2">
                {["all", "easy", "medium", "hard"].map((d) => (
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
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-2 rounded-lg border border-border bg-card text-sm text-card-foreground"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c === "all" ? "All Categories" : c}</option>
                ))}
              </select>
            </div>

            {/* Problem Table */}
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
                  <span className="text-sm font-medium text-card-foreground">{p.id}. {p.title}</span>
                  <span className={`text-xs font-semibold capitalize ${diffColor[p.difficulty]}`}>{p.difficulty}</span>
                  <span className="text-xs text-muted-foreground">{p.category}</span>
                  <span className="text-xs text-muted-foreground">{p.acceptance}</span>
                </motion.div>
              ))}
              {filtered.length === 0 && (
                <div className="px-4 py-12 text-center text-muted-foreground text-sm">No problems match your filters.</div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Practice;

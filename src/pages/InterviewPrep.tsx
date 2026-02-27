import { motion } from "framer-motion";
import { Target, Building2, CheckCircle2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const companies = [
  { name: "Google", problems: 120, difficulty: "Hard", color: "bg-blue-500/10 text-blue-500" },
  { name: "Amazon", problems: 95, difficulty: "Medium-Hard", color: "bg-orange-500/10 text-orange-500" },
  { name: "Microsoft", problems: 88, difficulty: "Medium", color: "bg-emerald-500/10 text-emerald-500" },
  { name: "Meta", problems: 76, difficulty: "Hard", color: "bg-indigo-500/10 text-indigo-500" },
  { name: "Apple", problems: 65, difficulty: "Medium", color: "bg-gray-500/10 text-gray-500" },
  { name: "Netflix", problems: 42, difficulty: "Hard", color: "bg-red-500/10 text-red-500" },
];

const tracks = [
  { title: "DSA Mastery", desc: "Arrays, Trees, Graphs, DP — 200+ problems", progress: 35 },
  { title: "System Design", desc: "HLD, LLD, Scalability — 50+ case studies", progress: 20 },
  { title: "Behavioral Round", desc: "STAR method, HR questions, situational", progress: 60 },
  { title: "CS Fundamentals", desc: "OS, DBMS, CN rapid revision", progress: 45 },
  { title: "Resume Building", desc: "ATS-optimized templates & tips", progress: 80 },
];

const InterviewPrep = () => {
  const navigate = useNavigate();

  return (
    <main>
      <Navbar />
      <div className="pt-32 pb-20 min-h-screen section-gradient">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">
              Interview <span className="gradient-text">Preparation</span>
            </h1>
            <p className="text-muted-foreground mb-10">Company-wise problems and structured interview tracks.</p>

            <div className="mb-12">
              <h2 className="font-display text-xl font-bold text-foreground mb-5 flex items-center gap-2">
                <Building2 size={20} className="text-primary" /> Company-Wise Problems
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {companies.map((c, i) => (
                  <motion.div
                    key={c.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => navigate("/practice")}
                    className="bg-card rounded-xl p-5 border border-border card-hover cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${c.color}`}>{c.name}</span>
                      <span className="text-xs text-muted-foreground">{c.difficulty}</span>
                    </div>
                    <p className="text-sm text-card-foreground font-medium">{c.problems} curated problems</p>
                    <div className="flex items-center gap-1 text-xs text-primary font-semibold mt-3">
                      Start Solving <ArrowRight size={12} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-5 flex items-center gap-2">
                <Target size={20} className="text-primary" /> Preparation Tracks
              </h2>
              <div className="space-y-3">
                {tracks.map((t, i) => (
                  <motion.div
                    key={t.title}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-card rounded-xl p-5 border border-border card-hover cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-display font-semibold text-card-foreground">{t.title}</h3>
                      <span className="text-xs font-semibold text-primary">{t.progress}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{t.desc}</p>
                    <div className="w-full h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div className="h-full rounded-full gradient-btn" style={{ width: `${t.progress}%` }} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default InterviewPrep;

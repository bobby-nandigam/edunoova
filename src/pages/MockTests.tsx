import { motion } from "framer-motion";
import { FileText, Clock, BarChart3, Play } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const tests = [
  { title: "DSA Fundamentals", questions: 30, duration: "45 min", difficulty: "Easy", category: "DSA" },
  { title: "Advanced Algorithms", questions: 25, duration: "60 min", difficulty: "Hard", category: "DSA" },
  { title: "DBMS & SQL Mastery", questions: 40, duration: "50 min", difficulty: "Medium", category: "Core CSE" },
  { title: "Operating Systems Concepts", questions: 35, duration: "45 min", difficulty: "Medium", category: "Core CSE" },
  { title: "Computer Networks", questions: 30, duration: "40 min", difficulty: "Medium", category: "Core CSE" },
  { title: "OOP Principles", questions: 25, duration: "30 min", difficulty: "Easy", category: "Core CSE" },
  { title: "Machine Learning Basics", questions: 30, duration: "50 min", difficulty: "Medium", category: "AI/ML" },
  { title: "System Design Interview", questions: 15, duration: "90 min", difficulty: "Hard", category: "System Design" },
  { title: "Aptitude & Reasoning", questions: 50, duration: "60 min", difficulty: "Easy", category: "Placement" },
];

const diffColor: Record<string, string> = {
  Easy: "text-green-500 bg-green-500/10",
  Medium: "text-yellow-500 bg-yellow-500/10",
  Hard: "text-red-500 bg-red-500/10",
};

const MockTests = () => (
  <main>
    <Navbar />
    <div className="pt-32 pb-20 min-h-screen section-gradient">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">
            Mock <span className="gradient-text">Tests</span>
          </h1>
          <p className="text-muted-foreground mb-8">Test your knowledge with timed assessments.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tests.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="bg-card rounded-xl p-5 border border-border card-hover cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary/10 text-primary">{t.category}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${diffColor[t.difficulty]}`}>{t.difficulty}</span>
                </div>
                <h3 className="font-display font-semibold text-card-foreground mb-3">{t.title}</h3>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><FileText size={12} /> {t.questions} Qs</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {t.duration}</span>
                </div>
                <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold gradient-btn text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play size={12} /> Start Test
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
    <Footer />
  </main>
);

export default MockTests;

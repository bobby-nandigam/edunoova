import { motion } from "framer-motion";
import { Trophy, Medal, Flame, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const users = [
  { rank: 1, name: "Arjun Sharma", xp: 12450, streak: 45, solved: 342, badge: "🥇" },
  { rank: 2, name: "Priya Mehta", xp: 11200, streak: 38, solved: 310, badge: "🥈" },
  { rank: 3, name: "Rahul Verma", xp: 10800, streak: 42, solved: 298, badge: "🥉" },
  { rank: 4, name: "Sneha Patel", xp: 9600, streak: 30, solved: 275 },
  { rank: 5, name: "Vikram Reddy", xp: 9100, streak: 28, solved: 260 },
  { rank: 6, name: "Anika Gupta", xp: 8700, streak: 25, solved: 245 },
  { rank: 7, name: "Dev Kapoor", xp: 8200, streak: 22, solved: 230 },
  { rank: 8, name: "Meera Joshi", xp: 7800, streak: 20, solved: 218 },
  { rank: 9, name: "Karan Singh", xp: 7400, streak: 18, solved: 205 },
  { rank: 10, name: "Riya Nair", xp: 7000, streak: 16, solved: 192 },
];

const Leaderboard = () => (
  <main>
    <Navbar />
    <div className="pt-32 pb-20 min-h-screen section-gradient">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">
            <span className="gradient-text">Leaderboard</span>
          </h1>
          <p className="text-muted-foreground mb-8">Top performers this month. Keep solving to climb the ranks!</p>

          {/* Top 3 */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {users.slice(0, 3).map((u, i) => (
              <motion.div
                key={u.rank}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`bg-card rounded-xl p-5 border border-border text-center ${i === 0 ? "ring-2 ring-yellow-500/30" : ""}`}
              >
                <span className="text-3xl">{u.badge}</span>
                <h3 className="font-display font-bold text-card-foreground mt-2">{u.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{u.xp.toLocaleString()} XP</p>
                <div className="flex items-center justify-center gap-3 mt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Flame size={12} className="text-orange-500" /> {u.streak}d</span>
                  <span className="flex items-center gap-1"><Star size={12} className="text-primary" /> {u.solved}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Rest */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="grid grid-cols-[60px_1fr_100px_80px_80px] gap-2 px-4 py-3 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <span>Rank</span>
              <span>Name</span>
              <span>XP</span>
              <span>Streak</span>
              <span>Solved</span>
            </div>
            {users.slice(3).map((u, i) => (
              <motion.div
                key={u.rank}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.04 }}
                className="grid grid-cols-[60px_1fr_100px_80px_80px] gap-2 px-4 py-3 border-b border-border last:border-0 hover:bg-secondary/50 transition-colors items-center"
              >
                <span className="text-sm font-bold text-card-foreground">#{u.rank}</span>
                <span className="text-sm font-medium text-card-foreground">{u.name}</span>
                <span className="text-sm text-muted-foreground">{u.xp.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground flex items-center gap-1"><Flame size={12} className="text-orange-500" /> {u.streak}d</span>
                <span className="text-sm text-muted-foreground">{u.solved}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
    <Footer />
  </main>
);

export default Leaderboard;

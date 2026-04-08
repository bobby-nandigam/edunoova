import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Flame, Star, Crown, Gem, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type LeaderboardEntry = {
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  total_xp: number;
  total_solved: number;
  active_days: number;
};

const rankIcons = [Crown, Gem, Medal];

const Leaderboard = () => {
  const [users, setUsers] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data } = await supabase
        .from("leaderboard_view")
        .select("*")
        .limit(50);
      setUsers((data || []) as LeaderboardEntry[]);
      setLoading(false);
    };
    fetchLeaderboard();
  }, []);

  return (
    <main>
      <Navbar />
      <div className="pt-32 pb-20 min-h-screen section-gradient">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">
              <span className="gradient-text">Leaderboard</span>
            </h1>
            <p className="text-muted-foreground mb-8">Top performers. Keep learning to climb the ranks!</p>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="animate-spin text-primary" size={32} />
              </div>
            ) : users.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                No activity yet. Start learning to appear on the leaderboard!
              </div>
            ) : (
              <>
                {/* Top 3 */}
                {users.length >= 3 && (
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {users.slice(0, 3).map((u, i) => {
                      const Icon = rankIcons[i];
                      const ringClass = i === 0 ? "ring-2 ring-yellow-500/30" : "";
                      return (
                        <motion.div
                          key={u.user_id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className={`bg-card rounded-xl p-5 border border-border text-center ${ringClass}`}
                        >
                          <Icon size={28} className={i === 0 ? "text-yellow-500 mx-auto" : i === 1 ? "text-muted-foreground mx-auto" : "text-orange-400 mx-auto"} />
                          <h3 className="font-display font-bold text-card-foreground mt-2">{u.display_name || "Anonymous"}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{Number(u.total_xp).toLocaleString()} XP</p>
                          <div className="flex items-center justify-center gap-3 mt-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><Flame size={12} className="text-orange-500" /> {u.active_days}d</span>
                            <span className="flex items-center gap-1"><Star size={12} className="text-primary" /> {Number(u.total_solved)}</span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                {/* Rest */}
                {users.length > 3 && (
                  <div className="bg-card rounded-xl border border-border overflow-hidden">
                    <div className="grid grid-cols-[60px_1fr_100px_80px_80px] gap-2 px-4 py-3 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      <span>Rank</span><span>Name</span><span>XP</span><span>Active</span><span>Solved</span>
                    </div>
                    {users.slice(3).map((u, i) => (
                      <motion.div
                        key={u.user_id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 + i * 0.04 }}
                        className="grid grid-cols-[60px_1fr_100px_80px_80px] gap-2 px-4 py-3 border-b border-border last:border-0 hover:bg-secondary/50 transition-colors items-center"
                      >
                        <span className="text-sm font-bold text-card-foreground">#{i + 4}</span>
                        <span className="text-sm font-medium text-card-foreground">{u.display_name || "Anonymous"}</span>
                        <span className="text-sm text-muted-foreground">{Number(u.total_xp).toLocaleString()}</span>
                        <span className="text-sm text-muted-foreground flex items-center gap-1"><Flame size={12} className="text-orange-500" /> {u.active_days}d</span>
                        <span className="text-sm text-muted-foreground">{Number(u.total_solved)}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Leaderboard;

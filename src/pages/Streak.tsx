import { motion } from "framer-motion";
import { Flame, Trophy, Calendar, Target, Zap, Loader2 } from "lucide-react";
import { useUserStats } from "@/hooks/useUserStats";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Streak = () => {
  const { user } = useAuth();
  const stats = useUserStats();

  const statCards = [
    { icon: Flame, label: "Current Streak", value: `${stats.currentStreak} days`, color: "text-orange-500" },
    { icon: Trophy, label: "Longest Streak", value: `${stats.longestStreak} days`, color: "text-yellow-500" },
    { icon: Target, label: "Problems Solved", value: stats.totalSolved.toLocaleString(), color: "text-primary" },
    { icon: Zap, label: "Total XP", value: stats.totalXP.toLocaleString(), color: "text-accent" },
  ];

  // Generate last 30 days
  const last30 = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    const dateStr = d.toISOString().split("T")[0];
    const active = stats.streakDates.some(s => s.date === dateStr);
    return { day: i + 1, active, date: d };
  });

  if (!user) {
    return (
      <main>
        <Navbar />
        <div className="pt-32 pb-20 min-h-screen section-gradient flex items-center justify-center">
          <p className="text-muted-foreground">Please sign in to view your streak.</p>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Navbar />
      <div className="pt-32 pb-20 min-h-screen section-gradient">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">
              Your <span className="gradient-text">Streak</span>
            </h1>
            <p className="text-muted-foreground mb-8">Stay consistent and build your coding habit.</p>

            {stats.loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="animate-spin text-primary" size={32} />
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                  {statCards.map(s => (
                    <div key={s.label} className="bg-card rounded-xl p-5 border border-border text-center">
                      <s.icon size={28} className={`mx-auto mb-3 ${s.color}`} />
                      <p className="font-display text-2xl font-bold text-card-foreground">{s.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-card rounded-xl p-6 border border-border">
                  <div className="flex items-center gap-2 mb-5">
                    <Calendar size={18} className="text-primary" />
                    <h2 className="font-display text-lg font-bold text-card-foreground">Activity — Last 30 Days</h2>
                  </div>
                  <div className="grid grid-cols-10 gap-2">
                    {last30.map(d => (
                      <div
                        key={d.day}
                        className={`aspect-square rounded-md flex items-center justify-center text-[10px] font-semibold ${
                          d.active
                            ? "gradient-btn text-primary-foreground"
                            : "bg-secondary text-muted-foreground"
                        }`}
                        title={d.date.toLocaleDateString()}
                      >
                        {d.day}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Streak;

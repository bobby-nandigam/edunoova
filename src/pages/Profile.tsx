import { useState } from "react";
import { motion } from "framer-motion";
import {
  Flame, Trophy, Calendar, Target, Zap, Star, Medal,
  BookOpen, Code2, Clock, Award, User, Settings, TrendingUp,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

/* ─── Mock data ─── */
const streakDays = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  active: [1,2,3,5,6,7,8,10,11,12,13,14,16,17,18,19,20,22,23,24,25,26,27].includes(i + 1),
}));

const profileStats = [
  { icon: Flame, label: "Current Streak", value: "12 days", color: "text-orange-500" },
  { icon: Trophy, label: "Longest Streak", value: "27 days", color: "text-yellow-500" },
  { icon: Target, label: "Problems Solved", value: "142", color: "text-primary" },
  { icon: Zap, label: "Total XP", value: "3,840", color: "text-accent" },
];

const leaderboardUsers = [
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

const achievements = [
  { icon: "🔥", title: "7-Day Streak", desc: "Code 7 days in a row", unlocked: true },
  { icon: "💯", title: "Century Club", desc: "Solve 100 problems", unlocked: true },
  { icon: "⚡", title: "Speed Demon", desc: "Solve 5 problems in 1 hour", unlocked: true },
  { icon: "🏆", title: "Top 10", desc: "Reach top 10 on leaderboard", unlocked: false },
  { icon: "🎯", title: "Perfect Score", desc: "Score 100% on a mock test", unlocked: false },
  { icon: "📚", title: "Path Master", desc: "Complete an entire learning path", unlocked: false },
];

const recentActivity = [
  { action: "Solved", item: "Two Sum", time: "2 hours ago", xp: 25 },
  { action: "Completed", item: "Binary Search module", time: "5 hours ago", xp: 100 },
  { action: "Solved", item: "Valid Parentheses", time: "1 day ago", xp: 30 },
  { action: "Started", item: "Dynamic Programming path", time: "2 days ago", xp: 10 },
  { action: "Solved", item: "Merge Two Sorted Lists", time: "2 days ago", xp: 35 },
];

const Profile = () => {
  const { user, profile } = useAuth();

  const displayName = profile?.display_name || user?.email?.split("@")[0] || "Learner";
  const initials = displayName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <main>
      <Navbar />
      <div className="pt-24 pb-12 min-h-screen section-gradient">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">

          {/* ─── Profile Header ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl border border-border p-5 sm:p-6 mb-6"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Avatar className="h-16 w-16 border-3 border-primary/30 shadow-lg">
                <AvatarImage src={profile?.avatar_url || undefined} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-card-foreground">
                  {displayName}
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {user?.email || "Start your coding journey today"}
                </p>
                {profile?.bio && (
                  <p className="text-sm text-muted-foreground mt-1">{profile.bio}</p>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 text-orange-500 font-semibold">
                  <Flame size={14} /> 12 day streak
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-semibold">
                  <Zap size={14} /> 3,840 XP
                </div>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
              {profileStats.map((s) => (
                <div key={s.label} className="bg-muted/50 rounded-xl p-3 text-center">
                  <s.icon size={20} className={`mx-auto mb-1.5 ${s.color}`} />
                  <div className="font-display font-bold text-lg text-card-foreground">{s.value}</div>
                  <div className="text-[11px] text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ─── Tabbed Content ─── */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start bg-card border border-border rounded-xl p-1 mb-5 overflow-x-auto">
              <TabsTrigger value="overview" className="gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <TrendingUp size={14} /> Overview
              </TabsTrigger>
              <TabsTrigger value="streak" className="gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Flame size={14} /> Streak
              </TabsTrigger>
              <TabsTrigger value="leaderboard" className="gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Trophy size={14} /> Leaderboard
              </TabsTrigger>
              <TabsTrigger value="achievements" className="gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Award size={14} /> Achievements
              </TabsTrigger>
            </TabsList>

            {/* Overview */}
            <TabsContent value="overview">
              <div className="grid lg:grid-cols-3 gap-5">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-card rounded-xl border border-border p-5">
                  <h2 className="font-display font-bold text-base mb-4 flex items-center gap-2 text-card-foreground">
                    <Clock size={16} className="text-primary" /> Recent Activity
                  </h2>
                  <div className="space-y-1">
                    {recentActivity.map((a, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            {a.action === "Solved" ? <Code2 size={14} className="text-primary" /> :
                             a.action === "Completed" ? <BookOpen size={14} className="text-accent" /> :
                             <Star size={14} className="text-yellow-500" />}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm text-card-foreground font-medium truncate">
                              {a.action} <span className="text-primary">{a.item}</span>
                            </p>
                            <p className="text-xs text-muted-foreground">{a.time}</p>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-accent shrink-0">+{a.xp} XP</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Learning Progress */}
                <div className="bg-card rounded-xl border border-border p-5">
                  <h2 className="font-display font-bold text-base mb-4 flex items-center gap-2 text-card-foreground">
                    <BookOpen size={16} className="text-accent" /> Learning Progress
                  </h2>
                  <div className="space-y-4">
                    {[
                      { path: "DSA Fundamentals", progress: 72 },
                      { path: "B.Tech Core Subjects", progress: 45 },
                      { path: "System Design", progress: 18 },
                    ].map((p) => (
                      <div key={p.path}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="font-medium text-card-foreground">{p.path}</span>
                          <span className="text-muted-foreground">{p.progress}%</span>
                        </div>
                        <Progress value={p.progress} className="h-2" />
                      </div>
                    ))}
                  </div>

                  {/* Mini streak preview */}
                  <div className="mt-6 pt-4 border-t border-border">
                    <h3 className="text-sm font-semibold text-card-foreground mb-2 flex items-center gap-1.5">
                      <Flame size={14} className="text-orange-500" /> This Week
                    </h3>
                    <div className="grid grid-cols-7 gap-1.5">
                      {["M","T","W","T","F","S","S"].map((d, i) => (
                        <div key={i} className="text-center">
                          <div className={`aspect-square rounded-md flex items-center justify-center text-[10px] font-bold ${
                            i < 5 ? "gradient-btn text-primary-foreground" : "bg-muted text-muted-foreground"
                          }`}>
                            {d}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Streak */}
            <TabsContent value="streak">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                <div className="bg-card rounded-xl border border-border p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <Calendar size={18} className="text-primary" />
                    <h2 className="font-display text-lg font-bold text-card-foreground">Activity — Last 30 Days</h2>
                  </div>
                  <div className="grid grid-cols-10 gap-2">
                    {streakDays.map((d) => (
                      <div
                        key={d.day}
                        className={`aspect-square rounded-md flex items-center justify-center text-[10px] font-semibold transition-all ${
                          d.active
                            ? "gradient-btn text-primary-foreground shadow-sm"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {d.day}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Streak milestones */}
                <div className="bg-card rounded-xl border border-border p-5">
                  <h2 className="font-display font-bold text-base mb-4 text-card-foreground">Streak Milestones</h2>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      { days: 7, label: "1 Week", reached: true },
                      { days: 14, label: "2 Weeks", reached: false },
                      { days: 30, label: "1 Month", reached: false },
                    ].map((m) => (
                      <div key={m.days} className={`rounded-xl p-4 text-center border ${
                        m.reached
                          ? "border-accent/30 bg-accent/5"
                          : "border-border bg-muted/30"
                      }`}>
                        <div className="text-2xl mb-1">{m.reached ? "✅" : "🔒"}</div>
                        <div className="font-display font-bold text-card-foreground">{m.label}</div>
                        <div className="text-xs text-muted-foreground">{m.days}-day streak</div>
                        {!m.reached && (
                          <Progress value={(12 / m.days) * 100} className="h-1.5 mt-2" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            {/* Leaderboard */}
            <TabsContent value="leaderboard">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                {/* Top 3 */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  {leaderboardUsers.slice(0, 3).map((u, i) => (
                    <motion.div
                      key={u.rank}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`bg-card rounded-xl p-4 sm:p-5 border border-border text-center ${
                        i === 0 ? "ring-2 ring-yellow-500/30" : ""
                      }`}
                    >
                      <span className="text-2xl sm:text-3xl">{u.badge}</span>
                      <h3 className="font-display font-bold text-sm sm:text-base text-card-foreground mt-2 truncate">{u.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{u.xp.toLocaleString()} XP</p>
                      <div className="flex items-center justify-center gap-3 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Flame size={12} className="text-orange-500" /> {u.streak}d</span>
                        <span className="flex items-center gap-1"><Star size={12} className="text-primary" /> {u.solved}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Table */}
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                  <div className="grid grid-cols-[50px_1fr_80px_70px_70px] sm:grid-cols-[60px_1fr_100px_80px_80px] gap-2 px-4 py-3 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <span>Rank</span>
                    <span>Name</span>
                    <span>XP</span>
                    <span>Streak</span>
                    <span>Solved</span>
                  </div>
                  {leaderboardUsers.slice(3).map((u, i) => (
                    <motion.div
                      key={u.rank}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + i * 0.04 }}
                      className="grid grid-cols-[50px_1fr_80px_70px_70px] sm:grid-cols-[60px_1fr_100px_80px_80px] gap-2 px-4 py-3 border-b border-border last:border-0 hover:bg-muted/50 transition-colors items-center"
                    >
                      <span className="text-sm font-bold text-card-foreground">#{u.rank}</span>
                      <span className="text-sm font-medium text-card-foreground truncate">{u.name}</span>
                      <span className="text-sm text-muted-foreground">{u.xp.toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground flex items-center gap-1"><Flame size={12} className="text-orange-500" /> {u.streak}d</span>
                      <span className="text-sm text-muted-foreground">{u.solved}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            {/* Achievements */}
            <TabsContent value="achievements">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {achievements.map((a, i) => (
                    <motion.div
                      key={a.title}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className={`bg-card rounded-xl border p-4 flex items-start gap-3 ${
                        a.unlocked
                          ? "border-accent/30 bg-accent/5"
                          : "border-border opacity-60"
                      }`}
                    >
                      <span className="text-2xl">{a.icon}</span>
                      <div>
                        <h3 className="font-display font-bold text-sm text-card-foreground">{a.title}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{a.desc}</p>
                        {a.unlocked ? (
                          <span className="inline-block mt-1.5 text-[10px] font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                            Unlocked ✓
                          </span>
                        ) : (
                          <span className="inline-block mt-1.5 text-[10px] font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                            Locked 🔒
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Profile;

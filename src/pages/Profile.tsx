import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Flame, Trophy, Calendar, Target, Zap, Star,
  BookOpen, Code2, Clock, Award, TrendingUp,
  CheckCircle2, Lock, Shield, Crosshair, Gauge, Rocket,
  Medal, Crown, Gem,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

/* ─── Generate GitHub-style year heatmap data ─── */
const generateYearData = () => {
  const today = new Date();
  const data: { date: Date; level: number }[] = [];
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    // Simulate activity: higher probability recent, random otherwise
    const recency = 1 - i / 365;
    const rand = Math.random();
    let level = 0;
    if (rand < 0.15 + recency * 0.25) level = 1;
    if (rand < 0.08 + recency * 0.15) level = 2;
    if (rand < 0.04 + recency * 0.08) level = 3;
    if (rand < 0.02 + recency * 0.04) level = 4;
    data.push({ date: d, level });
  }
  return data;
};

const yearData = generateYearData();

const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const heatmapColors = [
  "bg-muted",
  "bg-primary/20",
  "bg-primary/40",
  "bg-primary/65",
  "bg-primary",
];

/* ─── Mock data ─── */
const profileStats = [
  { icon: Flame, label: "Current Streak", value: "12 days", color: "text-destructive" },
  { icon: Trophy, label: "Longest Streak", value: "27 days", color: "text-primary" },
  { icon: Target, label: "Problems Solved", value: "142", color: "text-accent" },
  { icon: Zap, label: "Total XP", value: "3,840", color: "text-primary" },
];

const leaderboardUsers = [
  { rank: 1, name: "Arjun Sharma", xp: 12450, streak: 45, solved: 342, icon: Crown },
  { rank: 2, name: "Priya Mehta", xp: 11200, streak: 38, solved: 310, icon: Gem },
  { rank: 3, name: "Rahul Verma", xp: 10800, streak: 42, solved: 298, icon: Medal },
  { rank: 4, name: "Sneha Patel", xp: 9600, streak: 30, solved: 275 },
  { rank: 5, name: "Vikram Reddy", xp: 9100, streak: 28, solved: 260 },
  { rank: 6, name: "Anika Gupta", xp: 8700, streak: 25, solved: 245 },
  { rank: 7, name: "Dev Kapoor", xp: 8200, streak: 22, solved: 230 },
  { rank: 8, name: "Meera Joshi", xp: 7800, streak: 20, solved: 218 },
  { rank: 9, name: "Karan Singh", xp: 7400, streak: 18, solved: 205 },
  { rank: 10, name: "Riya Nair", xp: 7000, streak: 16, solved: 192 },
];

const achievements = [
  { icon: Flame, title: "7-Day Streak", desc: "Code 7 days in a row", unlocked: true },
  { icon: Target, title: "Century Club", desc: "Solve 100 problems", unlocked: true },
  { icon: Gauge, title: "Speed Demon", desc: "Solve 5 problems in 1 hour", unlocked: true },
  { icon: Trophy, title: "Top 10", desc: "Reach top 10 on leaderboard", unlocked: false },
  { icon: Crosshair, title: "Perfect Score", desc: "Score 100% on a mock test", unlocked: false },
  { icon: Rocket, title: "Path Master", desc: "Complete an entire learning path", unlocked: false },
];

const recentActivity = [
  { action: "Solved", item: "Two Sum", time: "2 hours ago", xp: 25 },
  { action: "Completed", item: "Binary Search module", time: "5 hours ago", xp: 100 },
  { action: "Solved", item: "Valid Parentheses", time: "1 day ago", xp: 30 },
  { action: "Started", item: "Dynamic Programming path", time: "2 days ago", xp: 10 },
  { action: "Solved", item: "Merge Two Sorted Lists", time: "2 days ago", xp: 35 },
];

/* ─── Year Heatmap Component ─── */
const YearHeatmap = () => {
  const weeks = useMemo(() => {
    const w: { date: Date; level: number }[][] = [];
    let currentWeek: { date: Date; level: number }[] = [];
    // Pad start to align to Sunday
    const firstDay = yearData[0].date.getDay();
    for (let i = 0; i < firstDay; i++) {
      currentWeek.push({ date: new Date(0), level: -1 });
    }
    yearData.forEach((d) => {
      currentWeek.push(d);
      if (currentWeek.length === 7) {
        w.push(currentWeek);
        currentWeek = [];
      }
    });
    if (currentWeek.length > 0) w.push(currentWeek);
    return w;
  }, []);

  // Get month positions for labels
  const monthPositions = useMemo(() => {
    const positions: { month: number; weekIndex: number }[] = [];
    let lastMonth = -1;
    weeks.forEach((week, wi) => {
      const validDay = week.find((d) => d.level >= 0);
      if (validDay && validDay.date.getMonth() !== lastMonth) {
        lastMonth = validDay.date.getMonth();
        positions.push({ month: lastMonth, weekIndex: wi });
      }
    });
    return positions;
  }, [weeks]);

  const totalContributions = yearData.filter((d) => d.level > 0).length;

  return (
    <div className="bg-card rounded-xl border border-border p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display font-bold text-sm flex items-center gap-2 text-card-foreground">
          <Calendar size={15} className="text-primary" />
          {totalContributions} contributions in the last year
        </h2>
      </div>

      {/* Month labels */}
      <div className="overflow-x-auto">
        <div className="min-w-[680px]">
          <div className="flex text-[10px] text-muted-foreground mb-1 ml-[30px]">
            {monthPositions.map((mp) => (
              <span
                key={`${mp.month}-${mp.weekIndex}`}
                className="absolute"
                style={{ marginLeft: `${mp.weekIndex * 13}px` }}
              >
                {monthLabels[mp.month]}
              </span>
            ))}
          </div>

          <div className="flex gap-[1px] relative mt-4">
            {/* Day labels */}
            <div className="flex flex-col gap-[1px] pr-1.5 text-[9px] text-muted-foreground justify-between shrink-0 w-[26px]">
              <span className="h-[10px]"></span>
              <span className="h-[10px] flex items-center">Mon</span>
              <span className="h-[10px]"></span>
              <span className="h-[10px] flex items-center">Wed</span>
              <span className="h-[10px]"></span>
              <span className="h-[10px] flex items-center">Fri</span>
              <span className="h-[10px]"></span>
            </div>

            {/* Grid */}
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[1px]">
                {week.map((day, di) => (
                  <Tooltip key={`${wi}-${di}`}>
                    <TooltipTrigger asChild>
                      <div
                        className={`w-[10px] h-[10px] rounded-[2px] transition-colors ${
                          day.level === -1
                            ? "bg-transparent"
                            : heatmapColors[day.level]
                        }`}
                      />
                    </TooltipTrigger>
                    {day.level >= 0 && (
                      <TooltipContent side="top" className="text-xs">
                        {day.level === 0
                          ? "No activity"
                          : `${day.level} contribution${day.level > 1 ? "s" : ""}`}{" "}
                        on {day.date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </TooltipContent>
                    )}
                  </Tooltip>
                ))}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-1.5 mt-2 text-[10px] text-muted-foreground">
            <span>Less</span>
            {heatmapColors.map((c, i) => (
              <div key={i} className={`w-[10px] h-[10px] rounded-[2px] ${c}`} />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Profile Page ─── */
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
            className="bg-card rounded-2xl border border-border p-5 sm:p-6 mb-4"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Avatar className="h-14 w-14 border-2 border-primary/30 shadow-lg">
                <AvatarImage src={profile?.avatar_url || undefined} />
                <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h1 className="font-display text-xl sm:text-2xl font-bold text-card-foreground">
                  {displayName}
                </h1>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {user?.email || "Start your coding journey today"}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs shrink-0">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-destructive/10 text-destructive font-semibold">
                  <Flame size={13} /> 12 days
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-primary/10 text-primary font-semibold">
                  <Zap size={13} /> 3,840 XP
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-accent/10 text-accent font-semibold">
                  <Target size={13} /> 142 solved
                </div>
              </div>
            </div>
          </motion.div>

          {/* ─── Year Heatmap ─── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-4"
          >
            <YearHeatmap />
          </motion.div>

          {/* ─── Tabbed Content ─── */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start bg-card border border-border rounded-xl p-1 mb-4 overflow-x-auto">
              <TabsTrigger value="overview" className="gap-1.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <TrendingUp size={13} /> Overview
              </TabsTrigger>
              <TabsTrigger value="leaderboard" className="gap-1.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Trophy size={13} /> Leaderboard
              </TabsTrigger>
              <TabsTrigger value="achievements" className="gap-1.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Award size={13} /> Achievements
              </TabsTrigger>
            </TabsList>

            {/* Overview */}
            <TabsContent value="overview">
              <div className="grid lg:grid-cols-5 gap-4">
                {/* Stats cards */}
                <div className="lg:col-span-2 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    {profileStats.map((s) => (
                      <div key={s.label} className="bg-card rounded-xl border border-border p-3.5 text-center">
                        <s.icon size={18} className={`mx-auto mb-1.5 ${s.color}`} />
                        <div className="font-display font-bold text-base text-card-foreground">{s.value}</div>
                        <div className="text-[10px] text-muted-foreground mt-0.5">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Learning Progress */}
                  <div className="bg-card rounded-xl border border-border p-4">
                    <h2 className="font-display font-bold text-sm mb-3 flex items-center gap-2 text-card-foreground">
                      <BookOpen size={14} className="text-accent" /> Learning Progress
                    </h2>
                    <div className="space-y-3">
                      {[
                        { path: "DSA Fundamentals", progress: 72 },
                        { path: "B.Tech Core Subjects", progress: 45 },
                        { path: "System Design", progress: 18 },
                      ].map((p) => (
                        <div key={p.path}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="font-medium text-card-foreground">{p.path}</span>
                            <span className="text-muted-foreground">{p.progress}%</span>
                          </div>
                          <Progress value={p.progress} className="h-1.5" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Streak milestones compact */}
                  <div className="bg-card rounded-xl border border-border p-4">
                    <h2 className="font-display font-bold text-sm mb-3 flex items-center gap-2 text-card-foreground">
                      <Shield size={14} className="text-primary" /> Streak Milestones
                    </h2>
                    <div className="space-y-2">
                      {[
                        { days: 7, label: "1 Week", reached: true, icon: CheckCircle2 },
                        { days: 14, label: "2 Weeks", reached: false, icon: Lock },
                        { days: 30, label: "1 Month", reached: false, icon: Lock },
                      ].map((m) => (
                        <div key={m.days} className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                          m.reached ? "bg-accent/5 border border-accent/20" : "bg-muted/30 border border-border"
                        }`}>
                          <m.icon size={14} className={m.reached ? "text-accent" : "text-muted-foreground"} />
                          <div className="flex-1 min-w-0">
                            <span className="text-xs font-semibold text-card-foreground">{m.label}</span>
                            <span className="text-[10px] text-muted-foreground ml-2">{m.days}-day streak</span>
                          </div>
                          {!m.reached && (
                            <div className="w-16">
                              <Progress value={(12 / m.days) * 100} className="h-1" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="lg:col-span-3 bg-card rounded-xl border border-border p-4">
                  <h2 className="font-display font-bold text-sm mb-3 flex items-center gap-2 text-card-foreground">
                    <Clock size={14} className="text-primary" /> Recent Activity
                  </h2>
                  <div className="space-y-0.5">
                    {recentActivity.map((a, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="flex items-center justify-between py-2 px-2.5 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            {a.action === "Solved" ? <Code2 size={13} className="text-primary" /> :
                             a.action === "Completed" ? <BookOpen size={13} className="text-accent" /> :
                             <Star size={13} className="text-primary" />}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs text-card-foreground font-medium truncate">
                              {a.action} <span className="text-primary">{a.item}</span>
                            </p>
                            <p className="text-[10px] text-muted-foreground">{a.time}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold text-accent shrink-0">+{a.xp} XP</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Leaderboard */}
            <TabsContent value="leaderboard">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                {/* Top 3 */}
                <div className="grid grid-cols-3 gap-3">
                  {leaderboardUsers.slice(0, 3).map((u, i) => {
                    const RankIcon = u.icon!;
                    const rankColors = [
                      "text-yellow-500 ring-yellow-500/20",
                      "text-muted-foreground ring-muted-foreground/20",
                      "text-orange-400 ring-orange-400/20",
                    ];
                    return (
                      <motion.div
                        key={u.rank}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className={`bg-card rounded-xl p-4 border border-border text-center ${i === 0 ? "ring-2 " + rankColors[0].split(" ")[1] : ""}`}
                      >
                        <div className={`w-9 h-9 rounded-full mx-auto flex items-center justify-center ${rankColors[i].split(" ")[0]} bg-muted/50`}>
                          <RankIcon size={18} />
                        </div>
                        <h3 className="font-display font-bold text-sm text-card-foreground mt-2 truncate">{u.name}</h3>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{u.xp.toLocaleString()} XP</p>
                        <div className="flex items-center justify-center gap-2.5 mt-2 text-[10px] text-muted-foreground">
                          <span className="flex items-center gap-0.5"><Flame size={10} className="text-destructive" /> {u.streak}d</span>
                          <span className="flex items-center gap-0.5"><Star size={10} className="text-primary" /> {u.solved}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Table */}
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                  <div className="grid grid-cols-[44px_1fr_72px_64px_64px] sm:grid-cols-[52px_1fr_90px_72px_72px] gap-2 px-4 py-2.5 border-b border-border text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                    <span>Rank</span><span>Name</span><span>XP</span><span>Streak</span><span>Solved</span>
                  </div>
                  {leaderboardUsers.slice(3).map((u, i) => (
                    <motion.div
                      key={u.rank}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 + i * 0.03 }}
                      className="grid grid-cols-[44px_1fr_72px_64px_64px] sm:grid-cols-[52px_1fr_90px_72px_72px] gap-2 px-4 py-2.5 border-b border-border last:border-0 hover:bg-muted/50 transition-colors items-center"
                    >
                      <span className="text-xs font-bold text-card-foreground">#{u.rank}</span>
                      <span className="text-xs font-medium text-card-foreground truncate">{u.name}</span>
                      <span className="text-xs text-muted-foreground">{u.xp.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-0.5"><Flame size={10} className="text-destructive" /> {u.streak}d</span>
                      <span className="text-xs text-muted-foreground">{u.solved}</span>
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
                      transition={{ delay: i * 0.04 }}
                      className={`bg-card rounded-xl border p-3.5 flex items-center gap-3 ${
                        a.unlocked
                          ? "border-accent/30"
                          : "border-border opacity-50"
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        a.unlocked ? "bg-accent/10" : "bg-muted"
                      }`}>
                        <a.icon size={16} className={a.unlocked ? "text-accent" : "text-muted-foreground"} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display font-bold text-xs text-card-foreground">{a.title}</h3>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{a.desc}</p>
                      </div>
                      {a.unlocked ? (
                        <CheckCircle2 size={14} className="text-accent shrink-0" />
                      ) : (
                        <Lock size={14} className="text-muted-foreground shrink-0" />
                      )}
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

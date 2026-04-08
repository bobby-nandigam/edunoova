import { useMemo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Flame, Trophy, Calendar, Target, Zap, Star,
  BookOpen, Code2, Clock, Award, TrendingUp,
  CheckCircle2, Lock, Shield, Crosshair, Gauge, Rocket,
  Medal, Crown, Gem, Loader2,
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
import { useUserStats } from "@/hooks/useUserStats";
import { supabase } from "@/integrations/supabase/client";

const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const heatmapColors = [
  "bg-muted",
  "bg-primary/20",
  "bg-primary/40",
  "bg-primary/65",
  "bg-primary",
];

const iconMap: Record<string, any> = {
  flame: Flame, target: Target, gauge: Gauge, trophy: Trophy,
  crosshair: Crosshair, rocket: Rocket, star: Star, shield: Shield,
  award: Award, zap: Zap,
};

type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
};

type LeaderEntry = {
  user_id: string;
  display_name: string | null;
  total_xp: number;
  total_solved: number;
  active_days: number;
};

/* ─── Year Heatmap Component ─── */
const YearHeatmap = ({ streakDates }: { streakDates: { date: string; xp: number }[] }) => {
  const yearData = useMemo(() => {
    const today = new Date();
    const dateSet = new Map(streakDates.map(s => [s.date, s.xp]));
    const data: { date: Date; level: number }[] = [];
    for (let i = 364; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split("T")[0];
      const xp = dateSet.get(key) || 0;
      let level = 0;
      if (xp > 0) level = 1;
      if (xp >= 20) level = 2;
      if (xp >= 50) level = 3;
      if (xp >= 100) level = 4;
      data.push({ date: d, level });
    }
    return data;
  }, [streakDates]);

  const weeks = useMemo(() => {
    const w: { date: Date; level: number }[][] = [];
    let currentWeek: { date: Date; level: number }[] = [];
    const firstDay = yearData[0].date.getDay();
    for (let i = 0; i < firstDay; i++) {
      currentWeek.push({ date: new Date(0), level: -1 });
    }
    yearData.forEach(d => {
      currentWeek.push(d);
      if (currentWeek.length === 7) {
        w.push(currentWeek);
        currentWeek = [];
      }
    });
    if (currentWeek.length > 0) w.push(currentWeek);
    return w;
  }, [yearData]);

  const totalContributions = yearData.filter(d => d.level > 0).length;

  return (
    <div className="bg-card rounded-xl border border-border p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display font-bold text-sm flex items-center gap-2 text-card-foreground">
          <Calendar size={15} className="text-primary" />
          {totalContributions} contributions in the last year
        </h2>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[680px]">
          <div className="flex gap-[1px] relative mt-4">
            <div className="flex flex-col gap-[1px] pr-1.5 text-[9px] text-muted-foreground justify-between shrink-0 w-[26px]">
              <span className="h-[10px]"></span>
              <span className="h-[10px] flex items-center">Mon</span>
              <span className="h-[10px]"></span>
              <span className="h-[10px] flex items-center">Wed</span>
              <span className="h-[10px]"></span>
              <span className="h-[10px] flex items-center">Fri</span>
              <span className="h-[10px]"></span>
            </div>
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[1px]">
                {week.map((day, di) => (
                  <Tooltip key={`${wi}-${di}`}>
                    <TooltipTrigger asChild>
                      <div
                        className={`w-[10px] h-[10px] rounded-[2px] transition-colors ${
                          day.level === -1 ? "bg-transparent" : heatmapColors[day.level]
                        }`}
                      />
                    </TooltipTrigger>
                    {day.level >= 0 && (
                      <TooltipContent side="top" className="text-xs">
                        {day.level === 0 ? "No activity" : `Active`} on {day.date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </TooltipContent>
                    )}
                  </Tooltip>
                ))}
              </div>
            ))}
          </div>
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
  const stats = useUserStats();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderEntry[]>([]);
  const [progressData, setProgressData] = useState<{ path: string; total: number; completed: number }[]>([]);
  const [loadingExtra, setLoadingExtra] = useState(true);

  useEffect(() => {
    const fetchExtra = async () => {
      // Achievements
      const { data: allAch } = await supabase.from("achievements").select("*");
      let unlockedIds = new Set<string>();
      if (user) {
        const { data: userAch } = await supabase
          .from("user_achievements")
          .select("achievement_id")
          .eq("user_id", user.id);
        unlockedIds = new Set((userAch || []).map(a => a.achievement_id));
      }
      setAchievements((allAch || []).map(a => ({
        ...a,
        unlocked: unlockedIds.has(a.id),
      })));

      // Leaderboard
      const { data: lb } = await supabase.from("leaderboard_view").select("*").limit(10);
      setLeaderboard((lb || []) as LeaderEntry[]);

      // Progress
      if (user) {
        const { data: prog } = await supabase
          .from("user_progress")
          .select("path_slug, module_index, topic_index")
          .eq("user_id", user.id);
        
        const pathMap = new Map<string, number>();
        (prog || []).forEach(p => {
          pathMap.set(p.path_slug, (pathMap.get(p.path_slug) || 0) + 1);
        });
        setProgressData(
          Array.from(pathMap.entries()).map(([path, completed]) => ({
            path: path.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
            total: 100,
            completed,
          }))
        );
      }

      setLoadingExtra(false);
    };
    fetchExtra();
  }, [user]);

  const displayName = profile?.display_name || user?.email?.split("@")[0] || "Learner";
  const initials = displayName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);

  const profileStats = [
    { icon: Flame, label: "Current Streak", value: `${stats.currentStreak} days`, color: "text-destructive" },
    { icon: Trophy, label: "Longest Streak", value: `${stats.longestStreak} days`, color: "text-primary" },
    { icon: Target, label: "Problems Solved", value: stats.totalSolved.toLocaleString(), color: "text-accent" },
    { icon: Zap, label: "Total XP", value: stats.totalXP.toLocaleString(), color: "text-primary" },
  ];

  const rankIcons = [Crown, Gem, Medal];

  return (
    <main>
      <Navbar />
      <div className="pt-24 pb-12 min-h-screen section-gradient">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          {/* Profile Header */}
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
                <h1 className="font-display text-xl sm:text-2xl font-bold text-card-foreground">{displayName}</h1>
                <p className="text-xs text-muted-foreground mt-0.5">{user?.email || "Start your coding journey today"}</p>
              </div>
              <div className="flex items-center gap-2 text-xs shrink-0">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-destructive/10 text-destructive font-semibold">
                  <Flame size={13} /> {stats.currentStreak} days
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-primary/10 text-primary font-semibold">
                  <Zap size={13} /> {stats.totalXP.toLocaleString()} XP
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-accent/10 text-accent font-semibold">
                  <Target size={13} /> {stats.totalSolved} solved
                </div>
              </div>
            </div>
          </motion.div>

          {/* Year Heatmap */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-4">
            <YearHeatmap streakDates={stats.streakDates} />
          </motion.div>

          {/* Tabbed Content */}
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
                <div className="lg:col-span-2 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    {profileStats.map(s => (
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
                    {progressData.length === 0 ? (
                      <p className="text-xs text-muted-foreground">No learning progress yet. Start a path!</p>
                    ) : (
                      <div className="space-y-3">
                        {progressData.map(p => (
                          <div key={p.path}>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="font-medium text-card-foreground">{p.path}</span>
                              <span className="text-muted-foreground">{p.completed} topics</span>
                            </div>
                            <Progress value={Math.min((p.completed / p.total) * 100, 100)} className="h-1.5" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Streak milestones */}
                  <div className="bg-card rounded-xl border border-border p-4">
                    <h2 className="font-display font-bold text-sm mb-3 flex items-center gap-2 text-card-foreground">
                      <Shield size={14} className="text-primary" /> Streak Milestones
                    </h2>
                    <div className="space-y-2">
                      {[
                        { days: 7, label: "1 Week" },
                        { days: 14, label: "2 Weeks" },
                        { days: 30, label: "1 Month" },
                      ].map(m => {
                        const reached = stats.longestStreak >= m.days;
                        return (
                          <div key={m.days} className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                            reached ? "bg-accent/5 border border-accent/20" : "bg-muted/30 border border-border"
                          }`}>
                            {reached ? <CheckCircle2 size={14} className="text-accent" /> : <Lock size={14} className="text-muted-foreground" />}
                            <div className="flex-1 min-w-0">
                              <span className="text-xs font-semibold text-card-foreground">{m.label}</span>
                              <span className="text-[10px] text-muted-foreground ml-2">{m.days}-day streak</span>
                            </div>
                            {!reached && (
                              <div className="w-16">
                                <Progress value={(stats.currentStreak / m.days) * 100} className="h-1" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Activity Summary */}
                <div className="lg:col-span-3 bg-card rounded-xl border border-border p-4">
                  <h2 className="font-display font-bold text-sm mb-3 flex items-center gap-2 text-card-foreground">
                    <Clock size={14} className="text-primary" /> Recent Activity
                  </h2>
                  {stats.streakDates.length === 0 ? (
                    <p className="text-xs text-muted-foreground py-8 text-center">No activity yet. Start solving problems!</p>
                  ) : (
                    <div className="space-y-0.5">
                      {stats.streakDates.slice(0, 10).map((a, i) => (
                        <motion.div
                          key={a.date}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                          className="flex items-center justify-between py-2 px-2.5 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                              <Code2 size={13} className="text-primary" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs text-card-foreground font-medium">
                                Solved <span className="text-primary">{a.solved} problems</span>
                              </p>
                              <p className="text-[10px] text-muted-foreground">{new Date(a.date).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-semibold text-accent shrink-0">+{a.xp} XP</span>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Leaderboard */}
            <TabsContent value="leaderboard">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                {leaderboard.length === 0 ? (
                  <p className="text-center text-muted-foreground py-12">No leaderboard data yet.</p>
                ) : (
                  <>
                    {leaderboard.length >= 3 && (
                      <div className="grid grid-cols-3 gap-3">
                        {leaderboard.slice(0, 3).map((u, i) => {
                          const RankIcon = rankIcons[i];
                          const rankColors = ["text-yellow-500", "text-muted-foreground", "text-orange-400"];
                          return (
                            <motion.div
                              key={u.user_id}
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.08 }}
                              className={`bg-card rounded-xl p-4 border border-border text-center ${i === 0 ? "ring-2 ring-yellow-500/20" : ""}`}
                            >
                              <div className={`w-9 h-9 rounded-full mx-auto flex items-center justify-center ${rankColors[i]} bg-muted/50`}>
                                <RankIcon size={18} />
                              </div>
                              <h3 className="font-display font-bold text-sm text-card-foreground mt-2 truncate">{u.display_name || "Anonymous"}</h3>
                              <p className="text-[11px] text-muted-foreground mt-0.5">{Number(u.total_xp).toLocaleString()} XP</p>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                    {leaderboard.length > 3 && (
                      <div className="bg-card rounded-xl border border-border overflow-hidden">
                        <div className="grid grid-cols-[44px_1fr_72px_64px_64px] sm:grid-cols-[52px_1fr_90px_72px_72px] gap-2 px-4 py-2.5 border-b border-border text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                          <span>Rank</span><span>Name</span><span>XP</span><span>Active</span><span>Solved</span>
                        </div>
                        {leaderboard.slice(3).map((u, i) => (
                          <motion.div
                            key={u.user_id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 + i * 0.03 }}
                            className="grid grid-cols-[44px_1fr_72px_64px_64px] sm:grid-cols-[52px_1fr_90px_72px_72px] gap-2 px-4 py-2.5 border-b border-border last:border-0 hover:bg-muted/50 transition-colors items-center"
                          >
                            <span className="text-xs font-bold text-card-foreground">#{i + 4}</span>
                            <span className="text-xs font-medium text-card-foreground truncate">{u.display_name || "Anonymous"}</span>
                            <span className="text-xs text-muted-foreground">{Number(u.total_xp).toLocaleString()}</span>
                            <span className="text-xs text-muted-foreground">{u.active_days}d</span>
                            <span className="text-xs text-muted-foreground">{Number(u.total_solved)}</span>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            </TabsContent>

            {/* Achievements */}
            <TabsContent value="achievements">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {loadingExtra ? (
                  <div className="flex justify-center py-12"><Loader2 className="animate-spin text-primary" size={24} /></div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {achievements.map((a, i) => {
                      const IconComp = iconMap[a.icon] || Trophy;
                      return (
                        <motion.div
                          key={a.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.04 }}
                          className={`bg-card rounded-xl border p-3.5 flex items-center gap-3 ${
                            a.unlocked ? "border-accent/30" : "border-border opacity-50"
                          }`}
                        >
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                            a.unlocked ? "bg-accent/10" : "bg-muted"
                          }`}>
                            <IconComp size={16} className={a.unlocked ? "text-accent" : "text-muted-foreground"} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-display font-bold text-xs text-card-foreground">{a.title}</h3>
                            <p className="text-[10px] text-muted-foreground mt-0.5">{a.description}</p>
                          </div>
                          {a.unlocked ? (
                            <CheckCircle2 size={14} className="text-accent shrink-0" />
                          ) : (
                            <Lock size={14} className="text-muted-foreground shrink-0" />
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                )}
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

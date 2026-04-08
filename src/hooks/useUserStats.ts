import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export type UserStats = {
  currentStreak: number;
  longestStreak: number;
  totalSolved: number;
  totalXP: number;
  streakDates: { date: string; xp: number; solved: number }[];
  loading: boolean;
};

export const useUserStats = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats>({
    currentStreak: 0, longestStreak: 0, totalSolved: 0, totalXP: 0,
    streakDates: [], loading: true,
  });

  useEffect(() => {
    if (!user) {
      setStats(s => ({ ...s, loading: false }));
      return;
    }

    const fetch = async () => {
      const { data } = await supabase
        .from("user_streaks")
        .select("*")
        .eq("user_id", user.id)
        .order("activity_date", { ascending: false });

      const rows = data || [];
      const totalSolved = rows.reduce((s, r) => s + (r.problems_solved || 0), 0);
      const totalXP = rows.reduce((s, r) => s + (r.xp_earned || 0), 0);

      // Calculate current streak
      let currentStreak = 0;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      for (let i = 0; i < rows.length; i++) {
        const d = new Date(rows[i].activity_date);
        d.setHours(0, 0, 0, 0);
        const expected = new Date(today);
        expected.setDate(expected.getDate() - i);
        if (d.getTime() === expected.getTime()) {
          currentStreak++;
        } else break;
      }

      // Calculate longest streak
      let longestStreak = 0;
      let streak = 0;
      const sortedAsc = [...rows].reverse();
      for (let i = 0; i < sortedAsc.length; i++) {
        if (i === 0) { streak = 1; continue; }
        const prev = new Date(sortedAsc[i - 1].activity_date);
        const curr = new Date(sortedAsc[i].activity_date);
        const diff = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
        if (diff === 1) streak++;
        else streak = 1;
        longestStreak = Math.max(longestStreak, streak);
      }
      longestStreak = Math.max(longestStreak, streak);

      setStats({
        currentStreak, longestStreak, totalSolved, totalXP,
        streakDates: rows.map(r => ({ date: r.activity_date, xp: r.xp_earned, solved: r.problems_solved })),
        loading: false,
      });
    };

    fetch();
  }, [user]);

  return stats;
};

// Record activity for today
export const recordActivity = async (userId: string, problemsSolved = 0, xpEarned = 0) => {
  const today = new Date().toISOString().split("T")[0];
  
  // Try to upsert (insert or update) for today
  const { data: existing } = await supabase
    .from("user_streaks")
    .select("*")
    .eq("user_id", userId)
    .eq("activity_date", today)
    .single();

  if (existing) {
    await supabase
      .from("user_streaks")
      .update({
        problems_solved: existing.problems_solved + problemsSolved,
        xp_earned: existing.xp_earned + xpEarned,
      })
      .eq("id", existing.id);
  } else {
    await supabase
      .from("user_streaks")
      .insert({ user_id: userId, activity_date: today, problems_solved: problemsSolved, xp_earned: xpEarned });
  }
};

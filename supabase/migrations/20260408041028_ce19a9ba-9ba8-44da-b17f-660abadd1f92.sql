
DROP VIEW IF EXISTS public.leaderboard_view;
CREATE VIEW public.leaderboard_view
WITH (security_invoker=on) AS
SELECT 
  p.user_id,
  p.display_name,
  p.avatar_url,
  COALESCE(SUM(s.xp_earned), 0) AS total_xp,
  COALESCE(SUM(s.problems_solved), 0) AS total_solved,
  COUNT(DISTINCT s.activity_date) AS active_days
FROM public.profiles p
LEFT JOIN public.user_streaks s ON s.user_id = p.user_id
GROUP BY p.user_id, p.display_name, p.avatar_url
ORDER BY total_xp DESC;

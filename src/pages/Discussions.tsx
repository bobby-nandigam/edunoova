import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageSquare, ThumbsUp, Clock, User, Plus, Send, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { formatDistanceToNow } from "date-fns";

type Discussion = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  tag: string;
  likes_count: number;
  replies_count: number;
  created_at: string;
  author_name?: string;
};

const tags = ["All", "DSA", "Interview", "AI/ML", "System Design", "General", "Debugging"];

const Discussions = () => {
  const { user, profile } = useAuth();
  const [activeTag, setActiveTag] = useState("All");
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newTag, setNewTag] = useState("General");
  const [submitting, setSubmitting] = useState(false);

  const fetchDiscussions = async () => {
    const { data } = await supabase
      .from("discussions")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) {
      // Fetch author profiles
      const userIds = [...new Set(data.map(d => d.user_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, display_name")
        .in("user_id", userIds);

      const profileMap = new Map((profiles || []).map(p => [p.user_id, p.display_name || "Anonymous"]));
      
      setDiscussions(data.map(d => ({
        ...d,
        author_name: profileMap.get(d.user_id) || "Anonymous",
      })));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDiscussions();

    const channel = supabase
      .channel("discussions-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "discussions" }, () => {
        fetchDiscussions();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const handleCreate = async () => {
    if (!user) {
      toast({ title: "Please sign in", description: "You need to be logged in to create a discussion.", variant: "destructive" });
      return;
    }
    if (!newTitle.trim()) return;
    setSubmitting(true);

    const { error } = await supabase.from("discussions").insert({
      user_id: user.id,
      title: newTitle.trim(),
      content: newContent.trim(),
      tag: newTag,
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setNewTitle("");
      setNewContent("");
      setShowNew(false);
      toast({ title: "Discussion created!" });
    }
    setSubmitting(false);
  };

  const handleLike = async (discussionId: string) => {
    if (!user) {
      toast({ title: "Please sign in", variant: "destructive" });
      return;
    }
    // Toggle like
    const { data: existing } = await supabase
      .from("discussion_likes")
      .select("id")
      .eq("discussion_id", discussionId)
      .eq("user_id", user.id)
      .maybeSingle();

    if (existing) {
      await supabase.from("discussion_likes").delete().eq("id", existing.id);
    } else {
      await supabase.from("discussion_likes").insert({ discussion_id: discussionId, user_id: user.id });
    }
    fetchDiscussions();
  };

  const filtered = activeTag === "All" ? discussions : discussions.filter(t => t.tag === activeTag);

  return (
    <main>
      <Navbar />
      <div className="pt-32 pb-20 min-h-screen section-gradient">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-2">
              <h1 className="font-display text-3xl sm:text-4xl font-bold">
                <span className="gradient-text">Discussions</span>
              </h1>
              <button
                onClick={() => setShowNew(!showNew)}
                className="gradient-btn text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
              >
                <Plus size={16} /> New Discussion
              </button>
            </div>
            <p className="text-muted-foreground mb-8">Ask questions, share insights, and learn together.</p>

            {showNew && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-card rounded-xl border border-border p-5 mb-6 space-y-3"
              >
                <input
                  placeholder="Discussion title..."
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:ring-2 focus:ring-ring"
                />
                <textarea
                  placeholder="Describe your question or topic..."
                  value={newContent}
                  onChange={e => setNewContent(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:ring-2 focus:ring-ring resize-none"
                />
                <div className="flex items-center gap-3">
                  <select
                    value={newTag}
                    onChange={e => setNewTag(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-border bg-background text-sm"
                  >
                    {tags.filter(t => t !== "All").map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <button
                    onClick={handleCreate}
                    disabled={submitting || !newTitle.trim()}
                    className="gradient-btn text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 disabled:opacity-50"
                  >
                    {submitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                    Post
                  </button>
                </div>
              </motion.div>
            )}

            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    activeTag === tag ? "gradient-btn text-primary-foreground" : "bg-card border border-border text-card-foreground hover:bg-secondary"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="animate-spin text-primary" size={32} />
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                No discussions yet. Be the first to start one!
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((t, i) => (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="bg-card rounded-xl p-5 border border-border card-hover cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary/10 text-primary">{t.tag}</span>
                        </div>
                        <h3 className="font-display font-semibold text-card-foreground mb-2">{t.title}</h3>
                        {t.content && (
                          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{t.content}</p>
                        )}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><User size={12} /> {t.author_name}</span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} /> {formatDistanceToNow(new Date(t.created_at), { addSuffix: true })}
                          </span>
                          <span className="flex items-center gap-1"><MessageSquare size={12} /> {t.replies_count} replies</span>
                          <button
                            onClick={e => { e.stopPropagation(); handleLike(t.id); }}
                            className="flex items-center gap-1 hover:text-primary transition-colors"
                          >
                            <ThumbsUp size={12} /> {t.likes_count}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Discussions;

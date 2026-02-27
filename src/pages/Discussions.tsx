import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, ThumbsUp, Clock, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const threads = [
  { id: 1, title: "Best approach for Dynamic Programming problems?", author: "Arjun K.", replies: 24, likes: 56, time: "2h ago", tag: "DSA" },
  { id: 2, title: "How to prepare for Google SDE-2 interview?", author: "Priya M.", replies: 18, likes: 42, time: "4h ago", tag: "Interview" },
  { id: 3, title: "Understanding Transformers architecture for NLP", author: "Rahul S.", replies: 12, likes: 35, time: "6h ago", tag: "AI/ML" },
  { id: 4, title: "System Design: How to design a URL shortener?", author: "Sneha P.", replies: 31, likes: 67, time: "8h ago", tag: "System Design" },
  { id: 5, title: "C++ vs Java for competitive programming?", author: "Vikram R.", replies: 45, likes: 89, time: "12h ago", tag: "General" },
  { id: 6, title: "Tips for debugging segmentation faults in C", author: "Anika T.", replies: 9, likes: 21, time: "1d ago", tag: "Debugging" },
  { id: 7, title: "RAG pipeline best practices for production", author: "Dev L.", replies: 15, likes: 38, time: "1d ago", tag: "AI/ML" },
  { id: 8, title: "How to stay consistent with daily coding?", author: "Meera J.", replies: 28, likes: 72, time: "2d ago", tag: "General" },
];

const tags = ["All", "DSA", "Interview", "AI/ML", "System Design", "General", "Debugging"];

const Discussions = () => {
  const [activeTag, setActiveTag] = useState("All");
  const filtered = activeTag === "All" ? threads : threads.filter((t) => t.tag === activeTag);

  return (
    <main>
      <Navbar />
      <div className="pt-32 pb-20 min-h-screen section-gradient">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">
              <span className="gradient-text">Discussions</span>
            </h1>
            <p className="text-muted-foreground mb-8">Ask questions, share insights, and learn together.</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag) => (
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
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><User size={12} /> {t.author}</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {t.time}</span>
                        <span className="flex items-center gap-1"><MessageSquare size={12} /> {t.replies} replies</span>
                        <span className="flex items-center gap-1"><ThumbsUp size={12} /> {t.likes}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Discussions;

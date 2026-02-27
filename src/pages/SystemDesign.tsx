import { motion } from "framer-motion";
import { Layout, ArrowRight, BookOpen, Code2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const topics = [
  { title: "URL Shortener", desc: "Design TinyURL with analytics, rate limiting & caching", level: "Medium" },
  { title: "Chat Application", desc: "Real-time messaging with WebSockets, message queues", level: "Hard" },
  { title: "E-Commerce Platform", desc: "Product catalog, cart, payments, inventory management", level: "Hard" },
  { title: "Social Media Feed", desc: "News feed ranking, fan-out on write vs read", level: "Hard" },
  { title: "Rate Limiter", desc: "Token bucket, sliding window algorithms", level: "Medium" },
  { title: "Load Balancer", desc: "Round robin, least connections, health checks", level: "Medium" },
  { title: "Notification System", desc: "Push, email, SMS — multi-channel delivery", level: "Medium" },
  { title: "Video Streaming", desc: "CDN, adaptive bitrate, transcoding pipeline", level: "Hard" },
  { title: "Search Autocomplete", desc: "Trie-based, ranking, real-time suggestions", level: "Medium" },
  { title: "Distributed Cache", desc: "Redis, eviction policies, consistency", level: "Hard" },
  { title: "File Storage (Dropbox)", desc: "Chunking, dedup, sync, metadata service", level: "Hard" },
  { title: "Parking Lot System", desc: "OOP design, LLD, state management", level: "Easy" },
];

const levelColor: Record<string, string> = {
  Easy: "text-green-500 bg-green-500/10",
  Medium: "text-yellow-500 bg-yellow-500/10",
  Hard: "text-red-500 bg-red-500/10",
};

const SystemDesign = () => {
  const navigate = useNavigate();

  return (
    <main>
      <Navbar />
      <div className="pt-32 pb-20 min-h-screen section-gradient">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">
              System <span className="gradient-text">Design</span>
            </h1>
            <p className="text-muted-foreground mb-10">Master HLD & LLD with real-world system design problems.</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {topics.map((t, i) => (
                <motion.div
                  key={t.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="bg-card rounded-xl p-5 border border-border card-hover cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <Layout size={18} className="text-primary" />
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${levelColor[t.level]}`}>{t.level}</span>
                  </div>
                  <h3 className="font-display font-semibold text-card-foreground mb-1">{t.title}</h3>
                  <p className="text-xs text-muted-foreground mb-4">{t.desc}</p>
                  <span className="flex items-center gap-1 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn More <ArrowRight size={12} />
                  </span>
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

export default SystemDesign;

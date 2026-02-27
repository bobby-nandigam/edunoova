import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Brain } from "lucide-react";
import { subjects, subjectDisplayNames } from "@/data/learningData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Topics = () => {
  const navigate = useNavigate();
  const entries = Object.entries(subjectDisplayNames);
  const coreCSE = entries.filter(([name, slug]) => subjects[slug]?.category === "Core CSE");
  const aiData = entries.filter(([name, slug]) => subjects[slug]?.category === "AI & Data Science");

  return (
    <main>
      <Navbar />
      <div className="pt-32 pb-20 min-h-screen section-gradient">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">
              All <span className="gradient-text">Topics</span>
            </h1>
            <p className="text-muted-foreground mb-10">Browse the complete subject library and start learning.</p>

            <div className="mb-10">
              <div className="flex items-center gap-2 mb-5">
                <BookOpen size={20} className="text-primary" />
                <h2 className="font-display text-xl font-bold text-foreground">Core Computer Science</h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {coreCSE.map(([name, slug], i) => (
                  <motion.div
                    key={slug}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => navigate(`/subjects/${slug}`)}
                    className="bg-card rounded-xl p-5 border border-border card-hover cursor-pointer"
                  >
                    <h3 className="font-display font-semibold text-card-foreground mb-1">{name}</h3>
                    <p className="text-xs text-muted-foreground">{subjects[slug]?.topics.length} topics</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-5">
                <Brain size={20} className="text-primary" />
                <h2 className="font-display text-xl font-bold text-foreground">AI & Data Science</h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {aiData.map(([name, slug], i) => (
                  <motion.div
                    key={slug}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => navigate(`/subjects/${slug}`)}
                    className="bg-card rounded-xl p-5 border border-border card-hover cursor-pointer"
                  >
                    <h3 className="font-display font-semibold text-card-foreground mb-1">{name}</h3>
                    <p className="text-xs text-muted-foreground">{subjects[slug]?.topics.length} topics</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Topics;

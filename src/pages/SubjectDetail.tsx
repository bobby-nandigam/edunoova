import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, BookOpen } from "lucide-react";
import { subjects, subjectDisplayNames } from "@/data/learningData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SubjectDetail = () => {
  const { slug } = useParams();
  const subject = slug ? subjects[slug] : null;

  // Get display name
  const displayName = Object.entries(subjectDisplayNames).find(
    ([, s]) => s === slug
  )?.[0] || slug || "";

  if (!subject) {
    return (
      <main>
        <Navbar />
        <section className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold mb-4">Subject not found</h1>
            <Link to="/" className="text-primary hover:underline">← Back to Home</Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Navbar />
      <section className="min-h-screen pt-24 pb-16 section-gradient">
        <div className="container mx-auto px-6 max-w-3xl">
          <Link to="/#subjects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft size={16} /> Back to Subjects
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 rounded-xl gradient-btn flex items-center justify-center text-primary-foreground">
                <BookOpen size={22} />
              </div>
              <div>
                <h1 className="font-display text-3xl sm:text-4xl font-bold">{displayName}</h1>
                <span className="text-sm text-muted-foreground">{subject.category}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl border border-border p-8"
          >
            <h2 className="font-display font-semibold mb-5">Topics Covered ({subject.topics.length})</h2>
            <div className="space-y-1">
              {subject.topics.map((topic, i) => (
                <motion.div
                  key={topic}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <span className="w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-sm">{topic}</span>
                  <CheckCircle2 size={14} className="ml-auto text-muted-foreground/40" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-10 text-center">
            <a href="/#onboarding" className="gradient-btn inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground shadow-lg hover:shadow-xl transition-all">
              Start Learning This Subject
            </a>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default SubjectDetail;

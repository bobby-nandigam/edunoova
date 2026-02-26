import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Zap, CheckCircle2 } from "lucide-react";
import { userTypes } from "@/data/learningData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const levelColor: Record<string, string> = {
  Beginner: "bg-accent/15 text-accent",
  Intermediate: "bg-primary/15 text-primary",
  Advanced: "bg-[hsl(260,70%,55%)]/15 text-[hsl(260,70%,55%)]",
  Expert: "bg-destructive/15 text-destructive",
};

const PathDetail = () => {
  const { slug } = useParams();
  const userType = userTypes.find((t) => t.slug === slug);

  if (!userType) {
    return (
      <main>
        <Navbar />
        <section className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold mb-4">Path not found</h1>
            <Link to="/" className="text-primary hover:underline">← Back to Home</Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  const Icon = userType.icon;

  return (
    <main>
      <Navbar />
      <section className="min-h-screen pt-24 pb-16 section-gradient">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link to="/#user-types" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft size={16} /> Back to All Paths
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl gradient-btn flex items-center justify-center text-primary-foreground">
                <Icon size={22} />
              </div>
              <div>
                <h1 className="font-display text-3xl sm:text-4xl font-bold">{userType.title}</h1>
                <p className="text-muted-foreground">{userType.desc}</p>
              </div>
            </div>
          </motion.div>

          <div className="space-y-8">
            {userType.paths.map((path, i) => (
              <motion.div
                key={path.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl border border-border p-8"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <h2 className="font-display text-xl font-bold">{path.title}</h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${levelColor[path.level]}`}>{path.level}</span>
                </div>
                <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1.5"><Clock size={14} /> {path.duration}</span>
                  <span className="flex items-center gap-1.5"><Zap size={14} /> {path.skills}</span>
                </div>
                <h3 className="font-display font-semibold text-sm mb-3">Topics Covered</h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {path.topics.map((topic) => (
                    <div key={topic} className="flex items-center gap-2 text-sm text-muted-foreground py-1.5">
                      <CheckCircle2 size={14} className="text-primary shrink-0" />
                      {topic}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-10 text-center">
            <a href="/#onboarding" className="gradient-btn inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground shadow-lg hover:shadow-xl transition-all">
              Start This Path
            </a>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default PathDetail;

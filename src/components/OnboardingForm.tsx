import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

const educationLevels = ["School (Age 10-14)", "High School", "Undergraduate", "Postgraduate", "Working Professional"];
const careerGoals = ["Software Engineer", "AI/ML Engineer", "Data Scientist", "Full Stack Developer", "Product Manager", "Research Scientist", "Other"];
const learningPaths = ["Foundations", "Programming Basics", "B.Tech CSE Core", "Placement Prep", "AI & ML", "Data Science", "Software Engineering"];
const studyTimes = ["30 minutes", "1 hour", "2 hours", "3+ hours"];

const OnboardingForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="py-24 section-light" id="onboarding">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card-elevated p-12 rounded-2xl">
            <div className="w-16 h-16 mx-auto rounded-full bg-accent flex items-center justify-center text-accent-foreground text-2xl mb-4">✓</div>
            <h3 className="font-display text-2xl italic mb-2">You're All Set!</h3>
            <p className="text-muted-foreground">Your personalized learning plan is being created. We'll get in touch soon!</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 section-light" id="onboarding">
      <div className="container mx-auto px-6 max-w-2xl">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl sm:text-4xl italic mb-4">
            Create Your <span className="text-accent">Learning Plan</span>
          </h2>
          <p className="text-muted-foreground">Tell us about yourself and we'll build a personalized roadmap.</p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="card-elevated rounded-2xl p-8 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1.5">Full Name *</label>
              <input required type="text" maxLength={100} placeholder="John Doe" className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Email *</label>
              <input required type="email" maxLength={255} placeholder="john@example.com" className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1.5">Age *</label>
              <input required type="number" min={10} max={99} placeholder="18" className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Education Level *</label>
              <select required className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option value="">Select...</option>
                {educationLevels.map((l) => <option key={l}>{l}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Current Skills</label>
            <input type="text" maxLength={200} placeholder="e.g., Python basics, HTML/CSS" className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1.5">Career Goal *</label>
              <select required className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option value="">Select...</option>
                {careerGoals.map((g) => <option key={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Preferred Path *</label>
              <select required className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option value="">Select...</option>
                {learningPaths.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1.5">Daily Study Time</label>
              <select className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option value="">Select...</option>
                {studyTimes.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Country</label>
              <input type="text" maxLength={60} placeholder="India" className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            <Send size={16} /> Create My Learning Plan
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default OnboardingForm;

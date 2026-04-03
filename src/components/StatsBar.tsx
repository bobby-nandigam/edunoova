import { motion } from "framer-motion";
import { Users, BookOpen, Award, Code2 } from "lucide-react";

const stats = [
  { icon: Users, value: "10,000+", label: "Active Learners" },
  { icon: BookOpen, value: "50+", label: "Subjects" },
  { icon: Code2, value: "500+", label: "Practice Problems" },
  { icon: Award, value: "95%", label: "Placement Rate" },
];

const StatsBar = () => (
  <section className="py-8 bg-primary/5 border-y border-border">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-3 justify-center"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <s.icon size={18} className="text-primary" />
            </div>
            <div>
              <div className="font-display font-bold text-lg text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsBar;

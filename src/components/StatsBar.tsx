import { motion, useInView } from "framer-motion";
import { Users, BookOpen, Award, Code2, TrendingUp, GraduationCap } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const stats = [
  { icon: Users, value: 10000, suffix: "+", label: "Active Learners" },
  { icon: BookOpen, value: 50, suffix: "+", label: "Subjects" },
  { icon: Code2, value: 500, suffix: "+", label: "Practice Problems" },
  { icon: GraduationCap, value: 95, suffix: "%", label: "Placement Rate" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = value;
    const duration = 1500;
    const step = Math.max(1, Math.floor(end / (duration / 16)));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <div ref={ref} className="font-display font-bold text-2xl sm:text-3xl text-foreground">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

const StatsBar = () => (
  <section className="relative py-14 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5" />
    <div className="container mx-auto px-6 relative z-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div className="w-12 h-12 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-3">
              <s.icon size={22} className="text-primary" />
            </div>
            <AnimatedCounter value={s.value} suffix={s.suffix} />
            <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsBar;

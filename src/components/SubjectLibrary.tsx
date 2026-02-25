import { motion } from "framer-motion";

const coreCSE = [
  "Data Structures & Algorithms", "Operating Systems", "DBMS", "Computer Networks",
  "OOP", "Compilers", "Theory of Computation", "Software Engineering", "Computer Organization",
];

const aiData = [
  "Machine Learning", "Deep Learning", "Data Science", "NLP",
  "Computer Vision", "Generative AI", "MLOps", "Mathematics for ML",
];

const SubjectCard = ({ name, idx }: { name: string; idx: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: idx * 0.03 }}
    className="bg-card rounded-xl p-5 border border-border card-hover group flex flex-col justify-between"
  >
    <h4 className="font-display font-semibold text-sm text-card-foreground mb-3">{name}</h4>
    <span className="text-xs font-semibold text-primary group-hover:underline cursor-pointer">
      View Topics →
    </span>
  </motion.div>
);

const SubjectLibrary = () => (
  <section className="py-24 section-gradient" id="subjects">
    <div className="container mx-auto px-6">
      <div className="text-center mb-14">
        <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
          Complete <span className="gradient-text">Subject Library</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Deep-dive into any CS or AI topic with structured, expert-crafted content.
        </p>
      </div>

      <div className="mb-12">
        <h3 className="font-display text-lg font-semibold mb-5 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full gradient-btn" /> Core CSE
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {coreCSE.map((s, i) => <SubjectCard key={s} name={s} idx={i} />)}
        </div>
      </div>

      <div>
        <h3 className="font-display text-lg font-semibold mb-5 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-accent" /> AI & Data Science
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {aiData.map((s, i) => <SubjectCard key={s} name={s} idx={i} />)}
        </div>
      </div>
    </div>
  </section>
);

export default SubjectLibrary;

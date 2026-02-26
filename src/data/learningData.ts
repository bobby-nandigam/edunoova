import {
  Code, BookOpen, Laptop, Target, Brain, Briefcase,
} from "lucide-react";

export const userTypes = [
  {
    slug: "beginners",
    icon: BookOpen,
    title: "Beginners",
    desc: "Zero to basics in programming & CS fundamentals.",
    paths: [
      { title: "Foundations of Computing", duration: "8 weeks", level: "Beginner", skills: "Logic, Scratch, Basics", topics: ["Binary & Number Systems", "Boolean Logic", "Flowcharts & Pseudocode", "Intro to Scratch", "Basic Problem Solving", "How Computers Work"] },
      { title: "Coding & Programming Basics", duration: "10 weeks", level: "Beginner", skills: "Python, C, Problem Solving", topics: ["Variables & Data Types", "Control Flow", "Functions", "Arrays & Strings", "File I/O", "Intro to C", "Intro to Python", "Mini Projects"] },
    ],
  },
  {
    slug: "high-school",
    icon: Code,
    title: "High School / Intermediate",
    desc: "Data structures, algorithms & competitive coding.",
    paths: [
      { title: "Pre-Engineering CS", duration: "12 weeks", level: "Intermediate", skills: "DSA, Math, Algorithms", topics: ["Linked Lists", "Stacks & Queues", "Trees", "Sorting Algorithms", "Searching Algorithms", "Recursion", "Graph Basics", "Time Complexity"] },
      { title: "Competitive Programming", duration: "10 weeks", level: "Intermediate", skills: "Codeforces, Leetcode, Contests", topics: ["Greedy Algorithms", "Dynamic Programming Basics", "Binary Search", "Two Pointers", "Bit Manipulation", "Number Theory", "Contest Strategies"] },
    ],
  },
  {
    slug: "btech-cse",
    icon: Laptop,
    title: "B.Tech CSE Students",
    desc: "Full university-level CS curriculum coverage.",
    paths: [
      { title: "B.Tech CSE Core Subjects", duration: "24 weeks", level: "Intermediate", skills: "OS, DBMS, CN, OOP", topics: ["Operating Systems", "DBMS & SQL", "Computer Networks", "OOP in Java/C++", "Compiler Design", "Theory of Computation", "Software Engineering", "Computer Organization"] },
      { title: "Software Engineer Path", duration: "20 weeks", level: "Advanced", skills: "Full Stack, DevOps, Cloud", topics: ["HTML/CSS/JS", "React / Next.js", "Node.js & Express", "REST APIs", "Databases", "Docker & CI/CD", "Cloud Basics (AWS)", "System Design Intro"] },
    ],
  },
  {
    slug: "placement",
    icon: Target,
    title: "Placement Aspirants",
    desc: "Crack product-based company interviews.",
    paths: [
      { title: "Placement Preparation", duration: "16 weeks", level: "Advanced", skills: "DSA, System Design, Aptitude", topics: ["Arrays & Hashing", "Trees & Graphs", "Dynamic Programming", "System Design", "Aptitude & Reasoning", "CS Fundamentals Revision", "Company-Wise Questions"] },
      { title: "Interview Mastery", duration: "8 weeks", level: "Advanced", skills: "Mock Interviews, HR, Coding Rounds", topics: ["Behavioral Questions", "HR Round Prep", "Live Mock Interviews", "Resume Building", "Communication Skills", "Offer Negotiation"] },
    ],
  },
  {
    slug: "ai-ml",
    icon: Brain,
    title: "AI / ML Career Seekers",
    desc: "Deep learning, NLP, computer vision & more.",
    paths: [
      { title: "AI & Machine Learning", duration: "20 weeks", level: "Advanced", skills: "ML, DL, NLP, CV", topics: ["Linear Algebra & Stats", "Supervised Learning", "Unsupervised Learning", "Neural Networks", "CNNs", "RNNs & LSTMs", "NLP Fundamentals", "Computer Vision"] },
      { title: "Data Science & AI Engineer", duration: "24 weeks", level: "Expert", skills: "Stats, ML, MLOps, GenAI", topics: ["Exploratory Data Analysis", "Feature Engineering", "Model Evaluation", "MLOps & Pipelines", "Transformers", "LLMs & Prompt Engineering", "RAG Systems", "Deployment"] },
    ],
  },
  {
    slug: "professionals",
    icon: Briefcase,
    title: "Professionals",
    desc: "Upskill with AI, system design & advanced topics.",
    paths: [
      { title: "Advanced System Design", duration: "12 weeks", level: "Advanced", skills: "HLD, LLD, Scalability", topics: ["High-Level Design", "Low-Level Design", "Load Balancing", "Caching Strategies", "Database Sharding", "Microservices", "Event-Driven Architecture"] },
      { title: "GenAI & MLOps", duration: "16 weeks", level: "Expert", skills: "LLMs, RAG, Deployment", topics: ["Transformer Architecture", "Fine-Tuning LLMs", "RAG Pipelines", "Vector Databases", "Model Serving", "Monitoring & Observability", "Cost Optimization"] },
    ],
  },
];

export const subjects: Record<string, { category: string; topics: string[] }> = {
  "data-structures-algorithms": { category: "Core CSE", topics: ["Arrays & Strings", "Linked Lists", "Stacks & Queues", "Trees & BST", "Graphs", "Hashing", "Heaps", "Sorting Algorithms", "Searching Algorithms", "Dynamic Programming", "Greedy Algorithms", "Backtracking", "Divide & Conquer", "Time & Space Complexity"] },
  "operating-systems": { category: "Core CSE", topics: ["Process Management", "Threads & Concurrency", "CPU Scheduling", "Deadlocks", "Memory Management", "Virtual Memory", "File Systems", "I/O Systems", "System Calls", "Inter-Process Communication"] },
  "dbms": { category: "Core CSE", topics: ["ER Model", "Relational Model", "SQL Queries", "Normalization", "Transactions & ACID", "Concurrency Control", "Indexing", "Query Optimization", "NoSQL Basics", "Database Security"] },
  "computer-networks": { category: "Core CSE", topics: ["OSI & TCP/IP Model", "Data Link Layer", "Network Layer & IP", "Transport Layer (TCP/UDP)", "Application Layer (HTTP, DNS)", "Routing Algorithms", "Subnetting", "Network Security", "Firewalls", "Socket Programming"] },
  "oop": { category: "Core CSE", topics: ["Classes & Objects", "Inheritance", "Polymorphism", "Encapsulation", "Abstraction", "Interfaces", "Design Patterns", "SOLID Principles", "UML Diagrams"] },
  "compilers": { category: "Core CSE", topics: ["Lexical Analysis", "Syntax Analysis", "Parsing Techniques", "Semantic Analysis", "Intermediate Code", "Code Optimization", "Code Generation", "Symbol Tables", "Error Handling"] },
  "theory-of-computation": { category: "Core CSE", topics: ["Finite Automata (DFA/NFA)", "Regular Expressions", "Context-Free Grammars", "Pushdown Automata", "Turing Machines", "Decidability", "Complexity Classes (P, NP)", "Reductions"] },
  "software-engineering": { category: "Core CSE", topics: ["SDLC Models", "Agile & Scrum", "Requirements Engineering", "System Design", "Testing Strategies", "Version Control (Git)", "CI/CD", "Code Review", "Documentation"] },
  "computer-organization": { category: "Core CSE", topics: ["Number Representation", "ALU Design", "Processor Design", "Pipelining", "Memory Hierarchy", "Cache Memory", "I/O Organization", "RISC vs CISC", "Assembly Basics"] },
  "machine-learning": { category: "AI & Data Science", topics: ["Linear Regression", "Logistic Regression", "Decision Trees", "Random Forests", "SVM", "K-Means Clustering", "PCA", "Ensemble Methods", "Model Evaluation", "Bias-Variance Tradeoff"] },
  "deep-learning": { category: "AI & Data Science", topics: ["Perceptrons & MLPs", "Backpropagation", "CNNs", "RNNs & LSTMs", "GANs", "Autoencoders", "Transfer Learning", "Regularization", "Optimizers", "Batch Normalization"] },
  "data-science": { category: "AI & Data Science", topics: ["Data Wrangling", "Exploratory Data Analysis", "Statistical Testing", "Data Visualization", "Feature Engineering", "Pandas & NumPy", "SQL for Data Science", "A/B Testing", "Dashboarding"] },
  "nlp": { category: "AI & Data Science", topics: ["Tokenization", "Word Embeddings", "Seq2Seq Models", "Attention Mechanism", "Transformers", "BERT & GPT", "Sentiment Analysis", "Named Entity Recognition", "Text Classification", "Language Generation"] },
  "computer-vision": { category: "AI & Data Science", topics: ["Image Processing", "Edge Detection", "Feature Extraction", "Object Detection (YOLO, SSD)", "Image Segmentation", "Face Recognition", "Optical Flow", "3D Vision", "GANs for Images"] },
  "generative-ai": { category: "AI & Data Science", topics: ["LLM Architecture", "Prompt Engineering", "Fine-Tuning", "RAG Systems", "Vector Databases", "AI Agents", "Multimodal Models", "Ethics in AI", "Deployment"] },
  "mlops": { category: "AI & Data Science", topics: ["ML Pipelines", "Experiment Tracking", "Model Versioning", "Feature Stores", "Model Serving", "Monitoring & Drift", "CI/CD for ML", "Containerization", "Cloud ML Services"] },
  "mathematics-for-ml": { category: "AI & Data Science", topics: ["Linear Algebra", "Calculus", "Probability", "Statistics", "Information Theory", "Optimization", "Matrix Decomposition", "Bayesian Inference", "Hypothesis Testing"] },
};

export function slugify(name: string): string {
  return name.toLowerCase().replace(/[&]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

export function getSubjectBySlug(slug: string) {
  const entry = Object.entries(subjects).find(([key]) => key === slug);
  if (!entry) return null;
  // Recover display name from slug
  const displayName = Object.keys(subjectDisplayNames).find(
    (name) => slugify(name) === slug
  ) || slug;
  return { slug: entry[0], displayName, ...entry[1] };
}

export const subjectDisplayNames: Record<string, string> = {
  "Data Structures & Algorithms": "data-structures-algorithms",
  "Operating Systems": "operating-systems",
  "DBMS": "dbms",
  "Computer Networks": "computer-networks",
  "OOP": "oop",
  "Compilers": "compilers",
  "Theory of Computation": "theory-of-computation",
  "Software Engineering": "software-engineering",
  "Computer Organization": "computer-organization",
  "Machine Learning": "machine-learning",
  "Deep Learning": "deep-learning",
  "Data Science": "data-science",
  "NLP": "nlp",
  "Computer Vision": "computer-vision",
  "Generative AI": "generative-ai",
  "MLOps": "mlops",
  "Mathematics for ML": "mathematics-for-ml",
};

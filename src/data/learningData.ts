import {
  Code, BookOpen, Laptop, Target, Brain, Briefcase,
} from "lucide-react";

export interface PathModule {
  title: string;
  description: string;
  topics: string[];
  duration: string;
  lessons: number;
  exercises: number;
}

export interface LearningPath {
  title: string;
  description: string;
  duration: string;
  level: string;
  skills: string;
  totalLessons: number;
  totalExercises: number;
  prerequisites: string[];
  outcomes: string[];
  modules: PathModule[];
  topics: string[]; // flat list for backward compat
}

export interface UserType {
  slug: string;
  icon: typeof BookOpen;
  title: string;
  desc: string;
  longDesc: string;
  idealFor: string[];
  stats: { paths: number; hours: number; projects: number };
  paths: LearningPath[];
}

export const userTypes: UserType[] = [
  {
    slug: "beginners",
    icon: BookOpen,
    title: "Beginners",
    desc: "Zero to basics in programming & CS fundamentals.",
    longDesc: "Start your coding journey from absolute scratch. This track is designed for complete beginners who want to understand how computers work, think logically, and write their first programs in Python and C.",
    idealFor: ["Students with zero coding experience", "Age 10+ curious about programming", "Career changers exploring tech", "Self-learners wanting structured guidance"],
    stats: { paths: 2, hours: 90, projects: 12 },
    paths: [
      {
        title: "Foundations of Computing",
        description: "Understand how computers think before you start coding. Learn binary, logic gates, flowcharts, and problem-solving techniques using Scratch — the visual programming language.",
        duration: "8 weeks",
        level: "Beginner",
        skills: "Logic, Scratch, Basics",
        totalLessons: 48,
        totalExercises: 32,
        prerequisites: ["No prior experience needed", "Basic math (addition, subtraction)", "A computer with internet access"],
        outcomes: ["Understand binary and number systems", "Create programs using visual blocks in Scratch", "Design flowcharts for any real-world problem", "Think algorithmically and break down problems", "Build 3 mini-projects in Scratch"],
        modules: [
          { title: "How Computers Work", description: "From transistors to software — understand the machine you're programming.", topics: ["History of Computing", "Hardware vs Software", "Input/Output Devices", "How Programs Run"], duration: "1 week", lessons: 6, exercises: 4 },
          { title: "Binary & Number Systems", description: "Learn to count like a computer using binary, octal, and hexadecimal.", topics: ["Decimal to Binary Conversion", "Binary Arithmetic", "Octal & Hexadecimal", "Character Encoding (ASCII/Unicode)"], duration: "1 week", lessons: 6, exercises: 5 },
          { title: "Boolean Logic & Gates", description: "Master AND, OR, NOT and how they form the backbone of computing.", topics: ["Truth Tables", "AND, OR, NOT Gates", "XOR, NAND, NOR", "Combining Logic Gates"], duration: "1 week", lessons: 6, exercises: 4 },
          { title: "Flowcharts & Pseudocode", description: "Plan before you code — design solutions visually.", topics: ["Flowchart Symbols", "Decision Making in Flowcharts", "Writing Pseudocode", "Tracing Algorithms"], duration: "1 week", lessons: 6, exercises: 4 },
          { title: "Scratch Programming", description: "Build interactive stories, games, and animations using block-based coding.", topics: ["Scratch Interface Tour", "Sprites & Backdrops", "Events & Loops", "Variables in Scratch", "Broadcasting Messages"], duration: "2 weeks", lessons: 12, exercises: 8 },
          { title: "Problem Solving Patterns", description: "Learn the mental models used by every programmer.", topics: ["Breaking Down Problems", "Pattern Recognition", "Abstraction Techniques", "Algorithmic Thinking"], duration: "1 week", lessons: 6, exercises: 4 },
          { title: "Capstone Projects", description: "Apply everything you've learned in 3 hands-on projects.", topics: ["Calculator App in Scratch", "Interactive Quiz Game", "Animated Story Project"], duration: "1 week", lessons: 6, exercises: 3 },
        ],
        topics: ["Binary & Number Systems", "Boolean Logic", "Flowcharts & Pseudocode", "Intro to Scratch", "Basic Problem Solving", "How Computers Work"],
      },
      {
        title: "Coding & Programming Basics",
        description: "Write your first real programs! Learn Python and C from scratch — variables, loops, functions, and build mini-projects that solve real problems.",
        duration: "10 weeks",
        level: "Beginner",
        skills: "Python, C, Problem Solving",
        totalLessons: 60,
        totalExercises: 45,
        prerequisites: ["Completed Foundations of Computing (or equivalent)", "Basic understanding of logic & flowcharts"],
        outcomes: ["Write complete programs in Python and C", "Understand variables, loops, and functions deeply", "Handle files and user input/output", "Solve 50+ coding problems", "Build 4 real mini-projects"],
        modules: [
          { title: "Getting Started with Python", description: "Set up your environment and write your first Python program.", topics: ["Installing Python", "Your First Program", "Python Shell vs Scripts", "Comments & Documentation"], duration: "1 week", lessons: 6, exercises: 4 },
          { title: "Variables & Data Types", description: "Understand how data is stored and manipulated.", topics: ["Integers & Floats", "Strings & String Methods", "Type Casting", "Constants & Naming Conventions"], duration: "1 week", lessons: 6, exercises: 5 },
          { title: "Control Flow", description: "Make decisions and repeat actions in your programs.", topics: ["If/Elif/Else Statements", "While Loops", "For Loops & Range", "Break, Continue, Pass", "Nested Conditions"], duration: "1.5 weeks", lessons: 8, exercises: 6 },
          { title: "Functions & Scope", description: "Organize code into reusable blocks.", topics: ["Defining Functions", "Parameters & Arguments", "Return Values", "Variable Scope", "Lambda Functions"], duration: "1.5 weeks", lessons: 8, exercises: 6 },
          { title: "Arrays, Lists & Strings", description: "Work with collections of data efficiently.", topics: ["Lists & List Methods", "Tuples & Sets", "Dictionaries", "String Manipulation", "List Comprehensions"], duration: "1.5 weeks", lessons: 8, exercises: 6 },
          { title: "File I/O & Error Handling", description: "Read/write files and handle unexpected errors.", topics: ["Reading Files", "Writing Files", "CSV Processing", "Try/Except Blocks", "Custom Exceptions"], duration: "1 week", lessons: 6, exercises: 4 },
          { title: "Introduction to C", description: "Learn a lower-level language to understand memory and performance.", topics: ["C Syntax Basics", "Data Types in C", "Pointers Introduction", "Arrays in C", "Functions in C"], duration: "1.5 weeks", lessons: 10, exercises: 8 },
          { title: "Mini Projects", description: "Build real applications to solidify your learning.", topics: ["Calculator App", "To-Do List Manager", "Number Guessing Game", "Student Grade Tracker"], duration: "1 week", lessons: 8, exercises: 6 },
        ],
        topics: ["Variables & Data Types", "Control Flow", "Functions", "Arrays & Strings", "File I/O", "Intro to C", "Intro to Python", "Mini Projects"],
      },
    ],
  },
  {
    slug: "high-school",
    icon: Code,
    title: "High School / Intermediate",
    desc: "Data structures, algorithms & competitive coding.",
    longDesc: "Bridge the gap between basic coding and engineering-level problem solving. Master data structures, algorithms, and competitive programming to ace entrance exams and coding contests.",
    idealFor: ["High school students preparing for engineering", "Self-taught programmers leveling up", "Students preparing for coding competitions", "Anyone with basic Python/C++ knowledge"],
    stats: { paths: 2, hours: 110, projects: 8 },
    paths: [
      {
        title: "Pre-Engineering CS",
        description: "Build a rock-solid foundation in data structures and algorithms that every computer science engineer needs. From linked lists to graphs, master the building blocks.",
        duration: "12 weeks",
        level: "Intermediate",
        skills: "DSA, Math, Algorithms",
        totalLessons: 72,
        totalExercises: 60,
        prerequisites: ["Proficiency in Python or C/C++", "Understanding of functions and arrays", "Basic math (algebra, sets)"],
        outcomes: ["Implement all fundamental data structures from scratch", "Analyze algorithm complexity (Big O notation)", "Solve 100+ DSA problems", "Build efficient solutions for real-world problems", "Prepare for engineering entrance exams"],
        modules: [
          { title: "Complexity Analysis", description: "Learn to measure and compare algorithm efficiency.", topics: ["Big O Notation", "Time vs Space Complexity", "Best/Average/Worst Cases", "Amortized Analysis"], duration: "1 week", lessons: 6, exercises: 5 },
          { title: "Linked Lists", description: "Master dynamic data structures with pointer manipulation.", topics: ["Singly Linked Lists", "Doubly Linked Lists", "Circular Linked Lists", "Common Problems (Reverse, Detect Cycle, Merge)"], duration: "1.5 weeks", lessons: 8, exercises: 7 },
          { title: "Stacks & Queues", description: "Learn LIFO and FIFO structures and their applications.", topics: ["Stack Implementation", "Queue & Deque", "Priority Queue", "Applications (Balanced Parentheses, Infix/Postfix)"], duration: "1.5 weeks", lessons: 8, exercises: 7 },
          { title: "Trees & Binary Trees", description: "Hierarchical data structures that power databases and file systems.", topics: ["Binary Trees", "Binary Search Trees", "Tree Traversals (Inorder, Preorder, Postorder)", "AVL Trees Intro", "Heap Data Structure"], duration: "2 weeks", lessons: 12, exercises: 10 },
          { title: "Sorting Algorithms", description: "From bubble sort to merge sort — understand every approach.", topics: ["Bubble, Selection, Insertion Sort", "Merge Sort", "Quick Sort", "Counting & Radix Sort", "Sorting Stability & Comparisons"], duration: "1.5 weeks", lessons: 8, exercises: 7 },
          { title: "Searching Algorithms", description: "Find what you're looking for efficiently.", topics: ["Linear Search", "Binary Search & Variants", "Ternary Search", "Searching in Sorted/Rotated Arrays"], duration: "1 week", lessons: 6, exercises: 5 },
          { title: "Recursion & Backtracking", description: "Solve problems by breaking them into smaller subproblems.", topics: ["Recursion Fundamentals", "Recursive vs Iterative", "Backtracking Concept", "N-Queens Problem", "Subset Sum"], duration: "1.5 weeks", lessons: 10, exercises: 8 },
          { title: "Graph Basics", description: "Model relationships and networks with graph theory.", topics: ["Graph Representation", "BFS & DFS", "Connected Components", "Shortest Path Intro", "Cycle Detection"], duration: "2 weeks", lessons: 14, exercises: 11 },
        ],
        topics: ["Linked Lists", "Stacks & Queues", "Trees", "Sorting Algorithms", "Searching Algorithms", "Recursion", "Graph Basics", "Time Complexity"],
      },
      {
        title: "Competitive Programming",
        description: "Train like an athlete for coding contests. Learn advanced algorithms, problem-solving patterns, and contest strategies used by top competitive programmers worldwide.",
        duration: "10 weeks",
        level: "Intermediate",
        skills: "Codeforces, Leetcode, Contests",
        totalLessons: 60,
        totalExercises: 80,
        prerequisites: ["Strong DSA fundamentals", "Proficiency in C++ or Python", "Ability to solve basic Leetcode problems"],
        outcomes: ["Solve Codeforces Div 2 A-C problems consistently", "Master greedy, DP, and binary search patterns", "Participate in live coding contests confidently", "Achieve 1400+ rating on competitive platforms", "Solve 200+ competitive problems"],
        modules: [
          { title: "Greedy Algorithms", description: "Make locally optimal choices for globally optimal solutions.", topics: ["Activity Selection", "Fractional Knapsack", "Huffman Coding", "Interval Scheduling", "Greedy Proof Techniques"], duration: "1.5 weeks", lessons: 8, exercises: 12 },
          { title: "Dynamic Programming", description: "The most important topic in competitive programming.", topics: ["Memoization vs Tabulation", "1D DP Problems", "2D DP (Grid Problems)", "Knapsack Variants", "LIS, LCS, Edit Distance"], duration: "2.5 weeks", lessons: 16, exercises: 20 },
          { title: "Binary Search Advanced", description: "Go beyond basic search — apply binary search to answer ranges.", topics: ["Binary Search on Answer", "Parametric Search", "Search on Sorted Matrix", "Median Finding"], duration: "1 week", lessons: 6, exercises: 8 },
          { title: "Two Pointers & Sliding Window", description: "Efficient techniques for array and string problems.", topics: ["Two Pointer Technique", "Sliding Window Fixed/Variable", "Merge Intervals", "Subarray Sum Problems"], duration: "1 week", lessons: 6, exercises: 8 },
          { title: "Bit Manipulation", description: "Harness the power of binary operations.", topics: ["Bitwise Operators", "Bit Masking", "XOR Properties", "Power of 2 Tricks", "Subset Generation with Bits"], duration: "1 week", lessons: 6, exercises: 8 },
          { title: "Number Theory", description: "Math foundations essential for competitive programming.", topics: ["GCD, LCM, Modular Arithmetic", "Sieve of Eratosthenes", "Fast Exponentiation", "Combinatorics Basics", "Fermat's Little Theorem"], duration: "1.5 weeks", lessons: 10, exercises: 12 },
          { title: "Contest Strategies", description: "Optimize your performance during live competitions.", topics: ["Time Management", "Problem Reading Skills", "Debugging Under Pressure", "Rating Strategy", "Upsolving Techniques"], duration: "1.5 weeks", lessons: 8, exercises: 12 },
        ],
        topics: ["Greedy Algorithms", "Dynamic Programming Basics", "Binary Search", "Two Pointers", "Bit Manipulation", "Number Theory", "Contest Strategies"],
      },
    ],
  },
  {
    slug: "btech-cse",
    icon: Laptop,
    title: "B.Tech CSE Students",
    desc: "Full university-level CS curriculum coverage.",
    longDesc: "Cover the entire B.Tech Computer Science curriculum with in-depth theory, practical labs, and real-world applications. From OS and DBMS to full-stack development — everything you need to ace your exams and build real software.",
    idealFor: ["B.Tech/BE Computer Science students", "MCA students needing CS fundamentals", "Self-learners wanting university-depth knowledge", "Students preparing for GATE exam"],
    stats: { paths: 2, hours: 220, projects: 18 },
    paths: [
      {
        title: "B.Tech CSE Core Subjects",
        description: "Master all 8 core CS subjects taught in every engineering university. Deep theoretical understanding combined with practical implementation and exam preparation.",
        duration: "24 weeks",
        level: "Intermediate",
        skills: "OS, DBMS, CN, OOP",
        totalLessons: 144,
        totalExercises: 96,
        prerequisites: ["Basic programming knowledge (C/C++/Java)", "High school mathematics", "Completed DSA fundamentals"],
        outcomes: ["Master all core CS subjects comprehensively", "Score 8+ CGPA in university exams", "Prepare for GATE CS syllabus", "Build practical projects for each subject", "Understand real-world applications of theory"],
        modules: [
          { title: "Operating Systems", description: "How the OS manages hardware, processes, memory, and files.", topics: ["Process Management & Scheduling", "Threads & Concurrency", "Deadlocks & Prevention", "Memory Management & Paging", "Virtual Memory", "File Systems & I/O"], duration: "3 weeks", lessons: 18, exercises: 12 },
          { title: "Database Management Systems", description: "Design, query, and optimize databases like a pro.", topics: ["ER Model & Relational Model", "SQL Queries (Basic to Advanced)", "Normalization (1NF to BCNF)", "Transactions & ACID Properties", "Indexing & Query Optimization", "NoSQL Introduction"], duration: "3 weeks", lessons: 18, exercises: 12 },
          { title: "Computer Networks", description: "How the internet works — from bits on a wire to HTTP.", topics: ["OSI & TCP/IP Models", "Data Link & Network Layer", "Transport Layer (TCP/UDP)", "Application Layer Protocols", "Routing & Subnetting", "Network Security Basics"], duration: "3 weeks", lessons: 18, exercises: 12 },
          { title: "Object-Oriented Programming", description: "Design robust software using OOP principles.", topics: ["Classes, Objects & Inheritance", "Polymorphism & Abstraction", "SOLID Principles", "Design Patterns (Factory, Singleton, Observer)", "UML & System Modeling"], duration: "3 weeks", lessons: 18, exercises: 12 },
          { title: "Compiler Design", description: "Build a compiler from lexer to code generator.", topics: ["Lexical & Syntax Analysis", "Parsing Techniques (LL, LR)", "Semantic Analysis", "Intermediate Code Generation", "Code Optimization & Generation"], duration: "3 weeks", lessons: 18, exercises: 12 },
          { title: "Theory of Computation", description: "The mathematical foundations of what computers can and cannot do.", topics: ["Finite Automata (DFA/NFA)", "Regular Expressions & Languages", "Context-Free Grammars & PDA", "Turing Machines", "Decidability & Complexity (P vs NP)"], duration: "3 weeks", lessons: 18, exercises: 12 },
          { title: "Software Engineering", description: "Build software the right way — from requirements to deployment.", topics: ["SDLC Models & Agile", "Requirements Engineering", "System Design & Architecture", "Testing Strategies", "CI/CD & DevOps Basics"], duration: "3 weeks", lessons: 18, exercises: 12 },
          { title: "Computer Organization", description: "Understand processor design, memory hierarchy, and assembly.", topics: ["ALU & Processor Design", "Pipelining & Hazards", "Memory Hierarchy & Cache", "I/O Organization", "RISC vs CISC Architecture"], duration: "3 weeks", lessons: 18, exercises: 12 },
        ],
        topics: ["Operating Systems", "DBMS & SQL", "Computer Networks", "OOP in Java/C++", "Compiler Design", "Theory of Computation", "Software Engineering", "Computer Organization"],
      },
      {
        title: "Software Engineer Path",
        description: "Go from student to industry-ready software engineer. Build full-stack applications, learn DevOps, deploy to the cloud, and understand system design.",
        duration: "20 weeks",
        level: "Advanced",
        skills: "Full Stack, DevOps, Cloud",
        totalLessons: 120,
        totalExercises: 80,
        prerequisites: ["Strong programming fundamentals", "Basic understanding of HTML/CSS", "Familiarity with databases"],
        outcomes: ["Build production-ready full-stack applications", "Deploy apps using Docker and cloud services", "Design REST APIs and database schemas", "Understand CI/CD pipelines", "Create a portfolio of 5+ deployed projects"],
        modules: [
          { title: "Frontend Fundamentals", description: "Master HTML, CSS, and JavaScript — the building blocks of the web.", topics: ["Semantic HTML5", "CSS Flexbox & Grid", "Responsive Design", "JavaScript ES6+", "DOM Manipulation"], duration: "2.5 weeks", lessons: 15, exercises: 10 },
          { title: "React & Modern Frontend", description: "Build dynamic user interfaces with the most popular framework.", topics: ["React Components & JSX", "State & Props", "Hooks (useState, useEffect, useContext)", "React Router", "API Integration"], duration: "3 weeks", lessons: 18, exercises: 12 },
          { title: "Backend with Node.js", description: "Build server-side applications and APIs.", topics: ["Node.js Fundamentals", "Express.js Framework", "Middleware & Routing", "Authentication (JWT, Sessions)", "Error Handling"], duration: "3 weeks", lessons: 18, exercises: 12 },
          { title: "Databases in Practice", description: "Design and query databases for real applications.", topics: ["PostgreSQL Deep Dive", "MongoDB & NoSQL", "ORM (Prisma/Sequelize)", "Database Design Patterns", "Query Optimization"], duration: "2.5 weeks", lessons: 15, exercises: 10 },
          { title: "REST APIs & System Design", description: "Design scalable APIs and understand system architecture.", topics: ["RESTful API Design", "API Versioning & Documentation", "Rate Limiting & Caching", "Microservices Introduction", "System Design Basics"], duration: "3 weeks", lessons: 18, exercises: 12 },
          { title: "DevOps & Deployment", description: "Ship your code to production with modern tools.", topics: ["Git & GitHub Workflow", "Docker Containers", "CI/CD Pipelines", "Cloud Deployment (AWS/Vercel)", "Monitoring & Logging"], duration: "3 weeks", lessons: 18, exercises: 12 },
          { title: "Capstone Projects", description: "Build and deploy 2 production-grade full-stack applications.", topics: ["E-Commerce Platform", "Real-Time Chat App", "Portfolio Deployment", "Code Review & Best Practices"], duration: "3 weeks", lessons: 18, exercises: 12 },
        ],
        topics: ["HTML/CSS/JS", "React / Next.js", "Node.js & Express", "REST APIs", "Databases", "Docker & CI/CD", "Cloud Basics (AWS)", "System Design Intro"],
      },
    ],
  },
  {
    slug: "placement",
    icon: Target,
    title: "Placement Aspirants",
    desc: "Crack product-based company interviews.",
    longDesc: "A battle-tested preparation strategy used by students who cracked Google, Amazon, Microsoft, and other top product-based companies. Covers DSA mastery, system design, aptitude, and interview soft skills.",
    idealFor: ["Final year students preparing for placements", "Job seekers targeting FAANG/product companies", "Developers preparing for senior roles", "Anyone wanting to ace technical interviews"],
    stats: { paths: 2, hours: 120, projects: 6 },
    paths: [
      {
        title: "Placement Preparation",
        description: "The complete technical preparation guide for cracking product-based company interviews. Master 450+ DSA problems, system design concepts, and CS fundamentals revision.",
        duration: "16 weeks",
        level: "Advanced",
        skills: "DSA, System Design, Aptitude",
        totalLessons: 96,
        totalExercises: 120,
        prerequisites: ["Strong programming in at least one language", "Basic understanding of DSA", "Familiarity with CS core subjects"],
        outcomes: ["Solve 450+ interview-level DSA problems", "Design systems like URL Shortener, Twitter, WhatsApp", "Clear aptitude rounds with 90%+ accuracy", "Revise all CS fundamentals for interviews", "Get referrals and apply strategically"],
        modules: [
          { title: "Arrays, Strings & Hashing", description: "The most frequently asked category in interviews.", topics: ["Two Sum Variants", "Sliding Window Problems", "HashMap Patterns", "String Manipulation", "Matrix Problems"], duration: "2 weeks", lessons: 12, exercises: 20 },
          { title: "Trees & Graphs Mastery", description: "Advanced tree and graph problems asked by top companies.", topics: ["Binary Tree Problems", "BST Operations", "Graph BFS/DFS", "Topological Sort", "Shortest Path (Dijkstra, Bellman-Ford)", "Minimum Spanning Tree"], duration: "3 weeks", lessons: 18, exercises: 24 },
          { title: "Dynamic Programming", description: "The hardest category — broken down into learnable patterns.", topics: ["1D DP Patterns", "2D DP (Grid, String)", "Knapsack Family", "Interval DP", "State Machine DP", "DP on Trees"], duration: "3 weeks", lessons: 18, exercises: 24 },
          { title: "System Design", description: "Design large-scale systems from scratch.", topics: ["Scalability Concepts", "URL Shortener Design", "Chat System Design", "News Feed Design", "Rate Limiter Design", "Database Choices"], duration: "3 weeks", lessons: 18, exercises: 12 },
          { title: "Aptitude & Reasoning", description: "Clear the first screening round.", topics: ["Quantitative Aptitude", "Logical Reasoning", "Verbal Ability", "Data Interpretation", "Pattern Recognition"], duration: "2 weeks", lessons: 12, exercises: 16 },
          { title: "CS Fundamentals Revision", description: "Quick revision of OS, DBMS, CN, OOP for interviews.", topics: ["OS Key Concepts", "DBMS & SQL Essentials", "Networking Fundamentals", "OOP Principles"], duration: "2 weeks", lessons: 12, exercises: 16 },
          { title: "Company-Wise Preparation", description: "Targeted preparation for specific companies.", topics: ["Google Interview Patterns", "Amazon Leadership + Coding", "Microsoft Problem Style", "Startup Interview Approach", "Application & Referral Strategy"], duration: "1 week", lessons: 6, exercises: 8 },
        ],
        topics: ["Arrays & Hashing", "Trees & Graphs", "Dynamic Programming", "System Design", "Aptitude & Reasoning", "CS Fundamentals Revision", "Company-Wise Questions"],
      },
      {
        title: "Interview Mastery",
        description: "Technical skills alone aren't enough. Master behavioral interviews, communicate effectively, build a killer resume, and negotiate your offer like a pro.",
        duration: "8 weeks",
        level: "Advanced",
        skills: "Mock Interviews, HR, Coding Rounds",
        totalLessons: 48,
        totalExercises: 32,
        prerequisites: ["Completed Placement Preparation (or equivalent)", "Have attempted some real interviews"],
        outcomes: ["Ace behavioral and HR interview rounds", "Present solutions clearly during coding rounds", "Build an ATS-optimized resume", "Negotiate salary and benefits effectively", "Complete 10+ mock interview sessions"],
        modules: [
          { title: "Behavioral Interview Prep", description: "Master the STAR method and common behavioral questions.", topics: ["STAR Method Framework", "Tell Me About Yourself", "Conflict Resolution Stories", "Leadership & Teamwork Examples", "Weakness & Failure Questions"], duration: "2 weeks", lessons: 12, exercises: 8 },
          { title: "Communication in Tech Interviews", description: "Think out loud and explain your approach clearly.", topics: ["Clarifying Questions", "Thinking Out Loud", "Explaining Time/Space Complexity", "Whiteboard Communication", "Handling Hints & Follow-ups"], duration: "1.5 weeks", lessons: 8, exercises: 6 },
          { title: "Live Mock Interviews", description: "Practice with realistic interview simulations.", topics: ["DSA Mock Round", "System Design Mock Round", "Behavioral Mock Round", "Full Loop Simulation"], duration: "2 weeks", lessons: 12, exercises: 8 },
          { title: "Resume & Portfolio", description: "Create application materials that get you shortlisted.", topics: ["ATS-Optimized Resume", "GitHub Portfolio Setup", "LinkedIn Optimization", "Cover Letter Writing", "Project Descriptions That Sell"], duration: "1 week", lessons: 6, exercises: 4 },
          { title: "Offer Negotiation", description: "Don't leave money on the table.", topics: ["Understanding Compensation", "Negotiation Frameworks", "Comparing Multiple Offers", "Equity & Benefits", "When to Walk Away"], duration: "1.5 weeks", lessons: 10, exercises: 6 },
        ],
        topics: ["Behavioral Questions", "HR Round Prep", "Live Mock Interviews", "Resume Building", "Communication Skills", "Offer Negotiation"],
      },
    ],
  },
  {
    slug: "ai-ml",
    icon: Brain,
    title: "AI / ML Career Seekers",
    desc: "Deep learning, NLP, computer vision & more.",
    longDesc: "Dive deep into artificial intelligence and machine learning. From mathematical foundations to cutting-edge generative AI — build the skills to become an AI/ML engineer or data scientist at top companies.",
    idealFor: ["CS graduates wanting to specialize in AI", "Data analysts transitioning to ML", "Researchers exploring deep learning", "Professionals building AI products"],
    stats: { paths: 2, hours: 220, projects: 14 },
    paths: [
      {
        title: "AI & Machine Learning",
        description: "A comprehensive journey through machine learning and deep learning. Start with the math, build intuition with classical ML, then dive into neural networks, NLP, and computer vision.",
        duration: "20 weeks",
        level: "Advanced",
        skills: "ML, DL, NLP, CV",
        totalLessons: 120,
        totalExercises: 80,
        prerequisites: ["Python programming proficiency", "Basic linear algebra and calculus", "Statistics fundamentals", "Experience with NumPy and Pandas"],
        outcomes: ["Build and train ML models from scratch", "Implement neural networks using PyTorch/TensorFlow", "Work with CNNs for image tasks and RNNs for sequences", "Understand NLP fundamentals and transformers", "Deploy ML models as APIs", "Complete 6 ML projects for portfolio"],
        modules: [
          { title: "Math for Machine Learning", description: "The mathematical foundation that powers every ML algorithm.", topics: ["Linear Algebra (Vectors, Matrices, Eigenvalues)", "Multivariable Calculus & Gradients", "Probability & Bayes Theorem", "Statistics & Distributions", "Optimization (Gradient Descent)"], duration: "2.5 weeks", lessons: 15, exercises: 10 },
          { title: "Supervised Learning", description: "Learn algorithms that learn from labeled data.", topics: ["Linear Regression", "Logistic Regression", "Decision Trees & Random Forests", "Support Vector Machines", "K-Nearest Neighbors", "Model Evaluation Metrics"], duration: "3 weeks", lessons: 18, exercises: 12 },
          { title: "Unsupervised Learning", description: "Discover patterns in data without labels.", topics: ["K-Means Clustering", "Hierarchical Clustering", "PCA & Dimensionality Reduction", "Anomaly Detection", "Association Rules"], duration: "2 weeks", lessons: 12, exercises: 8 },
          { title: "Neural Networks & Deep Learning", description: "From perceptrons to deep architectures.", topics: ["Perceptrons & Activation Functions", "Backpropagation Algorithm", "Optimizers (SGD, Adam, RMSprop)", "Regularization (Dropout, BatchNorm)", "Building Networks in PyTorch"], duration: "3 weeks", lessons: 18, exercises: 12 },
          { title: "Convolutional Neural Networks", description: "See the world through AI eyes — image processing with CNNs.", topics: ["Convolution Operations", "CNN Architectures (LeNet, VGG, ResNet)", "Transfer Learning", "Image Classification Project", "Object Detection Intro"], duration: "3 weeks", lessons: 18, exercises: 12 },
          { title: "Sequence Models (RNN/LSTM)", description: "Process sequential data like text, time series, and speech.", topics: ["RNN Fundamentals", "Vanishing Gradient Problem", "LSTM & GRU", "Sequence-to-Sequence Models", "Attention Mechanism"], duration: "2.5 weeks", lessons: 15, exercises: 10 },
          { title: "NLP Fundamentals", description: "Teach machines to understand human language.", topics: ["Text Preprocessing", "Word Embeddings (Word2Vec, GloVe)", "Sentiment Analysis", "Named Entity Recognition", "Transformers Introduction"], duration: "2.5 weeks", lessons: 15, exercises: 10 },
          { title: "Computer Vision Projects", description: "Build real CV applications end-to-end.", topics: ["Image Classification Pipeline", "Face Detection System", "Object Detection with YOLO", "Image Segmentation"], duration: "1.5 weeks", lessons: 9, exercises: 6 },
        ],
        topics: ["Linear Algebra & Stats", "Supervised Learning", "Unsupervised Learning", "Neural Networks", "CNNs", "RNNs & LSTMs", "NLP Fundamentals", "Computer Vision"],
      },
      {
        title: "Data Science & AI Engineer",
        description: "Become a complete data scientist and AI engineer. Master the full pipeline from data wrangling to deploying production ML systems, including cutting-edge GenAI and MLOps.",
        duration: "24 weeks",
        level: "Expert",
        skills: "Stats, ML, MLOps, GenAI",
        totalLessons: 144,
        totalExercises: 96,
        prerequisites: ["Completed AI & ML path (or equivalent)", "Strong Python and ML fundamentals", "Experience with at least one deep learning framework"],
        outcomes: ["Build end-to-end ML pipelines", "Deploy models with MLOps best practices", "Build applications with LLMs and RAG", "Work with vector databases and embeddings", "Lead AI projects from ideation to production", "Complete 8 production-grade AI projects"],
        modules: [
          { title: "Advanced Data Analysis", description: "Go beyond basic EDA to uncover deep insights.", topics: ["Statistical Testing (t-test, chi-square)", "A/B Testing & Experiment Design", "Advanced Visualization (Plotly, Seaborn)", "Time Series Analysis", "Feature Engineering Mastery"], duration: "3 weeks", lessons: 18, exercises: 12 },
          { title: "Advanced ML Techniques", description: "Ensemble methods, AutoML, and production-grade modeling.", topics: ["XGBoost & LightGBM", "Stacking & Blending", "Hyperparameter Tuning (Optuna)", "AutoML Frameworks", "Model Interpretability (SHAP, LIME)"], duration: "3 weeks", lessons: 18, exercises: 12 },
          { title: "MLOps & Pipelines", description: "Take ML from notebook to production.", topics: ["ML Pipeline Design", "Experiment Tracking (MLflow, W&B)", "Model Versioning & Registry", "Feature Stores", "CI/CD for ML"], duration: "3 weeks", lessons: 18, exercises: 12 },
          { title: "Transformer Architecture", description: "Understand the architecture powering modern AI.", topics: ["Self-Attention Mechanism", "Multi-Head Attention", "Positional Encoding", "BERT Architecture", "GPT Architecture"], duration: "3 weeks", lessons: 18, exercises: 12 },
          { title: "LLMs & Prompt Engineering", description: "Work with large language models effectively.", topics: ["Prompt Design Patterns", "Chain-of-Thought Prompting", "Few-Shot Learning", "Fine-Tuning LLMs (LoRA, QLoRA)", "Evaluation Frameworks"], duration: "3 weeks", lessons: 18, exercises: 12 },
          { title: "RAG Systems & Vector DBs", description: "Build AI systems that reason over your data.", topics: ["Embedding Models", "Vector Databases (Pinecone, ChromaDB)", "RAG Pipeline Architecture", "Chunking Strategies", "Hybrid Search"], duration: "3 weeks", lessons: 18, exercises: 12 },
          { title: "Model Deployment & Serving", description: "Serve models at scale in production.", topics: ["Model Serving (FastAPI, TorchServe)", "Containerization with Docker", "Kubernetes for ML", "Monitoring & Drift Detection", "Cost Optimization"], duration: "3 weeks", lessons: 18, exercises: 12 },
          { title: "Capstone: AI Product", description: "Build a production-grade AI product from scratch.", topics: ["Product Ideation & Planning", "End-to-End Pipeline", "User Interface Integration", "Deployment & Monitoring", "Documentation & Presentation"], duration: "3 weeks", lessons: 18, exercises: 12 },
        ],
        topics: ["Exploratory Data Analysis", "Feature Engineering", "Model Evaluation", "MLOps & Pipelines", "Transformers", "LLMs & Prompt Engineering", "RAG Systems", "Deployment"],
      },
    ],
  },
  {
    slug: "professionals",
    icon: Briefcase,
    title: "Professionals",
    desc: "Upskill with AI, system design & advanced topics.",
    longDesc: "Stay ahead in your career with advanced system design patterns, GenAI tools, and MLOps practices. Designed for working professionals who want to architect scalable systems and leverage AI in their products.",
    idealFor: ["Software engineers with 2+ years experience", "Tech leads and architects", "Backend engineers scaling systems", "Professionals transitioning into AI/ML roles"],
    stats: { paths: 2, hours: 140, projects: 10 },
    paths: [
      {
        title: "Advanced System Design",
        description: "Learn to design systems that serve millions of users. Master high-level and low-level design, scalability patterns, and the architecture behind systems like Netflix, Uber, and WhatsApp.",
        duration: "12 weeks",
        level: "Advanced",
        skills: "HLD, LLD, Scalability",
        totalLessons: 72,
        totalExercises: 48,
        prerequisites: ["2+ years software development experience", "Understanding of databases and APIs", "Basic distributed systems knowledge"],
        outcomes: ["Design scalable distributed systems", "Ace system design interviews at FAANG companies", "Choose the right architecture patterns for any scenario", "Understand trade-offs in real-world systems", "Design 10+ complete systems from scratch"],
        modules: [
          { title: "System Design Fundamentals", description: "Core concepts every system designer must know.", topics: ["Scalability & Performance", "CAP Theorem", "Consistency Patterns", "Load Balancing Strategies", "CDN & Edge Computing"], duration: "2 weeks", lessons: 12, exercises: 8 },
          { title: "High-Level Design", description: "Bird's-eye view architecture for large-scale systems.", topics: ["URL Shortener (like bit.ly)", "Social Media Feed (like Twitter)", "Chat System (like WhatsApp)", "Video Streaming (like YouTube)", "Ride Sharing (like Uber)"], duration: "3 weeks", lessons: 18, exercises: 12 },
          { title: "Low-Level Design", description: "Detailed class-level design with SOLID principles.", topics: ["Parking Lot System", "Library Management System", "Elevator System", "Online Bookstore", "Design Patterns in Practice"], duration: "2 weeks", lessons: 12, exercises: 8 },
          { title: "Database Design & Scaling", description: "Choose and scale the right database for your system.", topics: ["SQL vs NoSQL Trade-offs", "Database Sharding", "Replication Strategies", "Data Partitioning", "Caching (Redis, Memcached)"], duration: "2 weeks", lessons: 12, exercises: 8 },
          { title: "Microservices & Event-Driven", description: "Break monoliths and design event-driven architectures.", topics: ["Microservices Patterns", "API Gateway Design", "Event Sourcing & CQRS", "Message Queues (Kafka, RabbitMQ)", "Service Mesh"], duration: "2 weeks", lessons: 12, exercises: 8 },
          { title: "Reliability & Observability", description: "Keep your systems running and debuggable.", topics: ["SLOs, SLIs, SLAs", "Distributed Tracing", "Logging Architecture", "Alerting & Incident Response", "Chaos Engineering Basics"], duration: "1 week", lessons: 6, exercises: 4 },
        ],
        topics: ["High-Level Design", "Low-Level Design", "Load Balancing", "Caching Strategies", "Database Sharding", "Microservices", "Event-Driven Architecture"],
      },
      {
        title: "GenAI & MLOps",
        description: "Master the cutting-edge of AI engineering. Build production LLM applications, implement RAG systems, fine-tune models, and deploy AI at scale with MLOps best practices.",
        duration: "16 weeks",
        level: "Expert",
        skills: "LLMs, RAG, Deployment",
        totalLessons: 96,
        totalExercises: 64,
        prerequisites: ["Python proficiency", "Basic ML understanding", "Experience with APIs and deployment", "Familiarity with cloud services"],
        outcomes: ["Build production LLM applications", "Implement RAG pipelines with vector databases", "Fine-tune open-source LLMs (Llama, Mistral)", "Deploy and monitor ML systems at scale", "Optimize AI infrastructure costs", "Complete 5 production AI projects"],
        modules: [
          { title: "Transformer Deep Dive", description: "Understand the architecture that changed AI forever.", topics: ["Self-Attention from Scratch", "Multi-Head Attention", "Positional Encoding Methods", "Encoder vs Decoder Architecture", "Scaling Laws"], duration: "2 weeks", lessons: 12, exercises: 8 },
          { title: "Working with LLMs", description: "Use and customize large language models effectively.", topics: ["OpenAI API & Best Practices", "Open-Source LLMs (Llama, Mistral)", "Prompt Engineering Advanced", "Function Calling & Tool Use", "Token Management & Costs"], duration: "2.5 weeks", lessons: 15, exercises: 10 },
          { title: "Fine-Tuning LLMs", description: "Customize models for your specific use case.", topics: ["Full Fine-Tuning vs PEFT", "LoRA & QLoRA Techniques", "Dataset Preparation", "Training Infrastructure", "Evaluation & Benchmarking"], duration: "2.5 weeks", lessons: 15, exercises: 10 },
          { title: "RAG Pipeline Engineering", description: "Build AI systems that reason over your company's data.", topics: ["Document Processing & Chunking", "Embedding Models Selection", "Vector Database Setup (Pinecone/Weaviate)", "Retrieval Strategies", "Advanced RAG (HyDE, Reranking)"], duration: "3 weeks", lessons: 18, exercises: 12 },
          { title: "AI Agents & Workflows", description: "Build autonomous AI systems that take actions.", topics: ["Agent Architecture Patterns", "Tool Use & Function Calling", "Multi-Agent Systems", "LangChain & LlamaIndex", "Guardrails & Safety"], duration: "2 weeks", lessons: 12, exercises: 8 },
          { title: "MLOps at Scale", description: "Production ML infrastructure and best practices.", topics: ["ML Pipeline Orchestration", "Model Registry & Versioning", "A/B Testing for Models", "Monitoring & Drift Detection", "Infrastructure as Code"], duration: "2 weeks", lessons: 12, exercises: 8 },
          { title: "Cost & Performance Optimization", description: "Run AI systems efficiently at scale.", topics: ["Model Quantization", "Inference Optimization", "Batch vs Real-Time Serving", "GPU Cost Management", "Edge Deployment"], duration: "2 weeks", lessons: 12, exercises: 8 },
        ],
        topics: ["Transformer Architecture", "Fine-Tuning LLMs", "RAG Pipelines", "Vector Databases", "Model Serving", "Monitoring & Observability", "Cost Optimization"],
      },
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

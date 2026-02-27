import { useState } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw, Copy, Check, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";

const languages = [
  { id: "c", label: "C", template: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}' },
  { id: "cpp", label: "C++", template: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}' },
  { id: "java", label: "Java", template: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}' },
  { id: "python", label: "Python", template: 'print("Hello, World!")' },
  { id: "go", label: "Go", template: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}' },
  { id: "javascript", label: "JavaScript", template: 'console.log("Hello, World!");' },
];

const sampleProblem = {
  title: "Two Sum",
  difficulty: "Easy",
  description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.`,
  examples: [
    { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
    { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
  ],
  constraints: ["2 ≤ nums.length ≤ 10⁴", "-10⁹ ≤ nums[i] ≤ 10⁹", "-10⁹ ≤ target ≤ 10⁹", "Only one valid answer exists."],
};

const Compiler = () => {
  const [lang, setLang] = useState(languages[0]);
  const [code, setCode] = useState(languages[0].template);
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"problem" | "output">("problem");

  const handleLangChange = (id: string) => {
    const selected = languages.find((l) => l.id === id)!;
    setLang(selected);
    setCode(selected.template);
    setOutput("");
  };

  const handleRun = () => {
    setRunning(true);
    setActiveTab("output");
    setTimeout(() => {
      setOutput(`> Compiling ${lang.label}...\n> Build successful\n> Running...\n\nHello, World!\n\n✓ Executed in 42ms`);
      setRunning(false);
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-[7.5rem] flex flex-col lg:flex-row overflow-hidden">
        {/* Left panel: Problem */}
        <div className="lg:w-[45%] border-r border-border overflow-y-auto bg-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="font-display text-xl font-bold text-card-foreground">{sampleProblem.title}</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-500/10 text-green-500">
              {sampleProblem.difficulty}
            </span>
          </div>
          <div className="text-sm text-muted-foreground whitespace-pre-line mb-6 leading-relaxed">
            {sampleProblem.description}
          </div>

          {sampleProblem.examples.map((ex, i) => (
            <div key={i} className="mb-4 bg-secondary/50 rounded-lg p-4">
              <p className="text-xs font-semibold text-card-foreground mb-2">Example {i + 1}:</p>
              <div className="text-xs font-mono text-muted-foreground space-y-1">
                <p><span className="text-card-foreground font-semibold">Input:</span> {ex.input}</p>
                <p><span className="text-card-foreground font-semibold">Output:</span> {ex.output}</p>
                {ex.explanation && <p><span className="text-card-foreground font-semibold">Explanation:</span> {ex.explanation}</p>}
              </div>
            </div>
          ))}

          <div className="mb-4">
            <p className="text-xs font-semibold text-card-foreground mb-2">Constraints:</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              {sampleProblem.constraints.map((c, i) => (
                <li key={i} className="font-mono">• {c}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right panel: Editor */}
        <div className="lg:w-[55%] flex flex-col overflow-hidden">
          {/* Editor toolbar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card">
            <div className="flex items-center gap-2">
              {languages.map((l) => (
                <button
                  key={l.id}
                  onClick={() => handleLangChange(l.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    lang.id === l.id
                      ? "gradient-btn text-primary-foreground"
                      : "text-muted-foreground hover:text-card-foreground hover:bg-secondary"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleCopy} className="p-2 rounded-md hover:bg-secondary text-muted-foreground transition-colors">
                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
              </button>
              <button
                onClick={() => { setCode(lang.template); setOutput(""); }}
                className="p-2 rounded-md hover:bg-secondary text-muted-foreground transition-colors"
              >
                <RotateCcw size={14} />
              </button>
              <button
                onClick={handleRun}
                disabled={running}
                className="flex items-center gap-1.5 gradient-btn text-primary-foreground px-4 py-1.5 rounded-md text-xs font-semibold disabled:opacity-50"
              >
                <Play size={12} />
                {running ? "Running..." : "Run Code"}
              </button>
            </div>
          </div>

          {/* Code editor */}
          <div className="flex-1 relative overflow-hidden">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="w-full h-full p-4 font-mono text-sm bg-[hsl(220,30%,6%)] text-[hsl(220,10%,90%)] resize-none focus:outline-none leading-6"
              style={{ tabSize: 4 }}
            />
          </div>

          {/* Output panel */}
          <div className="h-[200px] border-t border-border bg-card flex flex-col">
            <div className="flex items-center gap-4 px-4 py-2 border-b border-border">
              <button
                onClick={() => setActiveTab("output")}
                className={`text-xs font-semibold transition-colors ${activeTab === "output" ? "text-card-foreground" : "text-muted-foreground"}`}
              >
                Output
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              <pre className="font-mono text-xs text-muted-foreground whitespace-pre-wrap">
                {output || "Click 'Run Code' to see the output here."}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Compiler;

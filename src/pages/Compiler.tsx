import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, Copy, Check, Clock, Cpu, CheckCircle2, XCircle, Loader2, AlertTriangle, Lock, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { problems, languageLabels, type Language } from "@/data/compilerProblems";

const diffColors: Record<string, string> = {
  Easy: "text-green-500 bg-green-500/10",
  Medium: "text-yellow-500 bg-yellow-500/10",
  Hard: "text-red-500 bg-red-500/10",
};

type TestResult = {
  id: number;
  input: string;
  expected: string;
  actual: string;
  passed: boolean;
  executionTime: string;
};

type RunResult = {
  output: string;
  testResults: TestResult[];
  timeComplexity: string;
  timeExplanation: string;
  spaceComplexity: string;
  spaceExplanation: string;
  executionTime: string;
  errors: string | null;
};

const Compiler = () => {
  const [searchParams] = useSearchParams();
  const problemId = parseInt(searchParams.get("problem") || "1");
  const problem = problems.find((p) => p.id === problemId) || problems[0];

  const [language, setLanguage] = useState<Language>("python");
  const [code, setCode] = useState(problem.templates[language]);
  const [running, setRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"output" | "tests" | "complexity">("output");
  const [result, setResult] = useState<RunResult | null>(null);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    setCode(problem.templates[language]);
    setResult(null);
  }, [language, problem.id]);

  const handleRun = async () => {
    setRunning(true);
    setActiveTab("output");
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("run-python", {
        body: { code, language, testCases: problem.testCases, problemTitle: problem.title },
      });
      if (error) throw error;
      setResult(data as RunResult);
      if (data?.testResults?.length > 0) setActiveTab("tests");
    } catch (err: any) {
      setResult({
        output: `Error: ${err.message || "Failed to execute code"}`,
        testResults: [],
        timeComplexity: "N/A", timeExplanation: "",
        spaceComplexity: "N/A", spaceExplanation: "",
        executionTime: "N/A",
        errors: err.message,
      });
    } finally {
      setRunning(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const passedCount = result?.testResults?.filter((t) => t.passed).length || 0;
  const totalCount = result?.testResults?.length || 0;
  const visibleTests = problem.testCases.filter(t => !t.hidden).length;
  const hiddenTests = problem.testCases.filter(t => t.hidden).length;

  return (
    <main className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-16 flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Problem */}
        <div className="lg:w-[42%] border-r border-border overflow-y-auto bg-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="font-display text-xl font-bold text-card-foreground">{problem.title}</h2>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${diffColors[problem.difficulty]}`}>
              {problem.difficulty}
            </span>
          </div>
          <div className="text-sm text-muted-foreground whitespace-pre-line mb-6 leading-relaxed">
            {problem.description}
          </div>
          {problem.examples.map((ex, i) => (
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
              {problem.constraints.map((c, i) => (
                <li key={i} className="font-mono">• {c}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-secondary/30 p-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Lock size={12} />
              <span>{visibleTests} visible test cases · {hiddenTests} hidden test cases</span>
            </div>
          </div>
        </div>

        {/* Right: Editor + Output */}
        <div className="lg:w-[58%] flex flex-col overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card">
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold gradient-btn text-primary-foreground"
              >
                {languageLabels[language]}
                <ChevronDown size={12} />
              </button>
              {langOpen && (
                <div className="absolute top-full left-0 mt-1 bg-card border border-border rounded-md shadow-lg z-50 min-w-[120px]">
                  {(Object.keys(languageLabels) as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => { setLanguage(lang); setLangOpen(false); }}
                      className={`block w-full text-left px-3 py-2 text-xs hover:bg-secondary transition-colors ${
                        lang === language ? "text-primary font-semibold" : "text-foreground"
                      }`}
                    >
                      {languageLabels[lang]}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleCopy} className="p-2 rounded-md hover:bg-secondary text-muted-foreground transition-colors" title="Copy code">
                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
              </button>
              <button onClick={() => { setCode(problem.templates[language]); setResult(null); }} className="p-2 rounded-md hover:bg-secondary text-muted-foreground transition-colors" title="Reset">
                <RotateCcw size={14} />
              </button>
              <button
                onClick={handleRun}
                disabled={running}
                className="flex items-center gap-1.5 gradient-btn text-primary-foreground px-4 py-1.5 rounded-md text-xs font-semibold disabled:opacity-50 transition-all"
              >
                {running ? <Loader2 size={12} className="animate-spin" /> : <Play size={12} />}
                {running ? "Running..." : "Run Code"}
              </button>
            </div>
          </div>

          {/* Code textarea */}
          <div className="flex-1 relative overflow-hidden min-h-[200px]">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="w-full h-full p-4 font-mono text-sm bg-[hsl(220,30%,6%)] text-[hsl(220,10%,90%)] resize-none focus:outline-none leading-6"
              style={{ tabSize: 4 }}
            />
          </div>

          {/* Output panel */}
          <div className="h-[260px] border-t border-border bg-card flex flex-col">
            <div className="flex items-center gap-1 px-4 py-1.5 border-b border-border">
              {(["output", "tests", "complexity"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-colors ${
                    activeTab === tab ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab === "tests" && result ? `Tests (${passedCount}/${totalCount})` : tab}
                </button>
              ))}
              {result && !result.errors && totalCount > 0 && (
                <span className={`ml-auto text-xs font-semibold ${passedCount === totalCount ? "text-green-500" : "text-yellow-500"}`}>
                  {passedCount === totalCount ? "✓ All Passed" : `${passedCount} Passed`}
                </span>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <AnimatePresence mode="wait">
                {activeTab === "output" && (
                  <motion.div key="output" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {running ? (
                      <div className="flex items-center gap-2 text-muted-foreground text-xs">
                        <Loader2 size={14} className="animate-spin" />
                        Compiling & executing {languageLabels[language]} code...
                      </div>
                    ) : result ? (
                      <div>
                        {result.errors && (
                          <div className="flex items-start gap-2 mb-2 text-destructive text-xs">
                            <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                            <span>Compilation / Runtime Error</span>
                          </div>
                        )}
                        <pre className="font-mono text-xs text-muted-foreground whitespace-pre-wrap">
                          {result.output || "No output"}
                        </pre>
                        {result.executionTime && !result.errors && (
                          <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Clock size={12} />
                            Execution time: {result.executionTime}
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground">Click 'Run Code' to compile and execute your {languageLabels[language]} code.</p>
                    )}
                  </motion.div>
                )}

                {activeTab === "tests" && (
                  <motion.div key="tests" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
                    {!result ? (
                      <p className="text-xs text-muted-foreground">Run your code to see test results.</p>
                    ) : result.testResults.length === 0 ? (
                      <p className="text-xs text-muted-foreground">No test results available.</p>
                    ) : (
                      result.testResults.map((t, idx) => {
                        const isHidden = problem.testCases[idx]?.hidden;
                        return (
                          <div
                            key={t.id}
                            className={`rounded-lg border p-3 text-xs ${
                              t.passed
                                ? "border-green-500/30 bg-green-500/5"
                                : "border-red-500/30 bg-red-500/5"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <div className="flex items-center gap-2">
                                {t.passed ? (
                                  <CheckCircle2 size={14} className="text-green-500" />
                                ) : (
                                  <XCircle size={14} className="text-red-500" />
                                )}
                                <span className="font-semibold text-foreground">
                                  Test Case {t.id}
                                  {isHidden && (
                                    <span className="ml-2 inline-flex items-center gap-1 text-muted-foreground font-normal">
                                      <Lock size={10} /> Hidden
                                    </span>
                                  )}
                                </span>
                              </div>
                              <span className="text-muted-foreground">{t.executionTime}</span>
                            </div>
                            <div className="space-y-0.5 font-mono text-muted-foreground pl-6">
                              {isHidden ? (
                                <p className="italic">Input and expected output are hidden</p>
                              ) : (
                                <>
                                  <p><span className="text-foreground">Input:</span> {t.input}</p>
                                  <p><span className="text-foreground">Expected:</span> {t.expected}</p>
                                  <p>
                                    <span className="text-foreground">Actual:</span>{" "}
                                    <span className={t.passed ? "text-green-500" : "text-red-500"}>{t.actual}</span>
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </motion.div>
                )}

                {activeTab === "complexity" && (
                  <motion.div key="complexity" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {!result ? (
                      <p className="text-xs text-muted-foreground">Run your code to see complexity analysis.</p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="rounded-lg border border-border bg-secondary/30 p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock size={16} className="text-primary" />
                            <span className="text-sm font-semibold text-foreground">Time Complexity</span>
                          </div>
                          <p className="text-2xl font-bold font-mono text-primary mb-1">{result.timeComplexity}</p>
                          <p className="text-xs text-muted-foreground">{result.timeExplanation}</p>
                        </div>
                        <div className="rounded-lg border border-border bg-secondary/30 p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Cpu size={16} className="text-accent" />
                            <span className="text-sm font-semibold text-foreground">Space Complexity</span>
                          </div>
                          <p className="text-2xl font-bold font-mono text-accent mb-1">{result.spaceComplexity}</p>
                          <p className="text-xs text-muted-foreground">{result.spaceExplanation}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Compiler;

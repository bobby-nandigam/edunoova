import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, Copy, Check, Clock, Cpu, CheckCircle2, XCircle, Loader2, AlertTriangle } from "lucide-react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";

const problems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.`,
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
    ],
    constraints: ["2 ≤ nums.length ≤ 10⁴", "-10⁹ ≤ nums[i] ≤ 10⁹", "Only one valid answer exists."],
    template: `def two_sum(nums, target):
    # Your solution here
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []

# Test
print(two_sum([2,7,11,15], 9))`,
    testCases: [
      { input: "nums=[2,7,11,15], target=9", expected: "[0, 1]" },
      { input: "nums=[3,2,4], target=6", expected: "[1, 2]" },
      { input: "nums=[3,3], target=6", expected: "[0, 1]" },
    ],
  },
  {
    id: 2,
    title: "Reverse Linked List",
    difficulty: "Easy",
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.`,
    examples: [
      { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" },
      { input: "head = [1,2]", output: "[2,1]" },
    ],
    constraints: ["0 ≤ Number of nodes ≤ 5000", "-5000 ≤ Node.val ≤ 5000"],
    template: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_list(head):
    prev = None
    curr = head
    while curr:
        next_node = curr.next
        curr.next = prev
        prev = curr
        curr = next_node
    return prev

# Test helper
def to_list(node):
    result = []
    while node:
        result.append(node.val)
        node = node.next
    return result

def from_list(arr):
    dummy = ListNode(0)
    curr = dummy
    for v in arr:
        curr.next = ListNode(v)
        curr = curr.next
    return dummy.next

head = from_list([1,2,3,4,5])
print(to_list(reverse_list(head)))`,
    testCases: [
      { input: "head = [1,2,3,4,5]", expected: "[5, 4, 3, 2, 1]" },
      { input: "head = [1,2]", expected: "[2, 1]" },
      { input: "head = []", expected: "[]" },
    ],
  },
  {
    id: 4,
    title: "Maximum Subarray",
    difficulty: "Medium",
    description: `Given an integer array nums, find the subarray with the largest sum, and return its sum.`,
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
      { input: "nums = [1]", output: "1" },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴"],
    template: `def max_subarray(nums):
    max_sum = nums[0]
    current_sum = nums[0]
    for i in range(1, len(nums)):
        current_sum = max(nums[i], current_sum + nums[i])
        max_sum = max(max_sum, current_sum)
    return max_sum

print(max_subarray([-2,1,-3,4,-1,2,1,-5,4]))`,
    testCases: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", expected: "6" },
      { input: "nums = [1]", expected: "1" },
      { input: "nums = [5,4,-1,7,8]", expected: "23" },
    ],
  },
  {
    id: 10,
    title: "Trapping Rain Water",
    difficulty: "Hard",
    description: `Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.`,
    examples: [
      { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" },
      { input: "height = [4,2,0,3,2,5]", output: "9" },
    ],
    constraints: ["n == height.length", "1 ≤ n ≤ 2 × 10⁴", "0 ≤ height[i] ≤ 10⁵"],
    template: `def trap(height):
    if not height:
        return 0
    left, right = 0, len(height) - 1
    left_max, right_max = height[left], height[right]
    water = 0
    while left < right:
        if left_max < right_max:
            left += 1
            left_max = max(left_max, height[left])
            water += left_max - height[left]
        else:
            right -= 1
            right_max = max(right_max, height[right])
            water += right_max - height[right]
    return water

print(trap([0,1,0,2,1,0,1,3,2,1,2,1]))`,
    testCases: [
      { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", expected: "6" },
      { input: "height = [4,2,0,3,2,5]", expected: "9" },
      { input: "height = [1,0,1]", expected: "1" },
    ],
  },
];

const defaultProblem = problems[0];

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
  const problem = problems.find((p) => p.id === problemId) || defaultProblem;

  const [code, setCode] = useState(problem.template);
  const [running, setRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"output" | "tests" | "complexity">("output");
  const [result, setResult] = useState<RunResult | null>(null);

  const handleRun = async () => {
    setRunning(true);
    setActiveTab("output");
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke("run-python", {
        body: {
          code,
          testCases: problem.testCases,
          problemTitle: problem.title,
        },
      });

      if (error) throw error;
      setResult(data as RunResult);
      // Auto-switch to tests tab if test results exist
      if (data?.testResults?.length > 0) {
        setActiveTab("tests");
      }
    } catch (err: any) {
      setResult({
        output: `Error: ${err.message || "Failed to execute code"}`,
        testResults: [],
        timeComplexity: "N/A",
        timeExplanation: "",
        spaceComplexity: "N/A",
        spaceExplanation: "",
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
          <div>
            <p className="text-xs font-semibold text-card-foreground mb-2">Constraints:</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              {problem.constraints.map((c, i) => (
                <li key={i} className="font-mono">• {c}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Editor + Output */}
        <div className="lg:w-[58%] flex flex-col overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-md text-xs font-semibold gradient-btn text-primary-foreground">
                Python
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleCopy} className="p-2 rounded-md hover:bg-secondary text-muted-foreground transition-colors" title="Copy code">
                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
              </button>
              <button onClick={() => { setCode(problem.template); setResult(null); }} className="p-2 rounded-md hover:bg-secondary text-muted-foreground transition-colors" title="Reset">
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
            {/* Tabs */}
            <div className="flex items-center gap-1 px-4 py-1.5 border-b border-border">
              {(["output", "tests", "complexity"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-colors ${
                    activeTab === tab
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground"
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

            {/* Tab content */}
            <div className="flex-1 overflow-y-auto p-4">
              <AnimatePresence mode="wait">
                {activeTab === "output" && (
                  <motion.div key="output" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {running ? (
                      <div className="flex items-center gap-2 text-muted-foreground text-xs">
                        <Loader2 size={14} className="animate-spin" />
                        Executing Python code...
                      </div>
                    ) : result ? (
                      <div>
                        {result.errors && (
                          <div className="flex items-start gap-2 mb-2 text-destructive text-xs">
                            <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                            <span>Error detected</span>
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
                      <p className="text-xs text-muted-foreground">Click 'Run Code' to execute your Python code.</p>
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
                      result.testResults.map((t) => (
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
                              <span className="font-semibold text-foreground">Test Case {t.id}</span>
                            </div>
                            <span className="text-muted-foreground">{t.executionTime}</span>
                          </div>
                          <div className="space-y-0.5 font-mono text-muted-foreground pl-6">
                            <p><span className="text-foreground">Input:</span> {t.input}</p>
                            <p><span className="text-foreground">Expected:</span> {t.expected}</p>
                            <p>
                              <span className="text-foreground">Actual:</span>{" "}
                              <span className={t.passed ? "text-green-500" : "text-red-500"}>{t.actual}</span>
                            </p>
                          </div>
                        </div>
                      ))
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

import { useState } from "react";
import { motion } from "framer-motion";
import { Bug, Send, Sparkles, Code2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AIDebug = () => {
  const [code, setCode] = useState(`function twoSum(nums, target) {\n  for (let i = 0; i < nums.length; i++) {\n    for (let j = 0; j < nums.length; j++) {\n      if (nums[i] + nums[j] === target) {\n        return [i, j];\n      }\n    }\n  }\n}`);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    setLoading(true);
    setTimeout(() => {
      setAnalysis(`🔍 **Bug Found: Duplicate Index Usage**

**Line 3:** The inner loop starts at \`j = 0\` instead of \`j = i + 1\`. This means the same element can be used twice (when \`i === j\`), which violates the problem constraint.

**Fix:**
\`\`\`javascript
for (let j = i + 1; j < nums.length; j++) {
\`\`\`

**⚡ Optimization Suggestion:**
Your current solution is O(n²). Consider using a HashMap for O(n) time complexity:

\`\`\`javascript
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
}
\`\`\`

✅ **Summary:** Fixed duplicate index bug and improved from O(n²) to O(n).`);
      setLoading(false);
    }, 2000);
  };

  return (
    <main>
      <Navbar />
      <div className="pt-32 pb-20 min-h-screen section-gradient">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg gradient-btn flex items-center justify-center text-primary-foreground">
                <Bug size={20} />
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold">
                AI <span className="gradient-text">Code Debugger</span>
              </h1>
            </div>
            <p className="text-muted-foreground mb-8">Paste your code and let AI find bugs, suggest fixes, and optimize.</p>

            <div className="grid lg:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Code2 size={16} className="text-primary" />
                    <span className="text-sm font-semibold text-foreground">Your Code</span>
                  </div>
                </div>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  spellCheck={false}
                  rows={18}
                  className="w-full p-4 font-mono text-sm bg-[hsl(220,30%,6%)] text-[hsl(220,10%,90%)] rounded-xl border border-border resize-none focus:outline-none focus:ring-2 focus:ring-ring leading-6"
                />
                <button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className="mt-4 w-full flex items-center justify-center gap-2 gradient-btn text-primary-foreground px-6 py-3 rounded-lg font-semibold disabled:opacity-50 transition-all"
                >
                  {loading ? <><Sparkles size={16} className="animate-spin" /> Analyzing...</> : <><Send size={16} /> Analyze & Debug</>}
                </button>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={16} className="text-primary" />
                  <span className="text-sm font-semibold text-foreground">AI Analysis</span>
                </div>
                <div className="bg-card rounded-xl border border-border p-5 min-h-[400px]">
                  {analysis ? (
                    <div className="text-sm text-card-foreground whitespace-pre-wrap leading-relaxed">{analysis}</div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-sm py-20">
                      <Bug size={40} className="mb-4 opacity-30" />
                      <p>Paste your code and click "Analyze & Debug"</p>
                      <p className="text-xs mt-1">AI will find bugs and suggest optimizations</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default AIDebug;

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Clock, Play, Loader2, CheckCircle2, X, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { recordActivity } from "@/hooks/useUserStats";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type MockTest = {
  id: string;
  title: string;
  questions_count: number;
  duration_minutes: number;
  difficulty: string;
  category: string;
};

type Question = {
  id: string;
  question_text: string;
  options: string[];
  correct_answer: number;
  explanation: string;
};

const diffColor: Record<string, string> = {
  Easy: "text-green-500 bg-green-500/10",
  Medium: "text-yellow-500 bg-yellow-500/10",
  Hard: "text-red-500 bg-red-500/10",
};

const MockTests = () => {
  const { user } = useAuth();
  const [tests, setTests] = useState<MockTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTest, setActiveTest] = useState<MockTest | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [startTime, setStartTime] = useState(0);

  useEffect(() => {
    const fetchTests = async () => {
      const { data } = await supabase.from("mock_tests").select("*").order("created_at");
      setTests(data || []);
      setLoading(false);
    };
    fetchTests();
  }, []);

  const startTest = async (test: MockTest) => {
    const { data } = await supabase
      .from("mock_test_questions")
      .select("*")
      .eq("test_id", test.id);

    if (!data || data.length === 0) {
      toast({ title: "No questions available", description: "This test has no questions yet.", variant: "destructive" });
      return;
    }

    setQuestions(data.map(q => ({
      ...q,
      options: typeof q.options === "string" ? JSON.parse(q.options) : (q.options as string[]),
    })));
    setActiveTest(test);
    setCurrentQ(0);
    setAnswers({});
    setShowResults(false);
    setStartTime(Date.now());
  };

  const selectAnswer = (qIdx: number, optIdx: number) => {
    setAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const finishTest = async () => {
    setShowResults(true);
    const score = questions.reduce((s, q, i) => s + (answers[i] === q.correct_answer ? 1 : 0), 0);
    const timeTaken = Math.round((Date.now() - startTime) / 1000);

    if (user && activeTest) {
      await supabase.from("user_test_attempts").insert({
        user_id: user.id,
        test_id: activeTest.id,
        score,
        total_questions: questions.length,
        time_taken_seconds: timeTaken,
        answers: answers as any,
      });
      await recordActivity(user.id, 0, score * 10);
    }
  };

  const score = questions.reduce((s, q, i) => s + (answers[i] === q.correct_answer ? 1 : 0), 0);

  if (activeTest) {
    return (
      <main>
        <Navbar />
        <div className="pt-28 pb-20 min-h-screen section-gradient">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="flex items-center justify-between mb-6">
              <h1 className="font-display text-xl font-bold text-foreground">{activeTest.title}</h1>
              <button onClick={() => setActiveTest(null)} className="text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </div>

            {showResults ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="bg-card rounded-xl border border-border p-6 text-center">
                  <h2 className="font-display text-2xl font-bold text-card-foreground mb-2">Test Complete!</h2>
                  <p className="text-4xl font-bold text-primary mb-1">{score}/{questions.length}</p>
                  <p className="text-sm text-muted-foreground">
                    {Math.round((score / questions.length) * 100)}% correct · +{score * 10} XP earned
                  </p>
                </div>

                {questions.map((q, i) => (
                  <div key={q.id} className={`bg-card rounded-xl border p-4 ${answers[i] === q.correct_answer ? "border-green-500/30" : "border-red-500/30"}`}>
                    <p className="text-sm font-medium text-card-foreground mb-2">{i + 1}. {q.question_text}</p>
                    <div className="space-y-1.5">
                      {q.options.map((opt, oi) => (
                        <div key={oi} className={`px-3 py-1.5 rounded-lg text-xs ${
                          oi === q.correct_answer ? "bg-green-500/10 text-green-600 font-semibold" :
                          oi === answers[i] && oi !== q.correct_answer ? "bg-red-500/10 text-red-600" :
                          "text-muted-foreground"
                        }`}>
                          {opt}
                          {oi === q.correct_answer && <CheckCircle2 size={12} className="inline ml-1" />}
                        </div>
                      ))}
                    </div>
                    {q.explanation && (
                      <p className="text-[11px] text-muted-foreground mt-2 italic">{q.explanation}</p>
                    )}
                  </div>
                ))}

                <button
                  onClick={() => setActiveTest(null)}
                  className="gradient-btn text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-semibold w-full"
                >
                  Back to Tests
                </button>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span>Question {currentQ + 1} of {questions.length}</span>
                  <span>{Object.keys(answers).length} answered</span>
                </div>

                <div className="bg-card rounded-xl border border-border p-6">
                  <p className="font-display font-semibold text-card-foreground mb-4">
                    {questions[currentQ]?.question_text}
                  </p>
                  <div className="space-y-2">
                    {questions[currentQ]?.options.map((opt, oi) => (
                      <button
                        key={oi}
                        onClick={() => selectAnswer(currentQ, oi)}
                        className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all border ${
                          answers[currentQ] === oi
                            ? "border-primary bg-primary/10 text-primary font-semibold"
                            : "border-border hover:bg-secondary text-card-foreground"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
                    disabled={currentQ === 0}
                    className="px-4 py-2 rounded-lg text-sm border border-border text-card-foreground disabled:opacity-30"
                  >
                    Previous
                  </button>
                  {currentQ < questions.length - 1 ? (
                    <button
                      onClick={() => setCurrentQ(currentQ + 1)}
                      className="gradient-btn text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1"
                    >
                      Next <ArrowRight size={14} />
                    </button>
                  ) : (
                    <button
                      onClick={finishTest}
                      className="gradient-btn text-primary-foreground px-6 py-2 rounded-lg text-sm font-semibold"
                    >
                      Submit Test
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Navbar />
      <div className="pt-32 pb-20 min-h-screen section-gradient">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">
              Mock <span className="gradient-text">Tests</span>
            </h1>
            <p className="text-muted-foreground mb-8">Test your knowledge with timed assessments.</p>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="animate-spin text-primary" size={32} />
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tests.map((t, i) => (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="bg-card rounded-xl p-5 border border-border card-hover cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary/10 text-primary">{t.category}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${diffColor[t.difficulty] || ""}`}>{t.difficulty}</span>
                    </div>
                    <h3 className="font-display font-semibold text-card-foreground mb-3">{t.title}</h3>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1"><FileText size={12} /> {t.questions_count} Qs</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {t.duration_minutes} min</span>
                    </div>
                    <button
                      onClick={() => startTest(t)}
                      className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold gradient-btn text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Play size={12} /> Start Test
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default MockTests;

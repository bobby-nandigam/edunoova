import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Trophy, Zap, Star, Timer, CheckCircle2, XCircle,
  ArrowRight, Shield, Flame, Target, Award, SkipForward,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ModuleChallengeProps {
  moduleName: string;
  moduleIndex: number;
  topics: string[];
  onComplete: (xp: number) => void;
  onSkip: () => void;
}

type Question = {
  question: string;
  options: string[];
  correct: number;
  topic: string;
};

function generateQuestions(moduleName: string, topics: string[]): Question[] {
  // Generate quiz questions based on module topics
  const questions: Question[] = topics.slice(0, 5).map((topic, i) => {
    const templates = [
      {
        question: `Which of the following best describes "${topic}"?`,
        options: [
          `A core concept in ${moduleName} dealing with ${topic.toLowerCase()}`,
          `An unrelated concept from a different field`,
          `A deprecated approach no longer used in modern systems`,
          `A hardware-specific implementation detail`,
        ],
        correct: 0,
      },
      {
        question: `In the context of ${moduleName}, what is the primary purpose of ${topic}?`,
        options: [
          `To handle user interface rendering`,
          `To solve problems related to ${topic.toLowerCase()} efficiently`,
          `To manage network communications only`,
          `To perform database migrations`,
        ],
        correct: 1,
      },
      {
        question: `Which scenario would most benefit from applying ${topic}?`,
        options: [
          `When designing a simple static webpage`,
          `When working on unrelated mathematical proofs`,
          `When building systems that require ${topic.toLowerCase()} principles`,
          `When writing documentation only`,
        ],
        correct: 2,
      },
    ];
    const template = templates[i % templates.length];
    return { ...template, topic };
  });

  return questions;
}

type ChallengePhase = "intro" | "quiz" | "speed" | "results";

const ModuleChallenge = ({ moduleName, moduleIndex, topics, onComplete, onSkip }: ModuleChallengeProps) => {
  const [phase, setPhase] = useState<ChallengePhase>("intro");
  const [questions] = useState(() => generateQuestions(moduleName, topics));
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [totalTime, setTotalTime] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [speedRoundScore, setSpeedRoundScore] = useState(0);
  const [speedRoundTotal, setSpeedRoundTotal] = useState(0);
  const [speedRoundActive, setSpeedRoundActive] = useState(false);
  const [speedQ, setSpeedQ] = useState<{ topic: string; isTrue: boolean; statement: string } | null>(null);
  const [speedTimeLeft, setSpeedTimeLeft] = useState(30);
  const [showSpeedFeedback, setShowSpeedFeedback] = useState<"correct" | "wrong" | null>(null);

  // Quiz timer
  useEffect(() => {
    if (phase !== "quiz" || answered) return;
    if (timeLeft <= 0) {
      handleAnswer(-1);
      return;
    }
    const t = setTimeout(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, phase, answered]);

  // Speed round timer
  useEffect(() => {
    if (phase !== "speed" || !speedRoundActive) return;
    if (speedTimeLeft <= 0) {
      finishChallenge();
      return;
    }
    const t = setTimeout(() => setSpeedTimeLeft((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [speedTimeLeft, phase, speedRoundActive]);

  const generateSpeedQuestion = useCallback(() => {
    const topic = topics[Math.floor(Math.random() * topics.length)];
    const isTrue = Math.random() > 0.4;
    const trueStatements = [
      `${topic} is a key concept in ${moduleName}.`,
      `Understanding ${topic} is important for this module.`,
      `${topic} has practical applications in software development.`,
    ];
    const falseStatements = [
      `${topic} is not related to computer science at all.`,
      `${topic} was removed from modern curricula entirely.`,
      `${topic} only applies to hardware design, not software.`,
    ];
    const statements = isTrue ? trueStatements : falseStatements;
    return {
      topic,
      isTrue,
      statement: statements[Math.floor(Math.random() * statements.length)],
    };
  }, [topics, moduleName]);

  const handleAnswer = (optionIdx: number) => {
    if (answered) return;
    setAnswered(true);
    setSelected(optionIdx);
    const correct = optionIdx === questions[currentQ].correct;
    if (correct) {
      setScore((s) => s + 1);
      setStreak((s) => {
        const newStreak = s + 1;
        setMaxStreak((m) => Math.max(m, newStreak));
        return newStreak;
      });
    } else {
      setStreak(0);
    }
    setTotalTime((t) => t + (20 - timeLeft));
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setAnswered(false);
      setTimeLeft(20);
    } else {
      // Start speed round
      setPhase("speed");
      setSpeedRoundActive(true);
      setSpeedQ(generateSpeedQuestion());
    }
  };

  const handleSpeedAnswer = (answer: boolean) => {
    if (!speedQ || showSpeedFeedback) return;
    const correct = answer === speedQ.isTrue;
    setSpeedRoundTotal((t) => t + 1);
    if (correct) {
      setSpeedRoundScore((s) => s + 1);
      setShowSpeedFeedback("correct");
    } else {
      setShowSpeedFeedback("wrong");
    }
    setTimeout(() => {
      setShowSpeedFeedback(null);
      setSpeedQ(generateSpeedQuestion());
    }, 600);
  };

  const finishChallenge = () => {
    setSpeedRoundActive(false);
    setPhase("results");
  };

  const calculateXP = () => {
    const quizXP = score * 20;
    const streakBonus = maxStreak >= 3 ? 30 : maxStreak >= 2 ? 15 : 0;
    const speedXP = speedRoundScore * 5;
    const timeBonus = totalTime < questions.length * 10 ? 25 : 0;
    return quizXP + streakBonus + speedXP + timeBonus;
  };

  const getBadge = () => {
    const pct = score / questions.length;
    if (pct === 1) return { label: "Perfect Score", icon: Star, color: "text-amber-500" };
    if (pct >= 0.8) return { label: "Module Master", icon: Award, color: "text-primary" };
    if (pct >= 0.6) return { label: "Quick Learner", icon: Zap, color: "text-accent" };
    return { label: "Keep Going", icon: Target, color: "text-muted-foreground" };
  };

  // INTRO phase
  if (phase === "intro") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-card border border-border rounded-xl p-8 text-center"
      >
        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 flex items-center justify-center mb-4">
          <Trophy size={32} className="text-amber-500" />
        </div>
        <h2 className="font-display text-2xl font-bold text-card-foreground mb-2">
          Module Challenge Unlocked!
        </h2>
        <p className="text-muted-foreground mb-1">
          You've completed all topics in <span className="font-semibold text-foreground">{moduleName}</span>
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          Test your knowledge with a quiz + speed round to earn XP and badges.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 max-w-md mx-auto mb-8">
          <div className="bg-muted/50 rounded-lg p-3">
            <Target size={18} className="mx-auto text-primary mb-1" />
            <div className="text-xs font-semibold text-card-foreground">{questions.length} Questions</div>
            <div className="text-[10px] text-muted-foreground">Multiple choice</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-3">
            <Flame size={18} className="mx-auto text-amber-500 mb-1" />
            <div className="text-xs font-semibold text-card-foreground">Speed Round</div>
            <div className="text-[10px] text-muted-foreground">True or False</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-3">
            <Zap size={18} className="mx-auto text-accent mb-1" />
            <div className="text-xs font-semibold text-card-foreground">Earn XP</div>
            <div className="text-[10px] text-muted-foreground">Up to {questions.length * 20 + 55}+</div>
          </div>
        </div>

        <div className="flex justify-center gap-3">
          <button
            onClick={() => setPhase("quiz")}
            className="gradient-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-primary-foreground shadow-lg hover:shadow-xl transition-all"
          >
            <Zap size={16} /> Start Challenge
          </button>
          <button
            onClick={onSkip}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium border border-border text-muted-foreground hover:bg-muted/50 transition-colors"
          >
            <SkipForward size={14} /> Skip
          </button>
        </div>
      </motion.div>
    );
  }

  // QUIZ phase
  if (phase === "quiz") {
    const q = questions[currentQ];
    return (
      <motion.div
        key={`q-${currentQ}`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-5"
      >
        {/* Quiz header */}
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-muted-foreground">
                Question {currentQ + 1}/{questions.length}
              </span>
              {streak >= 2 && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-full">
                  <Flame size={12} /> {streak} streak
                </span>
              )}
            </div>
            <div className={`flex items-center gap-1.5 text-sm font-mono font-bold ${
              timeLeft <= 5 ? "text-destructive" : "text-muted-foreground"
            }`}>
              <Timer size={14} /> {timeLeft}s
            </div>
          </div>
          <Progress value={(timeLeft / 20) * 100} className="h-1.5" />
        </div>

        {/* Question */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="text-[10px] text-muted-foreground mb-2 uppercase tracking-wider">
            Topic: {q.topic}
          </div>
          <h3 className="font-display text-lg font-semibold text-card-foreground mb-5">
            {q.question}
          </h3>
          <div className="space-y-3">
            {q.options.map((opt, i) => {
              let classes = "w-full text-left px-4 py-3 rounded-lg border text-sm transition-all ";
              if (answered) {
                if (i === q.correct) {
                  classes += "border-accent bg-accent/10 text-accent font-medium";
                } else if (i === selected && i !== q.correct) {
                  classes += "border-destructive bg-destructive/10 text-destructive";
                } else {
                  classes += "border-border text-muted-foreground opacity-50";
                }
              } else {
                classes += "border-border hover:border-primary/40 hover:bg-primary/5 text-card-foreground cursor-pointer";
              }
              return (
                <button key={i} onClick={() => handleAnswer(i)} disabled={answered} className={classes}>
                  <span className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold shrink-0">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                    {answered && i === q.correct && <CheckCircle2 size={16} className="ml-auto text-accent shrink-0" />}
                    {answered && i === selected && i !== q.correct && <XCircle size={16} className="ml-auto text-destructive shrink-0" />}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {answered && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
            <button
              onClick={nextQuestion}
              className="gradient-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-primary-foreground"
            >
              {currentQ < questions.length - 1 ? "Next Question" : "Speed Round"} <ArrowRight size={14} />
            </button>
          </motion.div>
        )}
      </motion.div>
    );
  }

  // SPEED ROUND phase
  if (phase === "speed") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-5"
      >
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Flame size={16} className="text-amber-500" />
              <span className="text-sm font-bold text-card-foreground">Speed Round</span>
              <span className="text-xs text-muted-foreground">True or False</span>
            </div>
            <div className={`flex items-center gap-1.5 text-sm font-mono font-bold ${
              speedTimeLeft <= 5 ? "text-destructive" : "text-muted-foreground"
            }`}>
              <Timer size={14} /> {speedTimeLeft}s
            </div>
          </div>
          <Progress value={(speedTimeLeft / 30) * 100} className="h-1.5" />
          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-accent" /> {speedRoundScore} correct</span>
            <span>{speedRoundTotal} answered</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-8 text-center relative overflow-hidden">
          {showSpeedFeedback && (
            <motion.div
              initial={{ opacity: 0, scale: 2 }}
              animate={{ opacity: 0.15, scale: 1 }}
              className={`absolute inset-0 ${showSpeedFeedback === "correct" ? "bg-accent" : "bg-destructive"}`}
            />
          )}
          {speedQ && (
            <>
              <p className="text-lg font-medium text-card-foreground mb-6 relative z-10">
                "{speedQ.statement}"
              </p>
              <div className="flex justify-center gap-4 relative z-10">
                <button
                  onClick={() => handleSpeedAnswer(true)}
                  className="px-8 py-3 rounded-xl text-sm font-semibold bg-accent/10 border border-accent/30 text-accent hover:bg-accent/20 transition-colors"
                >
                  <CheckCircle2 size={16} className="inline mr-2" /> True
                </button>
                <button
                  onClick={() => handleSpeedAnswer(false)}
                  className="px-8 py-3 rounded-xl text-sm font-semibold bg-destructive/10 border border-destructive/30 text-destructive hover:bg-destructive/20 transition-colors"
                >
                  <XCircle size={16} className="inline mr-2" /> False
                </button>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-center">
          <button
            onClick={finishChallenge}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            End round early →
          </button>
        </div>
      </motion.div>
    );
  }

  // RESULTS phase
  const xp = calculateXP();
  const badge = getBadge();
  const BadgeIcon = badge.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-card border border-border rounded-xl p-8 text-center"
    >
      <div className={`w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4`}>
        <BadgeIcon size={32} className={badge.color} />
      </div>
      <h2 className="font-display text-2xl font-bold text-card-foreground mb-1">
        Challenge Complete!
      </h2>
      <p className="text-muted-foreground text-sm mb-6">
        {moduleName} — Module {moduleIndex + 1}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-lg mx-auto mb-6">
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="text-lg font-bold text-card-foreground">{score}/{questions.length}</div>
          <div className="text-[10px] text-muted-foreground">Quiz Score</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="text-lg font-bold text-card-foreground">{maxStreak}</div>
          <div className="text-[10px] text-muted-foreground">Best Streak</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="text-lg font-bold text-card-foreground">{speedRoundScore}</div>
          <div className="text-[10px] text-muted-foreground">Speed Correct</div>
        </div>
        <div className="bg-amber-500/10 rounded-lg p-3">
          <div className="text-lg font-bold text-amber-600">{xp}</div>
          <div className="text-[10px] text-muted-foreground">XP Earned</div>
        </div>
      </div>

      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 text-sm font-medium text-card-foreground mb-6">
        <BadgeIcon size={16} className={badge.color} />
        Badge: {badge.label}
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => onComplete(xp)}
          className="gradient-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-primary-foreground shadow-lg hover:shadow-xl transition-all"
        >
          Continue Learning <ArrowRight size={14} />
        </button>
      </div>
    </motion.div>
  );
};

export default ModuleChallenge;

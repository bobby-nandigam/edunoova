import { useState } from "react";
import { Menu, X, Code2, BookOpen, Zap, Flame, Terminal, Layout, Trophy, MessageSquare, Bug, FileText, Target, BarChart3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import edunovaLogo from "@/assets/edunova-logo.png";

const navLinks = [
  { label: "Courses", href: "#learning-paths" },
  { label: "Subjects", href: "#subjects" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const quickLinks = [
  { label: "Practice", icon: Code2, href: "/practice", highlight: true },
  { label: "Topics", icon: BookOpen, href: "/topics" },
  { label: "Easy", icon: Zap, href: "/practice?difficulty=easy" },
  { label: "Hard", icon: Flame, href: "/practice?difficulty=hard" },
  { label: "Compiler", icon: Terminal, href: "/compiler" },
  { label: "System Design", icon: Layout, href: "/system-design" },
  { label: "Streak", icon: Trophy, href: "/streak" },
  { label: "Discussions", icon: MessageSquare, href: "/discussions" },
  { label: "AI Debug", icon: Bug, href: "/ai-debug" },
  { label: "Mock Tests", icon: FileText, href: "/mock-tests" },
  { label: "Interview Prep", icon: Target, href: "/interview-prep" },
  { label: "Leaderboard", icon: BarChart3, href: "/leaderboard" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleQuickLink = (href: string) => {
    navigate(href);
    setOpen(false);
  };

  const handleNavLink = (href: string) => {
    if (location.pathname !== "/") {
      navigate("/" + href);
    } else {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="glass">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }} className="flex items-center">
            <img src={edunovaLogo} alt="EduNova" className="h-10" />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <button
                key={l.label}
                onClick={() => handleNavLink(l.href)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </button>
            ))}
            <a
              href="#onboarding"
              className="gradient-btn px-5 py-2 rounded-lg text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg"
            >
              Start Free
            </a>
          </div>

          <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Quick access bar */}
      <div className="hidden md:block border-b border-border bg-card/80 backdrop-blur-md">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-1 py-1.5 overflow-x-auto scrollbar-hide">
            {quickLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleQuickLink(link.href)}
                className={`whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:scale-105 ${
                  link.highlight
                    ? "gradient-btn text-primary-foreground shadow-sm"
                    : "bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                <link.icon size={13} />
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-border"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {navLinks.map((l) => (
                <button
                  key={l.label}
                  onClick={() => handleNavLink(l.href)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground text-left"
                >
                  {l.label}
                </button>
              ))}

              <div className="border-t border-border pt-4 mt-2">
                <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Quick Access</p>
                <div className="flex flex-wrap gap-2">
                  {quickLinks.map((link) => (
                    <button
                      key={link.label}
                      onClick={() => handleQuickLink(link.href)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                        link.highlight
                          ? "gradient-btn text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      <link.icon size={12} />
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>

              <a
                href="#onboarding"
                onClick={() => setOpen(false)}
                className="gradient-btn px-5 py-2.5 rounded-lg text-sm font-semibold text-primary-foreground text-center mt-2"
              >
                Start Free
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

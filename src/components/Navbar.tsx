import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import edunovaLogo from "@/assets/edunova-logo.png";

const navLinks = [
  { label: "Courses", href: "#learning-paths" },
  { label: "Subjects", href: "#subjects" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const quickLinks = [
  { label: "🧠 Practice DSA", href: "#learning-paths", highlight: true },
  { label: "📚 Topics", href: "#subjects" },
  { label: "🟢 Easy", href: "#learning-paths" },
  { label: "🔴 Hard", href: "#learning-paths" },
  { label: "⚙️ Compilers", href: "/subjects/compilers", route: true },
  { label: "🏗️ System Design", href: "/subjects/software-engineering", route: true },
  { label: "🔥 Streak", href: "#features" },
  { label: "💬 Discussions", href: "#faq" },
  { label: "🤖 AI Debug", href: "#features" },
  { label: "📝 Mock Tests", href: "#learning-paths" },
  { label: "🎯 Interview Prep", href: "#learning-paths" },
  { label: "📊 Leaderboard", href: "#features" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleQuickLink = (link: typeof quickLinks[0]) => {
    if (link.route) {
      navigate(link.href);
    } else {
      window.location.hash = link.href.replace("#", "");
    }
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Main nav */}
      <div className="glass">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center">
            <img src={edunovaLogo} alt="EduNova" className="h-10" />
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#onboarding"
              className="gradient-btn px-5 py-2 rounded-lg text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg"
            >
              Start Free
            </a>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Quick access bar — Desktop */}
      <div className="hidden md:block border-b border-border bg-card/80 backdrop-blur-md">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-1 py-1.5 overflow-x-auto scrollbar-hide">
            {quickLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleQuickLink(link)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:scale-105 ${
                  link.highlight
                    ? "gradient-btn text-primary-foreground shadow-sm"
                    : "bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
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
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  {l.label}
                </a>
              ))}

              {/* Quick links in mobile */}
              <div className="border-t border-border pt-4 mt-2">
                <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Quick Access</p>
                <div className="flex flex-wrap gap-2">
                  {quickLinks.map((link) => (
                    <button
                      key={link.label}
                      onClick={() => handleQuickLink(link)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                        link.highlight
                          ? "gradient-btn text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
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

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Courses", href: "#learning-paths" },
  { label: "Subjects", href: "#subjects" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-primary-foreground/10">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <a href="#" className="flex flex-col">
          <span className="font-display text-2xl font-bold text-primary-foreground italic">Eduva</span>
          <span className="text-[10px] tracking-widest uppercase text-primary-foreground/50 -mt-1">Learn Today. Lead Tomorrow.</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#onboarding"
            className="bg-accent text-accent-foreground px-5 py-2 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
          >
            Start Free
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-primary-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-primary border-t border-primary-foreground/10"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-primary-foreground/70 hover:text-primary-foreground"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#onboarding"
                onClick={() => setOpen(false)}
                className="bg-accent text-accent-foreground px-5 py-2.5 rounded-lg text-sm font-semibold text-center"
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

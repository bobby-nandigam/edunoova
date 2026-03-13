import { useState } from "react";
import { Menu, X, LogOut, User, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import edunovaLogo from "@/assets/edunova-logo.png";

const publicLinks = [
  { label: "Courses", href: "#learning-paths" },
  { label: "Subjects", href: "#subjects" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const learnMenu = [
  { label: "All Topics", desc: "Browse all subjects & modules", href: "/topics" },
  { label: "System Design", desc: "Architecture & scalability patterns", href: "/system-design" },
  { label: "Interview Prep", desc: "Company-wise preparation tracks", href: "/interview-prep" },
];

const practiceMenu = [
  { label: "Problem Set", desc: "Curated coding challenges", href: "/practice" },
  { label: "Mock Tests", desc: "Timed exam simulations", href: "/mock-tests" },
  { label: "Code Editor", desc: "Write & run code instantly", href: "/compiler" },
  { label: "AI Debugger", desc: "Get AI-powered code help", href: "/ai-debug" },
];

const communityMenu = [
  { label: "Discussions", desc: "Ask questions & share knowledge", href: "/discussions" },
  { label: "Leaderboard", desc: "See top performers", href: "/leaderboard" },
  { label: "Streak", desc: "Track your daily progress", href: "/streak" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile, signOut } = useAuth();

  const handleNavLink = (href: string) => {
    if (href.startsWith("#")) {
      if (location.pathname !== "/") {
        navigate("/" + href);
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(href);
    }
    setOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const initials = profile?.display_name
    ? profile.display_name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : user?.email?.[0]?.toUpperCase() || "U";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="glass">
        <div className="container mx-auto flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }} className="flex items-center">
            <img src={edunovaLogo} alt="EduNova" className="h-10" />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {user ? (
              /* --- Logged-in: category dropdowns --- */
              <NavigationMenu>
                <NavigationMenuList className="gap-0.5">
                  {/* Home */}
                  <NavigationMenuItem>
                    <button
                      onClick={() => navigate("/")}
                      className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary"
                    >
                      Home
                    </button>
                  </NavigationMenuItem>

                  {/* Learn */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-sm font-medium text-muted-foreground hover:text-foreground bg-transparent hover:bg-secondary data-[state=open]:bg-secondary">
                      Learn
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[320px] p-3">
                        {learnMenu.map((item) => (
                          <button
                            key={item.href}
                            onClick={() => handleNavLink(item.href)}
                            className="flex flex-col gap-0.5 w-full text-left px-3 py-2.5 rounded-lg hover:bg-secondary transition-colors"
                          >
                            <span className="text-sm font-medium text-foreground">{item.label}</span>
                            <span className="text-xs text-muted-foreground">{item.desc}</span>
                          </button>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Practice */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-sm font-medium text-muted-foreground hover:text-foreground bg-transparent hover:bg-secondary data-[state=open]:bg-secondary">
                      Practice
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[320px] p-3">
                        {practiceMenu.map((item) => (
                          <button
                            key={item.href}
                            onClick={() => handleNavLink(item.href)}
                            className="flex flex-col gap-0.5 w-full text-left px-3 py-2.5 rounded-lg hover:bg-secondary transition-colors"
                          >
                            <span className="text-sm font-medium text-foreground">{item.label}</span>
                            <span className="text-xs text-muted-foreground">{item.desc}</span>
                          </button>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Community */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-sm font-medium text-muted-foreground hover:text-foreground bg-transparent hover:bg-secondary data-[state=open]:bg-secondary">
                      Community
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[320px] p-3">
                        {communityMenu.map((item) => (
                          <button
                            key={item.href}
                            onClick={() => handleNavLink(item.href)}
                            className="flex flex-col gap-0.5 w-full text-left px-3 py-2.5 rounded-lg hover:bg-secondary transition-colors"
                          >
                            <span className="text-sm font-medium text-foreground">{item.label}</span>
                            <span className="text-xs text-muted-foreground">{item.desc}</span>
                          </button>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            ) : (
              /* --- Logged-out: landing page anchors --- */
              <>
                {publicLinks.map((l) => (
                  <button
                    key={l.label}
                    onClick={() => handleNavLink(l.href)}
                    className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {l.label}
                  </button>
                ))}
              </>
            )}
          </div>

          {/* Right side: auth */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 focus:outline-none">
                    <Avatar className="h-8 w-8 border-2 border-primary/30">
                      <AvatarImage src={profile?.avatar_url || undefined} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{profile?.display_name || "User"}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <button
                  onClick={() => navigate("/auth")}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate("/auth")}
                  className="gradient-btn px-5 py-2 rounded-lg text-sm font-semibold text-primary-foreground transition-all hover:shadow-lg"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-border overflow-hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {user ? (
                <>
                  {/* Mobile grouped sections */}
                  <MobileSection title="Learn" items={learnMenu} onNavigate={handleNavLink} />
                  <MobileSection title="Practice" items={practiceMenu} onNavigate={handleNavLink} />
                  <MobileSection title="Community" items={communityMenu} onNavigate={handleNavLink} />

                  <div className="border-t border-border pt-3 mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={profile?.avatar_url || undefined} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{profile?.display_name || "User"}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <button onClick={handleSignOut} className="text-destructive">
                      <LogOut size={18} />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {publicLinks.map((l) => (
                    <button
                      key={l.label}
                      onClick={() => handleNavLink(l.href)}
                      className="text-sm font-medium text-muted-foreground hover:text-foreground text-left py-2"
                    >
                      {l.label}
                    </button>
                  ))}
                  <button
                    onClick={() => { navigate("/auth"); setOpen(false); }}
                    className="gradient-btn px-5 py-2.5 rounded-lg text-sm font-semibold text-primary-foreground text-center mt-3"
                  >
                    Sign In / Get Started
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

/* Collapsible mobile section */
const MobileSection = ({
  title,
  items,
  onNavigate,
}: {
  title: string;
  items: { label: string; desc: string; href: string }[];
  onNavigate: (href: string) => void;
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-border pb-2 mb-1">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between py-2 text-sm font-semibold text-foreground"
      >
        {title}
        <ChevronDown size={16} className={`transition-transform text-muted-foreground ${expanded ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            {items.map((item) => (
              <button
                key={item.href}
                onClick={() => onNavigate(item.href)}
                className="w-full text-left pl-3 py-2 rounded-md hover:bg-secondary transition-colors"
              >
                <span className="text-sm font-medium text-foreground">{item.label}</span>
                <span className="block text-xs text-muted-foreground">{item.desc}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;

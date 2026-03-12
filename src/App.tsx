import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import PathDetail from "./pages/PathDetail";
import SubjectDetail from "./pages/SubjectDetail";
import Practice from "./pages/Practice";
import Compiler from "./pages/Compiler";
import Topics from "./pages/Topics";
import Streak from "./pages/Streak";
import Discussions from "./pages/Discussions";
import AIDebug from "./pages/AIDebug";
import MockTests from "./pages/MockTests";
import InterviewPrep from "./pages/InterviewPrep";
import Leaderboard from "./pages/Leaderboard";
import SystemDesign from "./pages/SystemDesign";
import ResetPassword from "./pages/ResetPassword";
import PathLearn from "./pages/PathLearn";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/paths/:slug" element={<PathDetail />} />
            <Route path="/subjects/:slug" element={<SubjectDetail />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/compiler" element={<Compiler />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="/streak" element={<Streak />} />
            <Route path="/discussions" element={<Discussions />} />
            <Route path="/ai-debug" element={<AIDebug />} />
            <Route path="/mock-tests" element={<MockTests />} />
            <Route path="/interview-prep" element={<InterviewPrep />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/system-design" element={<SystemDesign />} />
            <Route path="/system-design" element={<SystemDesign />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

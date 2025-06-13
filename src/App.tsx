
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Register from "./pages/Register";
import RegistrationSuccess from "./pages/RegistrationSuccess";
import Admin from "./pages/Admin";
import AdminAuth from "./pages/AdminAuth";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import TeamSubmission from "./pages/TeamSubmission";
import Sponsors from "./pages/Sponsors";
import Mentors from "./pages/Mentors";
import Jury from "./pages/Jury";
import Feedback from "./pages/Feedback";
import Prizes from "./pages/Prizes";
import Schedule from "./pages/Schedule";
import OrganizerPresentation from "./pages/OrganizerPresentation";
import PresentationView from "./pages/PresentationView";
import Contact from "./pages/Contact";
import PresentationOrder from "./pages/PresentationOrder";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/success" element={<RegistrationSuccess />} />
          <Route path="/88e13b84c1fbf8defc29b7c2998be906933115ac7b375e028271dfcbc8082f94ec7bb44f5a0b6def07608e56d1d10a25a6691edb49a1a1bae9d9095ef7ccd069" element={<AdminAuth />} />
          <Route path="/75411000208d793a9b755d7148198e7e718275377700e3adb9eeacf0feb7b17ec802bceb9d3baa893d7c1689229edf83a11ee77485879f1fad7008e5a6ecb51e" element={<Admin />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/submission" element={<TeamSubmission />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/jury" element={<Jury />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/prizes" element={<Prizes />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/organizer-presentation" element={<OrganizerPresentation />} />
          <Route path="/presentations" element={<PresentationView />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/presentation-order" element={<PresentationOrder />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

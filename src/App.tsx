
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Register from "./pages/Register";
import RegistrationSuccess from "./pages/RegistrationSuccess";
import Admin from "./pages/Admin";
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
import Contact from "./pages/Contact";

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
          <Route path="/admin" element={<Admin />} />
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
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

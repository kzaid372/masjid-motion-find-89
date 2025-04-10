
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import FindMasjid from "./pages/FindMasjid";
import PrayerTimes from "./pages/PrayerTimes";
import SavedMasjids from "./pages/SavedMasjids";
import MasjidDetails from "./pages/MasjidDetails";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import DonationPage from "./pages/DonationPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/find" element={<FindMasjid />} />
              <Route path="/prayer-times" element={<PrayerTimes />} />
              <Route path="/saved" element={<SavedMasjids />} />
              <Route path="/masjid/:id" element={<MasjidDetails />} />
              <Route path="/donate" element={<DonationPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;


import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import WebVitalsTracker from "@/components/performance/WebVitalsTracker";
import ICD10DataSeeder from "./components/mental-health/ICD10DataSeeder";
import FloatingChatButton from "./components/mental-health/FloatingChatButton";
import ChatModal from "./components/mental-health/ChatModal";

// Import all page components
import Index from "@/pages/Index";
import UeberMich from "@/pages/UeberMich";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import BlogCategory from "@/pages/BlogCategory";
import BlogArchive from "@/pages/BlogArchive";
import Auth from "@/pages/Auth";
import AuthCallback from "@/pages/AuthCallback";
import AdminDashboard from "@/pages/AdminDashboard";
import BlogAdmin from "@/pages/BlogAdmin";
import GlossaryAdmin from "@/pages/GlossaryAdmin";
import ContentAutomationAdmin from "@/pages/ContentAutomationAdmin";
import GratisBuch from "@/pages/GratisBuch";
import Glossar from "@/pages/Glossar";
import GlossaryDetail from "@/pages/GlossaryDetail";
import Kontakt from "@/pages/Kontakt";
import MentalHealthChat from "@/pages/MentalHealthChat";
import Impressum from "@/pages/Impressum";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
          <TooltipProvider>
            <GoogleAnalytics />
            <WebVitalsTracker />
            <Toaster />
            <Sonner />
            <ICD10DataSeeder />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/ueber-mich" element={<UeberMich />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/blog/category/:category" element={<BlogCategory />} />
                <Route path="/blog/archive" element={<BlogArchive />} />
                <Route path="/auth/login" element={<Auth />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute requireAdmin>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/blog"
                  element={
                    <ProtectedRoute requireAdmin>
                      <BlogAdmin />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/glossary"
                  element={
                    <ProtectedRoute requireAdmin>
                      <GlossaryAdmin />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/content-automation"
                  element={
                    <ProtectedRoute requireAdmin>
                      <ContentAutomationAdmin />
                    </ProtectedRoute>
                  }
                />
                <Route path="/gratis-buch" element={<GratisBuch />} />
                <Route path="/glossar" element={<Glossar />} />
                <Route path="/glossar/:slug" element={<GlossaryDetail />} />
                <Route path="/kontakt" element={<Kontakt />} />
                <Route path="/mental-health-chat" element={<MentalHealthChat />} />
                <Route path="/impressum" element={<Impressum />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              
              <FloatingChatButton onClick={() => setIsChatModalOpen(true)} />
              <ChatModal 
                isOpen={isChatModalOpen} 
                onClose={() => setIsChatModalOpen(false)} 
              />
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;

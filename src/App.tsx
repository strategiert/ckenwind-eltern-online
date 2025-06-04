
import { useState, Suspense } from "react";
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

// Import critical pages directly (no lazy loading for homepage)
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import BlogAdmin from "@/pages/BlogAdmin";
import GlossaryAdmin from "@/pages/GlossaryAdmin";
import NotFound from "@/pages/NotFound";

// Import lazy components
import LazyElternCloud from "@/components/lazy/LazyElternCloud";
import LazyUeberMich from "@/components/lazy/LazyUeberMich";
import LazyBlog from "@/components/lazy/LazyBlog";
import LazyGlossar from "@/components/lazy/LazyGlossary";
import LazyKontakt from "@/components/lazy/LazyKontakt";
import LazyGratisBuch from "@/components/lazy/LazyGratisBuch";

// Lazy load other components
import { lazy } from "react";
const LazyBlogPost = lazy(() => import("@/pages/BlogPost"));
const LazyBlogCategory = lazy(() => import("@/pages/BlogCategory"));
const LazyBlogArchive = lazy(() => import("@/pages/BlogArchive"));
const LazyGlossaryDetail = lazy(() => import("@/pages/GlossaryDetail"));
const LazyMentalHealthChat = lazy(() => import("@/pages/MentalHealthChat"));
const LazyImpressum = lazy(() => import("@/pages/Impressum"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rueckenwind-purple"></div>
  </div>
);

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
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/ueber-mich" element={<LazyUeberMich />} />
                  <Route path="/blog" element={<LazyBlog />} />
                  <Route path="/blog/:slug" element={<LazyBlogPost />} />
                  <Route path="/blog/category/:category" element={<LazyBlogCategory />} />
                  <Route path="/blog/archive" element={<LazyBlogArchive />} />
                  <Route path="/auth/login" element={<Auth />} />
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
                  <Route path="/gratis-buch" element={<LazyGratisBuch />} />
                  <Route path="/glossar" element={<LazyGlossar />} />
                  <Route path="/glossar/:slug" element={<LazyGlossaryDetail />} />
                  <Route path="/kontakt" element={<LazyKontakt />} />
                  <Route path="/mental-health-chat" element={<LazyMentalHealthChat />} />
                  <Route path="/eltern-cloud" element={<LazyElternCloud />} />
                  <Route path="/impressum" element={<LazyImpressum />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              
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

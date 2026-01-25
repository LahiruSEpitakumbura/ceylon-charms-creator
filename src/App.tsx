import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import About from "./pages/About";
import Destinations from "./pages/Destinations";
import Tours from "./pages/Tours";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import RegisterCustomer from "./pages/RegisterCustomer";
import RegisterGuide from "./pages/RegisterGuide";
import RegisterHotel from "./pages/RegisterHotel";
import RegisterDriver from "./pages/RegisterDriver";
import ProviderAuth from "./pages/ProviderAuth";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminDrivers from "./pages/admin/Drivers";
import AdminGuides from "./pages/admin/Guides";
import AdminHotels from "./pages/admin/Hotels";
import AdminDestinations from "./pages/admin/Destinations";
import AdminVehicles from "./pages/admin/Vehicles";
import AdminBookings from "./pages/admin/Bookings";
import AdminSettings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/customer" element={<RegisterCustomer />} />
            <Route path="/auth/provider" element={<ProviderAuth />} />
            <Route path="/register/guide" element={<RegisterGuide />} />
            <Route path="/register/hotel" element={<RegisterHotel />} />
            <Route path="/register/driver" element={<RegisterDriver />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="drivers" element={<AdminDrivers />} />
              <Route path="guides" element={<AdminGuides />} />
              <Route path="hotels" element={<AdminHotels />} />
              <Route path="destinations" element={<AdminDestinations />} />
              <Route path="vehicles" element={<AdminVehicles />} />
              <Route path="bookings" element={<AdminBookings />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

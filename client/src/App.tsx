import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Etkinlikler from "@/pages/etkinlikler";
import Restoranlar from "@/pages/restoranlar";
import BiletAl from "@/pages/bilet-al";
import BiletDetay from "@/pages/bilet-detay";
import BiletSecenekleri from "@/pages/bilet-secenekleri";
import RestoranDetay from "@/pages/restoran-detay";
import Odeme from "@/pages/odeme";
import RezervasyonOdeme from "@/pages/rezervasyon-odeme";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import Profile from "@/pages/profile";
import Settings from "@/pages/settings";
import BusinessDashboard from "@/pages/business-dashboard";
import KVKK from "@/pages/kvkk";
import KullanimSartlari from "@/pages/kullanim-sartlari";
import GizlilikPolitikasi from "@/pages/gizlilik-politikasi";
import CerezPolitikasi from "@/pages/cerez-politikasi";
import SSS from "@/pages/sss";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/etkinlikler" component={Etkinlikler} />
      <Route path="/restoranlar" component={Restoranlar} />
      <Route path="/bilet-al" component={BiletAl} />
      <Route path="/bilet-detay" component={BiletDetay} />
      <Route path="/bilet-secenekleri" component={BiletSecenekleri} />
      <Route path="/restoran-detay" component={RestoranDetay} />
      <Route path="/odeme" component={Odeme} />
      <Route path="/rezervasyon-odeme" component={RezervasyonOdeme} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/profile" component={Profile} />
      <Route path="/settings" component={Settings} />
      <Route path="/business-dashboard" component={BusinessDashboard} />
      <Route path="/kvkk" component={KVKK} />
      <Route path="/kullanim-sartlari" component={KullanimSartlari} />
      <Route path="/gizlilik-politikasi" component={GizlilikPolitikasi} />
      <Route path="/cerez-politikasi" component={CerezPolitikasi} />
      <Route path="/sss" component={SSS} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

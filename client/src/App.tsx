import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import DropDock from "./pages/DropDock";
import CleanSlate from "./pages/CleanSlate";
import DevSnips from "./pages/DevSnips";
import PCompressPro from "./pages/PCompressPro";
import QuickRes from "./pages/QuickRes";
import UnzipperPro from "./pages/UnzipperPro";
import TeleTurbo from "./pages/TeleTurbo";
import StreamFlix from "./pages/StreamFlix";
import SonicAtlas from "./pages/SonicAtlas";
import NotchBin from "./pages/NotchBin";
import NetShield from "./pages/NetShield";
import Legal from "./pages/Legal";
import Terms from "./pages/Terms";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/dropdock"} component={DropDock} />
      <Route path={"/cleanslate"} component={CleanSlate} />
      <Route path={"/devsnips"} component={DevSnips} />
      <Route path={"/pcompresspro"} component={PCompressPro} />
      <Route path={"/quickres"} component={QuickRes} />
      <Route path={"/unzipperpro"} component={UnzipperPro} />
      <Route path={"/teleturbo"} component={TeleTurbo} />
      <Route path={"/streamflix"} component={StreamFlix} />
      <Route path={"/sonicatlas"} component={SonicAtlas} />
      <Route path={"/notchbin"} component={NotchBin} />
      <Route path={"/netshield"} component={NetShield} />
      <Route path={"/legal"} component={Legal} />
      <Route path={"/terms"} component={Terms} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

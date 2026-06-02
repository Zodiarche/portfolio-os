import Desktop from "./components/Desktop";
import MobileShell from "./components/mobile/MobileShell";
import { useIsMobile } from "./hooks/useIsMobile";

function App() {
  const isMobile = useIsMobile();

  return isMobile ? <MobileShell /> : <Desktop />;
}

export default App;

import { useState, useEffect } from "react";
import "./App.css";
import "./components/components.css";

import AppPage from "./pages/AppPage";
import DesignSystemPage from "./pages/DesignSystemPage";
import ComponentsPage from "./pages/ComponentsPage";
import FxProvider from "./state/FxProvider";

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return hash;
}

export default function App() {
  const hash = useHashRoute();
  return hash === "#/components" ? <ComponentsPage />
       : hash === "#/design"     ? <DesignSystemPage />
       : <FxProvider><AppPage /></FxProvider>;
}

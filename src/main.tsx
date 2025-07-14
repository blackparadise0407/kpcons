import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import App from "./App.tsx";
import { LanguageProvider, TranslationsProvider } from "./providers";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <TranslationsProvider>
        <App />
      </TranslationsProvider>
    </LanguageProvider>
  </StrictMode>
);

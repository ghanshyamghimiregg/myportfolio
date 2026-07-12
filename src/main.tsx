import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";
import App from "./app/App.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider attribute="class" defaultTheme="light">
    <App />
    <Analytics />
  </ThemeProvider>
);
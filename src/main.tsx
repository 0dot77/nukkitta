import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import App from "./App";
import "./index.css";

const AboutPage = lazy(() => import("./pages/AboutPage"));
const GuidePage = lazy(() => import("./pages/GuidePage"));
const FaqPage = lazy(() => import("./pages/FaqPage"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route
            path="/about"
            element={
              <Suspense>
                <AboutPage />
              </Suspense>
            }
          />
          <Route
            path="/guide"
            element={
              <Suspense>
                <GuidePage />
              </Suspense>
            }
          />
          <Route
            path="/faq"
            element={
              <Suspense>
                <FaqPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);

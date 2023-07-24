import { AnimatePresence } from "framer-motion";
import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { Notif } from "./components/notif";
import { Spinner } from "./components/spinner";
import { isAllowed } from "./services/auth";

const SignUp = lazy(() => import("./pages/sign-up/sign-up"));
const SignIn = lazy(() => import("./pages/sign-in/sign-in"));
const Home = lazy(() => import("./pages/home/home"));

function App() {
  const location = useLocation();

  return (
    <>
      <Suspense fallback={<Spinner text={"Hold on a sec"} width={40} />}>
        <AnimatePresence initial={false} mode="wait" onExitComplete={() => {}}>
          <Routes location={location} key={location}>
            <Route
              path="/sign-up"
              element={isAllowed() ? <Navigate to="/" replace /> : <SignUp />}
            />
            <Route
              path="/sign-in"
              element={isAllowed() ? <Navigate to="/" replace /> : <SignIn />}
            />
            <Route
              path="/"
              element={
                isAllowed() ? <Home /> : <Navigate to="/sign-in" replace />
              }
            />
          </Routes>
        </AnimatePresence>
      </Suspense>
      <Notif />
    </>
  );
}

export default App;

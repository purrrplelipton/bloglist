import React, { StrictMode, Suspense, lazy } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Loader from "./components/loader"
import Notif from "./components/notif"
import "./index.css"
import reportWebVitals from "./reportWebVitals"
import { authorized } from "./services/auth"
import store from "./store/store"

const SignUp = lazy(() => import("./pages/auth/sign-up"))
const SignIn = lazy(() => import("./pages/auth/sign-in"))
const Home = lazy(() => import("./pages/home/home"))

const root = createRoot(document.getElementById("root"))
root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              path="/sign-up"
              element={authorized() ? <Navigate to="/" replace /> : <SignUp />}
            />
            <Route
              path="/sign-in"
              element={authorized() ? <Navigate to="/" replace /> : <SignIn />}
            />
            <Route
              path="/"
              element={
                authorized() ? <Home /> : <Navigate to="/sign-in" replace />
              }
            />
          </Routes>
        </Suspense>
        <Notif />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

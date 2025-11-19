

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Register";
import Dashboard from "./components/Dashboard";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ErrorBoundary from "./components/Shared/ErrorBoundary";
import NotFound from "./components/Shared/NotFound";
import { ToastProvider } from "./components/Shared/ToastProvider";

function App() {
  return (
    <ToastProvider>
      <ErrorBoundary>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </ToastProvider>
  );
}

export default App;

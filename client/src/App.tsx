import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing-page";
import TodoDashboard from "./pages/todo-dashboard";
import AuthPage from "./pages/auth-page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/signin" element={<AuthPage />} />
        <Route path="/dashboard" element={<TodoDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

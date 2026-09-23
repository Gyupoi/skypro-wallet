import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ExpensesPage from "./pages/ExpensesPage/ExpensesPage";
import AnalyticsPage from "./pages/AnalyticsPage/AnalyticsPage";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/expenses" element={<ExpensesPage />} />

        <Route path="/analytics" element={<AnalyticsPage />} />

        <Route path="/new-expense" element={<div>Новый расход</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import UsersPage from './components/UsersPage';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import Logout from "./pages/Logout";
import ForgotPassword from "./components/ForgotPassword";
import ResetPasswordForm from './components/ResetPasswordForm';
import AdminRoutes from './Routes/AdminRoutes';
import AccountPage from './user/AccountPage';

function App() {
  
  return (
    <>
      <AdminRoutes />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/sign-up" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPasswordForm />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import Logout from "./pages/Logout";
import ForgotPassword from "./components/ForgotPassword";
import ResetPasswordForm from './components/ResetPasswordForm';
import AccountPage from './user/AccountPage';
import AdminPage from "./admin/AdminPage";
import ManageUsers from "./admin/ManageUsers";
import SiteSettings from "./admin/SiteSettings";
import Reports from "./admin/Reports";
import ContactsPage from "./admin/ContactsPage";
import EditUser from './admin/EditUser';
import NotificationsPage from './admin/NotificationsPage';
import ProfilePage from './user/ProfilePage';
import EditProfilePage from './user/EditProfilePage';

function App() {
  
  return (
    <>
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

          { /* Admin routes are handled in AdminRoutes.jsx, so no need to define them here */}
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/manage-users" element={<ManageUsers />} />
          <Route path="/admin/site-settings" element={<SiteSettings />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/contacts" element={<ContactsPage />} />
          <Route path="/admin/edit-user/:id" element={<EditUser />} />
          <Route path="/admin/profile" element={<ProfilePage />} />
          <Route path="/admin/edit-profile/:id" element={<EditProfilePage />} />
          <Route path="/admin/notifications" element={<NotificationsPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

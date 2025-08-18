import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPage from "../admin/AdminPage";
import ManageUsers from "../admin/ManageUsers";
import SiteSettings from "../admin/SiteSettings";
import Reports from "../admin/Reports";
import ContactsPage from "../admin/ContactsPage";
import EditUser from '../admin/EditUser';

const AdminRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/manage-users" element={<ManageUsers />} />
                <Route path="/admin/site-settings" element={<SiteSettings />} />
                <Route path="/admin/reports" element={<Reports />} />
                <Route path="/admin/contacts" element={<ContactsPage />} />
                <Route path="/admin/edit-user/:id" element={<EditUser />} />
                <Route path="/admin/profile" element={<ProfilePage />} />
                <Route path="/admin/notifications" element={<NotificationsPage />} />
            </Routes>
        </Router>
    );
};

export default AdminRoutes;
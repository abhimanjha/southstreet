import { Navigate, Outlet } from 'react-router-dom';
import { isAdmin } from '../../utils/auth';

const AdminProtectedRoute = () => {
    // Check if user is authenticated AND is an admin
    if (!isAdmin()) {
        return <Navigate to="/admin/login" replace />;
    }
    return <Outlet />;
};

export default AdminProtectedRoute;

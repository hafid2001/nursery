import { Navigate, useLocation } from 'react-router-dom'; 
import { useAuth } from '@/context/auth.context';

const RoleBasedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  const location = useLocation(); 

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  if (
    user.role === 'parent' &&
    user.status === 'APPROVED_AWAITING_PAYMENT' &&
    location.pathname !== '/complete-payment'
  ) {
    return <Navigate to="/complete-payment" replace />;
  }

  if (!allowedRoles.includes(user.role)) return <Navigate to="/" replace />;

  return children;
};

export default RoleBasedRoute;

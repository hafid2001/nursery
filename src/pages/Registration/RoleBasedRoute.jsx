import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/auth.context';

const RoleBasedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  // Show loader while auth is loading
  if (loading) return <div>Loading...</div>;

  // If not logged in, redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // If user role is not allowed, redirect to home or unauthorized page
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" replace />;

  // Otherwise, render the protected page
  return children;
};

export default RoleBasedRoute;

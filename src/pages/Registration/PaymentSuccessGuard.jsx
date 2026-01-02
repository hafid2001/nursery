import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/auth.context';

const PaymentSuccessGuard = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  if (user.role !== 'parent') return <Navigate to="/" replace />;

  return children;
};

export default PaymentSuccessGuard;

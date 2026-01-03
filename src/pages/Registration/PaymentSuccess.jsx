import { useEffect } from 'react';
import { useAuth } from '@/context/auth.context';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const { refreshUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const syncAuth = async () => {
      await refreshUser(); 
      navigate('/parent');
    };

    syncAuth();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>جاري تفعيل حسابك...</p>
    </div>
  );
};

export default PaymentSuccess;

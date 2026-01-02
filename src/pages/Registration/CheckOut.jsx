import { useState } from 'react';

import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import api from '@/lib/QueryHandler';
import { useAuth } from '@/context/auth.context';


const CompletePayment = () => {
  const [processing, setProcessing] = useState(false);

  const {user , loading} = useAuth()

  const handlePayment = () => {
    setProcessing(true);

    api.request(
      '/parent/checkout-session',
      {
        onStart: (isStarting) => {
          setProcessing(isStarting);
        },
        onSuccess: (data) => {
          if (data.url) {
            window.location.href = data.url;
          } else {
            toast.error('فشل إنشاء جلسة الدفع');
            setProcessing(false);
          }
        },
        onError: (error) => {
          console.error(error);
          toast.error('حدث خطأ ما أثناء إنشاء الدفع');
          setProcessing(false);
        },
      },
      { method: 'GET' }
    );
  };

  if (loading || !user) return <div>جاري التحميل...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        إكمال الدفع
      </h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6 text-center max-w-md">
        تم اعتماد تسجيلك من قبل الإدارة. يرجى إكمال الدفع لتفعيل حسابك والوصول
        إلى جميع الميزات.
      </p>
      <Button
        onClick={handlePayment}
        disabled={processing}
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg"
      >
        {processing ? 'جارٍ المعالجة...' : 'ادفع الآن'}
      </Button>
    </div>
  );
};

export default CompletePayment;

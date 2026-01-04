import { useState, useEffect } from 'react';
import { gsap } from "gsap";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth.context.jsx';
import { LoginSchema } from '@/schemas/auth.schema';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    gsap.from(".login-sidebar", { opacity: 0, x: -50, duration: 1, ease: "power3.out" });
    gsap.from(".login-form-card", { opacity: 0, x: 50, duration: 1, ease: "power3.out", delay: 0.2 });
  }, []);

  const { login } = useAuth();
  const navigate = useNavigate();

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    // Validate form with Zod
    const result = LoginSchema.safeParse(formData);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      toast.error('يرجى تصحيح الحقول المشار إليها');
      return;
    }

    setErrors({}); // clear previous errors

    await login(formData, {
      onStart: setLoading,
      onSuccess: (data) => {
        const user = data.user;
        const role = user.role;
        toast.success('تم تسجيل الدخول بنجاح!');
        navigate(`/${role}`);
      },
      onError: (error) => {
        if (error.errors) {
          setErrors(error.errors);
          toast.error('يرجى تصحيح الحقول المشار إليها');
          return;
        }
        toast.error(error.message || 'حدث خطأ أثناء تسجيل الدخول');
      },
      onFinal: () => setLoading(false),
    });
  };

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2 bg-white">
      {/* Left sidebar with a gradient background */}
      <div className="hidden lg:flex items-center justify-center p-6 bg-gradient-to-br from-purple-600 to-indigo-700 login-sidebar">
        <div className="text-center text-white space-y-4">
          <h1 className="text-4xl font-bold">أهلاً بك في حضانة نجوم المستقبل</h1>
          <p className="text-lg">سجل الدخول للوصول إلى حسابك</p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md login-form-card">
        <h2 className="text-2xl font-light text-center text-gray-800 mb-6">
          تسجيل الدخول
        </h2>

        {/* Email */}
        <div className="mb-4">
          <Label className="text-sm text-gray-600 font-normal">
            البريد الإلكتروني
          </Label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            placeholder="example@test.com"
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <Label className="text-sm text-gray-600 font-normal">
            كلمة المرور
          </Label>
          <Input
            type="password"
            value={formData.password}
            onChange={(e) => updateFormData('password', e.target.value)}
          />
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">{errors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          className="w-full flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          )}
          تسجيل الدخول
        </Button>
      </div>
    </div>
  </div>
  );
};

export default LoginPage;

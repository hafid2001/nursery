import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
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
    gsap.from('.login-sidebar', {
      opacity: 0,
      x: -50,
      duration: 1,
      ease: 'power3.out',
    });
    gsap.from('.login-form-card', {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power3.out',
      delay: 0.3,
    });
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
    const result = LoginSchema.safeParse(formData);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      toast.error('يرجى تصحيح الحقول المشار إليها');
      return;
    }

    setErrors({});

    await login(formData, {
      onStart: setLoading,
      onSuccess: (data) => {
        const user = data.user;
        const role = user.role;
        toast.success('تم تسجيل الدخول بنجاح!');
        navigate(`/${role}`);
      },
      onError: (error) => {
        if(error.status == 401){
          return toast.error("كلمة المرور او الحساب غير صحيح")
        }
        toast.error("حدث خطا في تسجيل")
      },
      onFinal: () => setLoading(false),
    });
  };

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2">
      {/* Left sidebar */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 login-sidebar relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative text-center text-white space-y-6 px-12">
          <div className="w-16 h-16 mx-auto bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-light tracking-tight">
            أهلاً بك في حضانة
            <br />
            نجوم المستقبل
          </h1>
          <p className="text-purple-100 text-base font-light">
            سجل الدخول للوصول إلى حسابك
          </p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-sm login-form-card">
          <div className="mb-12">
            <h2 className="text-3xl font-light text-gray-900 mb-2">
              تسجيل الدخول
            </h2>
            <div className="w-12 h-0.5 bg-gradient-to-r from-purple-600 to-indigo-700"></div>
          </div>

          <div className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label className="text-sm font-normal text-gray-600">
                البريد الإلكتروني
              </Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                placeholder="example@test.com"
                className="h-11 border-gray-200 focus:border-purple-600 focus:ring-purple-600/20"
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label className="text-sm font-normal text-gray-600">
                كلمة المرور
              </Label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => updateFormData('password', e.target.value)}
                className="h-11 border-gray-200 focus:border-purple-600 focus:ring-purple-600/20"
              />
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              className="w-full h-11 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white font-normal mt-8 transition-all duration-300"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  جاري التحميل...
                </span>
              ) : (
                'تسجيل الدخول'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

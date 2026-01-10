import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import {
  ChildInfoSchema,
  DocumentsSchema,
  ParentInfoSchema,
} from '../../schemas/auth.schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { registerParent } from '@/services/auth';
import { uploadToCloudinary } from '@/lib/cloudinary.js';
import toast from 'react-hot-toast';

const ParentRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    phone: '',
    child: {
      full_name: '',
      age: '',
      gender: '',
      date_of_birth: '',
    },
    documents: [],
  });
  const [uploadedFiles, setUploadedFiles] = useState({
    birth_certificate: null,
    medical_form: null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    gsap.from('.registration-sidebar', {
      opacity: 0,
      x: -50,
      duration: 1,
      ease: 'power3.out',
    });
    gsap.from('.registration-form-card', {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power3.out',
      delay: 0.3,
    });
  }, []);

  function validateStep1() {
    const result = ParentInfoSchema.safeParse({
      full_name: formData.full_name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
    });

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return 0;
    }
    return 1;
  }

  function validateStep2() {
    const result = ChildInfoSchema.safeParse({
      full_name: formData.child.full_name,
      age: formData.child.age,
      date_of_birth: formData.child.date_of_birth,
      gender: formData.child.gender,
    });

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return 0;
    }
    return 1;
  }

  function validateStep3() {
    const result = DocumentsSchema.safeParse(formData.documents);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return 0;
    }
    return 1;
  }

  const handleNext = () => {
    let isValid = false;
    if (currentStep === 1) isValid = validateStep1();
    else if (currentStep === 2) isValid = validateStep2();

    if (isValid) {
      setCurrentStep(currentStep + 1);
      setErrors({});
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    setErrors({});
  };

  const handleFileUpload = async (type, event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      toast.loading(`جار رفع ${type}...`, { id: type });

      const result = await uploadToCloudinary(file);

      const newDoc = {
        document_type: type,
        file_url: result.secure_url,
        public_id: result.public_id,
      };

      setUploadedFiles((prev) => ({ ...prev, [type]: file }));

      setFormData((prev) => ({
        ...prev,
        documents: [
          ...prev.documents.filter((d) => d.document_type !== type),
          newDoc,
        ],
      }));

      toast.success(`${type} تم رفعه بنجاح ✅`, { id: type });
    } catch {
      toast.error(`فشل رفع ${type} ❌`, { id: type });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFile = (type) => {
    setUploadedFiles((prev) => ({ ...prev, [type]: null }));
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents.filter((d) => d.document_type !== type),
    }));
  };

  const handleSubmit = () => {
    if (!validateStep3()) {
      toast.error('يرجى إكمال جميع الحقول المطلوبة قبل الإرسال');
      return;
    }

    registerParent(formData, {
      onStart: setLoading,
      onSuccess: () => {
        toast.success('تم التسجيل بنجاح ✅');
      },
      onError: (error) => {
        if (error.errors) {
          setErrors(error.errors);
          toast.error('يرجى تصحيح الحقول المشار إليها');
          return;
        }
        toast.error(error.message);
      },
      onFinal: () => {},
    });
  };

  const updateFormData = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const stepTitles = {
    1: 'بيانات ولي الأمر',
    2: 'بيانات الطفل',
    3: 'الوثائق المطلوبة',
  };

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2">
      {/* Left sidebar */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 registration-sidebar relative overflow-hidden">
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
            سجل الآن لتمنح طفلك أفضل بداية تعليمية
          </p>
        </div>
      </div>

      {/* Right side - Registration Form */}
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-lg registration-form-card">
          <div className="mb-12">
            <h2 className="text-3xl font-light text-gray-900 mb-2">
              تسجيل ولي الأمر
            </h2>
            <div className="w-12 h-0.5 bg-gradient-to-r from-purple-600 to-indigo-700"></div>
          </div>

          {/* Progress Steps */}
          <div className="mb-10">
            <div className="flex gap-2 mb-4">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                    step <= currentStep
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-700'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-500 font-light">
              الخطوة {currentStep} من 3 - {stepTitles[currentStep]}
            </p>
          </div>

          <div className="space-y-6">
            {/* Step 1: Parent Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm font-normal text-gray-600">
                    الاسم الكامل
                  </Label>
                  <Input
                    value={formData.full_name}
                    onChange={(e) =>
                      updateFormData('full_name', e.target.value)
                    }
                    className="h-11 border-gray-200 focus:border-purple-600 focus:ring-purple-600/20"
                  />
                  {errors.full_name && (
                    <p className="text-xs text-red-500">{errors.full_name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-normal text-gray-600">
                    البريد الإلكتروني
                  </Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    className="h-11 border-gray-200 focus:border-purple-600 focus:ring-purple-600/20"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

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

                <div className="space-y-2">
                  <Label className="text-sm font-normal text-gray-600">
                    رقم الهاتف
                  </Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    className="h-11 border-gray-200 focus:border-purple-600 focus:ring-purple-600/20"
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500">{errors.phone}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Child Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm font-normal text-gray-600">
                    اسم الطفل الكامل
                  </Label>
                  <Input
                    value={formData.child.full_name}
                    onChange={(e) =>
                      updateFormData('child.full_name', e.target.value)
                    }
                    className="h-11 border-gray-200 focus:border-purple-600 focus:ring-purple-600/20"
                  />
                  {errors.full_name && (
                    <p className="text-xs text-red-500">{errors.full_name}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-normal text-gray-600">
                      العمر
                    </Label>
                    <Input
                      type="number"
                      value={formData.child.age}
                      onChange={(e) =>
                        updateFormData(
                          'child.age',
                          parseInt(e.target.value) || ''
                        )
                      }
                      className="h-11 border-gray-200 focus:border-purple-600 focus:ring-purple-600/20"
                    />
                    {errors.age && (
                      <p className="text-xs text-red-500">{errors.age}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-normal text-gray-600">
                      الجنس
                    </Label>
                    <select
                      value={formData.child.gender}
                      onChange={(e) =>
                        updateFormData('child.gender', e.target.value)
                      }
                      className="w-full h-11 px-3 rounded-md border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 outline-none transition-all"
                    >
                      <option value="">اختر</option>
                      <option value="male">ذكر</option>
                      <option value="female">أنثى</option>
                    </select>
                    {errors.gender && (
                      <p className="text-xs text-red-500">{errors.gender}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-normal text-gray-600">
                    تاريخ الميلاد
                  </Label>
                  <Input
                    type="date"
                    value={formData.child.date_of_birth}
                    onChange={(e) =>
                      updateFormData('child.date_of_birth', e.target.value)
                    }
                    className="h-11 border-gray-200 focus:border-purple-600 focus:ring-purple-600/20"
                  />
                  {errors.date_of_birth && (
                    <p className="text-xs text-red-500">
                      {errors.date_of_birth}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Documents */}
            {currentStep === 3 && (
              <div className="space-y-6">
                {/* Birth Certificate */}
                <div className="space-y-3">
                  <Label className="text-sm font-normal text-gray-600">
                    شهادة الميلاد
                  </Label>

                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.png"
                      onChange={(e) => handleFileUpload('birth_certificate', e)}
                      className="hidden"
                      id="birth_certificate"
                    />
                    <label
                      htmlFor="birth_certificate"
                      className="flex items-center justify-center w-full h-11 px-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-600 transition-colors"
                    >
                      <span className="text-sm text-gray-500">
                        اضغط لرفع الملف
                      </span>
                    </label>
                  </div>

                  {uploadedFiles.birth_certificate && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-700">
                        {uploadedFiles.birth_certificate.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile('birth_certificate')}
                        className="text-sm text-red-500 hover:text-red-700 transition-colors"
                      >
                        إزالة
                      </button>
                    </div>
                  )}

                  {errors.birth_certificate && (
                    <p className="text-xs text-red-500">
                      {errors.birth_certificate}
                    </p>
                  )}
                </div>

                {/* Medical Form */}
                <div className="space-y-3">
                  <Label className="text-sm font-normal text-gray-600">
                    الاستمارة الطبية
                  </Label>

                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.png"
                      onChange={(e) => handleFileUpload('medical_form', e)}
                      className="hidden"
                      id="medical_form"
                    />
                    <label
                      htmlFor="medical_form"
                      className="flex items-center justify-center w-full h-11 px-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-600 transition-colors"
                    >
                      <span className="text-sm text-gray-500">
                        اضغط لرفع الملف
                      </span>
                    </label>
                  </div>

                  {uploadedFiles.medical_form && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-700">
                        {uploadedFiles.medical_form.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile('medical_form')}
                        className="text-sm text-red-500 hover:text-red-700 transition-colors"
                      >
                        إزالة
                      </button>
                    </div>
                  )}

                  {errors.medical_form && (
                    <p className="text-xs text-red-500">
                      {errors.medical_form}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 pt-6">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="h-11 px-6 border-gray-300 hover:border-purple-600 hover:text-purple-600 transition-colors"
                >
                  رجوع
                </Button>
              )}
              {currentStep < 3 ? (
                <Button
                  onClick={handleNext}
                  className="flex-1 h-11 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white font-normal transition-all duration-300"
                >
                  التالي
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 h-11 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white font-normal transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      جاري الإرسال
                    </span>
                  ) : (
                    'إرسال'
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentRegistration;

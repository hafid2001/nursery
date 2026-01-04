import { useState, useEffect } from 'react';
import { gsap } from "gsap";
import { ChildInfoSchema, DocumentsSchema, ParentInfoSchema } from '../../schemas/auth.schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { registerParent } from '@/services/auth';
import { uploadToCloudinary } from '@/lib/cloudinary.js';
import toast from 'react-hot-toast';



const ParentRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading , setLoading] = useState(false)
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
    gsap.from(".registration-sidebar", { opacity: 0, x: -50, duration: 1, ease: "power3.out" });
    gsap.from(".registration-form-card", { opacity: 0, x: 50, duration: 1, ease: "power3.out", delay: 0.2 });
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


    console.log(result.error)
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
      console.log(result.error);
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
    console.log("hihih")
    if (!validateStep3()) {
      toast.error('يرجى إكمال جميع الحقول المطلوبة قبل الإرسال');
      return;
    }

    registerParent(formData, {
      onStart: setLoading,
      onSuccess: () => {
        toast.success('تم التسجيل بنجاح ✅');
        console.log('Registration success');
      },
      onError: (error) => {
        if (error.errors) {
          setErrors(error.errors);
          toast.error('يرجى تصحيح الحقول المشار إليها');
          return;
        }
        toast.error(error.message);
      },
      onFinal: () => {
        console.log('Request finished');
      },
    });
  };



  const updateFormData = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2 bg-white">
      {/* Left sidebar with a gradient background */}
      <div className="hidden lg:flex items-center justify-center p-6 bg-gradient-to-br from-purple-600 to-indigo-700 registration-sidebar">
        <div className="text-center text-white space-y-4">
          <h1 className="text-4xl font-bold">أهلاً بك في حضانة نجوم المستقبل</h1>
          <p className="text-lg">سجل الآن لتمنح طفلك أفضل بداية تعليمية</p>
        </div>
      </div>

      {/* Right side - Registration Form */}
      <div className="flex items-center justify-center p-4">
        <Card className="w-full max-w-lg border-0 shadow-none registration-form-card">
        <CardHeader className="space-y-4 pb-8">
          <CardTitle className="text-3xl font-light text-center text-gray-900">
            تسجيل ولي الأمر
          </CardTitle>

          <div className="flex gap-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`h-1 flex-1 ${
                  step <= currentStep ? 'bg-purple-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Step 1: Parent Information */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <h2 className="text-lg font-medium text-gray-800">
                بيانات ولي الأمر
              </h2>

              <div>
                <Label className="text-sm text-gray-600 font-normal">
                  الاسم الكامل
                </Label>
                <Input
                  value={formData.full_name}
                  onChange={(e) => updateFormData('full_name', e.target.value)}
                />
                {errors.full_name && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.full_name}
                  </p>
                )}
              </div>

              <div>
                <Label className="text-sm text-gray-600 font-normal">
                  البريد الإلكتروني
                </Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              <div>
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

              <div>
                <Label className="text-sm text-gray-600 font-normal">
                  رقم الهاتف
                </Label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                />
                {errors.phone && (
                  <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Child Information */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <h2 className="text-lg font-medium text-gray-800">
                بيانات الطفل
              </h2>

              <div>
                <Label className="text-sm text-gray-600 font-normal">
                  اسم الطفل الكامل
                </Label>
                <Input
                  value={formData.child.full_name}
                  onChange={(e) =>
                    updateFormData('child.full_name', e.target.value)
                  }
                />
                {errors.full_name && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.full_name}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-600 font-normal">
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
                  />
                  {errors.age && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.age}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="text-sm text-gray-600 font-normal">
                    الجنس
                  </Label>
                  <select
                    value={formData.child.gender}
                    onChange={(e) => {
                      updateFormData('child.gender', e.target.value);
                    }}
                    className="w-full h-10 px-3 mt-1 rounded-md border border-gray-300"
                  >
                    <option value="">اختر</option>
                    <option value="male">ذكر</option>
                    <option value="female">أنثى</option>
                  </select>
                  {errors.gender && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.gender}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label className="text-sm text-gray-600 font-normal">
                  تاريخ الميلاد
                </Label>
                <Input
                  type="date"
                  value={formData.child.date_of_birth}
                  onChange={(e) => {
                    updateFormData('child.date_of_birth', e.target.value);
                  }}
                />
                {errors.date_of_birth && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.date_of_birth}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Documents */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <h2 className="text-lg font-medium text-gray-800">
                الوثائق المطلوبة
              </h2>

              {/* Birth Certificate */}
              <div className="space-y-2">
                <Label className="text-sm text-gray-600 font-normal">
                  شهادة الميلاد
                </Label>

                <input
                  type="file"
                  accept=".pdf,.jpg,.png"
                  onChange={(e) => handleFileUpload('birth_certificate', e)}
                  className="mt-1"
                />

                {uploadedFiles.birth_certificate && (
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-gray-700">
                      {uploadedFiles.birth_certificate.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile('birth_certificate')}
                      className="text-red-500 text-sm"
                    >
                      إزالة
                    </button>
                  </div>
                )}

                {errors.birth_certificate && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.birth_certificate}
                  </p>
                )}
              </div>

              {/* Medical Form */}
              <div className="space-y-2">
                <Label className="text-sm text-gray-600 font-normal">
                  الاستمارة الطبية
                </Label>

                <input
                  type="file"
                  accept=".pdf,.jpg,.png"
                  onChange={(e) => handleFileUpload('medical_form', e)}
                  className="mt-1"
                />

                {uploadedFiles.medical_form && (
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-gray-700">
                      {uploadedFiles.medical_form.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile('medical_form')}
                      className="text-red-500 text-sm"
                    >
                      إزالة
                    </button>
                  </div>
                )}

                {errors.medical_form && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.medical_form}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 pt-4">
            {currentStep > 1 && (
              <Button variant="outline" onClick={handleBack}>
                رجوع
              </Button>
            )}
            {currentStep < 3 ? (
              <Button onClick={handleNext}>التالي</Button>
            ) : (
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    جاري الإرسال
                  </span>
                ) : (
                  'إرسال'
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
  );
};


export default ParentRegistration
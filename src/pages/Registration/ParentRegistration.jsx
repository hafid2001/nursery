import { useState } from 'react';
import { ChildInfoSchema, DocumentsSchema, ParentInfoSchema } from '../../schemas/parent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';



const ParentRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
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
    const result = DocumentsSchema.safeParse(uploadedFiles);
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

  const handleFileUpload = (type, event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFiles((prev) => ({ ...prev, [type]: file }));
      const fakeUrl = `https://example.com/uploads/${file.name}`;
      const newDoc = { document_type: type, file_url: fakeUrl };
      setFormData((prev) => ({
        ...prev,
        documents: [
          ...prev.documents.filter((d) => d.document_type !== type),
          newDoc,
        ],
      }));
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
    if (validateStep3()) {
      console.log('Form submitted:', formData);
      alert('Registration successful! Check console for data.');
    }
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
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="w-full max-w-lg border-0 shadow-none">
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
                {errors.child?.full_name && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.child.full_name}
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
                  {errors.child?.age && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.child.age}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="text-sm text-gray-600 font-normal">
                    الجنس
                  </Label>
                  <select
                    value={formData.child.gender}
                    onChange={(e) =>
                      updateFormData('child.gender', e.target.value)
                    }
                    className="w-full h-10 px-3 mt-1 rounded-md border border-gray-300"
                  >
                    <option value="">اختر</option>
                    <option value="male">ذكر</option>
                    <option value="female">أنثى</option>
                  </select>
                  {errors.child?.gender && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.child.gender}
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
                  onChange={(e) =>
                    updateFormData('child.date_of_birth', e.target.value)
                  }
                />
                {errors.child?.date_of_birth && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.child.date_of_birth}
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

              <div>
                <Label className="text-sm text-gray-600 font-normal">
                  شهادة الميلاد
                </Label>
                {errors.birth_certificate && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.birth_certificate}
                  </p>
                )}
              </div>

              <div>
                <Label className="text-sm text-gray-600 font-normal">
                  الاستمارة الطبية
                </Label>
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
              <Button onClick={handleSubmit}>إرسال</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};


export default ParentRegistration
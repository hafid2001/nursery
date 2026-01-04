import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { useToast } from '@/hooks/use-toast';
import { Loading } from '@/components/ui/loading';

import { addParent } from '@/services/admin'; // Update path as needed
import { ParentSignUpSchema } from '@/schemas/auth.schema'; // Update path as needed
import toast from 'react-hot-toast';

const INITIAL_STATE = {
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
};

const AddParentDialog = ({ open, onOpenChange, refreshData }) => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    try {
      ParentSignUpSchema.parse(formData);
      setErrors({});
      return true;
    } catch (err) {
      const formattedErrors = {};
      err.errors.forEach((e) => {
        const path = e.path.join('.');
        formattedErrors[path] = e.message;
      });
      setErrors(formattedErrors);
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validate()) {
      toast.error('يرجى التأكد من ملء جميع الحقول ورفع الوثائق المطلوبة');
      return;
    }

    await addParent(formData, {
      onStart: () => setIsSubmitting(true),
      onSuccess: () => {
        toast.success('تم تسجيل ولي الأمر والطفل بنجاح');
        setFormData(INITIAL_STATE);
        onOpenChange(false);
        if (refreshData) refreshData();
      },
      onError: (err) => {
        toast.error('فشل الإجراء');
      },
      onFinal: () => setIsSubmitting(false),
    });
  };

  const handleFileUpload = async (event, documentType) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const result = await uploadToCloudinary(file);
      const newDocument = {
        document_type: documentType,
        file_url: result.secure_url,
      };

      setFormData((prev) => ({
        ...prev,
        documents: [
          ...prev.documents.filter((doc) => doc.document_type !== documentType),
          newDocument,
        ],
      }));
    } catch (error) {
      toast.error('خطأ في الرفع');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>إضافة ولي أمر جديد</DialogTitle>
          <DialogDescription>
            أدخل البيانات المطلوبة لإنشاء الحساب.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6 pt-0 space-y-6">
          {/* Parent Section */}
          <div className="space-y-4">
            <h4 className="font-bold text-primary border-b pb-2">
              بيانات ولي الأمر
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>الاسم الكامل</Label>
                <Input
                  value={formData.full_name}
                  onChange={(e) =>
                    setFormData({ ...formData, full_name: e.target.value })
                  }
                  className={errors.full_name ? 'border-red-500' : ''}
                />
                {errors.full_name && (
                  <p className="text-xs text-red-500">{errors.full_name}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label>البريد الإلكتروني</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label>كلمة المرور</Label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                {errors.password && (
                  <p className="text-xs text-red-500">{errors.password}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label>رقم الهاتف</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
                {errors.phone && (
                  <p className="text-xs text-red-500">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Child Section */}
          <div className="space-y-4">
            <h4 className="font-bold text-primary border-b pb-2">
              بيانات الطفل
            </h4>
            <div className="space-y-3">
              <div className="space-y-1">
                <Label>اسم الطفل</Label>
                <Input
                  value={formData.child.full_name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      child: { ...formData.child, full_name: e.target.value },
                    })
                  }
                />
                {errors['child.full_name'] && (
                  <p className="text-xs text-red-500">
                    {errors['child.full_name']}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>العمر</Label>
                  <Input
                    type="number"
                    value={formData.child.age}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        child: {
                          ...formData.child,
                          age: parseInt(e.target.value) || '',
                        },
                      })
                    }
                  />
                  {errors['child.age'] && (
                    <p className="text-xs text-red-500">
                      {errors['child.age']}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label>الجنس</Label>
                  <Select
                    onValueChange={(v) =>
                      setFormData({
                        ...formData,
                        child: { ...formData.child, gender: v },
                      })
                    }
                    value={formData.child.gender}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="الجنس" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">ذكر</SelectItem>
                      <SelectItem value="female">أنثى</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-1">
                <Label>تاريخ الميلاد</Label>
                <Input
                  type="date"
                  value={formData.child.date_of_birth}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      child: {
                        ...formData.child,
                        date_of_birth: e.target.value,
                      },
                    })
                  }
                />
                {errors['child.date_of_birth'] && (
                  <p className="text-xs text-red-500">
                    {errors['child.date_of_birth']}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div className="space-y-4">
            <h4 className="font-bold text-primary border-b pb-2">الوثائق</h4>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1">
                <Label>شهادة الميلاد</Label>
                <Input
                  type="file"
                  onChange={(e) => handleFileUpload(e, 'birth_certificate')}
                  disabled={uploading}
                />
                {formData.documents.find(
                  (d) => d.document_type === 'birth_certificate'
                ) && <p className="text-xs text-green-600">✓ تم الرفع</p>}
              </div>
              <div className="space-y-1">
                <Label>النموذج الطبي</Label>
                <Input
                  type="file"
                  onChange={(e) => handleFileUpload(e, 'medical_form')}
                  disabled={uploading}
                />
                {formData.documents.find(
                  (d) => d.document_type === 'medical_form'
                ) && <p className="text-xs text-green-600">✓ تم الرفع</p>}
              </div>
              {errors.documents && (
                <p className="text-xs text-red-500">{errors.documents}</p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || uploading}
            className="min-w-[100px] bg-blue-500 hover:bg-blue-600 text-white"
          >
            {isSubmitting ? (
              <Loading variant="button" text="جاري الإضافة..." />
            ) : (
              'إضافة'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddParentDialog;

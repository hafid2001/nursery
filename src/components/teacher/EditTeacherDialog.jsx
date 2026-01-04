import { useState, useEffect } from 'react';
import { z } from 'zod';
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
import { updateTeacher } from '@/services/admin';
import { EditTeacherSchema } from '@/schemas/admin.schema';
import toast from 'react-hot-toast';
import { Loading } from '@/components/ui/loading';

const EditTeacherDialog = ({ open, onOpenChange, teacher, refreshData }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    status: 'ACTIVE',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (teacher) {
      setFormData({
        full_name: teacher.full_name || '',
        email: teacher.email || '',
        phone: teacher.phone || '',
        status: teacher.status || 'ACTIVE',
      });
      setErrors({}); // Clear errors when teacher changes
    }
  }, [teacher]);

  const handleSubmit = async () => {
    try {
      // Validate form data with Zod schema
      const validatedData = EditTeacherSchema.parse(formData);
      setErrors({}); // Clear any previous errors

      setIsSubmitting(true);
      updateTeacher(teacher.teacher_id, validatedData, {
        onSuccess: () => {
          toast.success('تم تحديث بيانات المعلمة بنجاح');
          onOpenChange(false);
          refreshData();
        },
        onError: () => {
          toast.error('فشل في تحديث بيانات المعلمة');
        },
        onFinal: () => setIsSubmitting(false),
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert Zod errors to a more user-friendly format
        const fieldErrors = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
        toast.error('يرجى تصحيح الأخطاء في النموذج');
      } else {
        toast.error('حدث خطأ غير متوقع');
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>تعديل بيانات المعلمة</DialogTitle>
          <DialogDescription>تحديث بيانات المعلمة.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="full_name">الاسم الكامل</Label>
            <Input
              id="full_name"
              value={formData.full_name}
              onChange={(e) =>
                setFormData({ ...formData, full_name: e.target.value })
              }
              className={errors.full_name ? 'border-destructive' : ''}
            />
            {errors.full_name && (
              <p className="text-sm text-destructive">{errors.full_name}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">رقم الهاتف</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className={errors.phone ? 'border-destructive' : ''}
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>الحالة</Label>
            <Select
              value={formData.status}
              onValueChange={(v) => setFormData({ ...formData, status: v })}
            >
              <SelectTrigger
                className={errors.status ? 'border-destructive' : ''}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">نشطة</SelectItem>
                <SelectItem value="UNACTIVE">في إجازة</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-sm text-destructive">{errors.status}</p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
          <Button
            className="bg-admin hover:bg-admin/90"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loading variant="button" text="جاري التحديث..." />
            ) : (
              'حفظ التغييرات'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditTeacherDialog;

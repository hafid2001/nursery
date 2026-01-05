import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { addClassroom, getTeacherList } from '@/services/admin';
import { ClassroomSchema } from '@/schemas/admin.schema';
import toast from 'react-hot-toast';
import { Loading } from '@/components/ui/loading';

const INITIAL_STATE = {
  name: '',
  age_group: '',
  capacity: '',
  teacherId: '',
};

const AddClassroomDialog = ({ open, onOpenChange, refreshData }) => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [isLoadingTeachers, setIsLoadingTeachers] = useState(false);

  useEffect(() => {
    const fetchTeachers = async () => {
      setIsLoadingTeachers(true);
      await getTeacherList('ACTIVE', 1, {
        onSuccess: (data) => {
          const uniqueTeachers = (data.data || []).filter((teacher, index, self) =>
            index === self.findIndex(t => t.teacher_id === teacher.teacher_id)
          );
          setTeachers(uniqueTeachers);
        },
        onError: () => {
          toast.error('فشل في تحميل قائمة المعلمات');
        },
        onFinal: () => setIsLoadingTeachers(false),
      });
    };

    if (open) {
      fetchTeachers();
    } else {
      // Reset form state when dialog closes
      setFormData(INITIAL_STATE);
      setErrors({});
      setIsSubmitting(false);
      setTeachers([]);
    }
  }, [open]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setFormData(INITIAL_STATE);
      setErrors({});
      setIsSubmitting(false);
      setTeachers([]);
    };
  }, []);

  const handleSubmit = async () => {
      const validatedData = ClassroomSchema.safeParse(formData);

      if (!validatedData.success) {
        const formattedErrors = {};
        validatedData.error.issues.forEach((issue) => {
          console.log(issue)
          formattedErrors[issue.path[0]] = issue.message;
        });
        setErrors(formattedErrors);
        setIsSubmitting(false); 
        return;
      }

      setErrors({});
      setIsSubmitting(true);

      await addClassroom(validatedData.data, {
        onSuccess: () => {
          toast.success('تم إضافة الفصل بنجاح');
          onOpenChange(false);
          refreshData();
        },
        onError: (err) => {
          toast.error('يرجى التحقق من البيانات المدخلة');
        },
        onFinal: () => setIsSubmitting(false),
      });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>إضافة فصل جديد</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>اسم الفصل</Label>
            <Input
              placeholder="مثال: فصل الزهور"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>الفئة العمرية</Label>
              <select
                value={formData.age_group}
                onChange={(e) =>
                  setFormData({ ...formData, age_group: e.target.value })
                }
                className={`flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 ${
                  errors.age_group ? 'border-destructive' : ''
                }`}
              >
                <option value="" disabled>
                  اختر الفئة
                </option>
                <option value="0-1 year">0 - 1 سنة</option>
                <option value="1-2 years">1 - 2 سنوات</option>
                <option value="2-3 years">2 - 3 سنوات</option>
                <option value="3-4 years">3 - 4 سنوات</option>
                <option value="4-5 years">4 - 5 سنوات</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>السعة القصوى</Label>
              <Input
                type="number"
                value={formData.capacity}
                onChange={(e) =>
                  setFormData({ ...formData, capacity: Number(e.target.value) })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>المعلمة</Label>
            <select
              value={formData.teacherId}
              onChange={(e) =>
                setFormData({ ...formData, teacherId: e.target.value })
              }
              disabled={isLoadingTeachers}
              className={`flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 ${
                errors.teacherId ? 'border-destructive' : ''
              }`}
            >
              <option value="" disabled>
                {isLoadingTeachers ? "جاري التحميل..." : "اختر المعلمة"}
              </option>
              {teachers.length > 0 ? (
                teachers.map((teacher) => (
                  <option key={teacher.teacher_id} value={teacher.teacher_id}>
                    {teacher.full_name}
                  </option>
                ))
              ) : (
                !isLoadingTeachers && (
                  <option value="" disabled>
                    لا توجد معلمات متاحة
                  </option>
                )
              )}
            </select>
            {errors.teacherId && (
              <p className="text-sm text-destructive">{errors.teacherId}</p>
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
            {isSubmitting ? <Loading variant="button" text="جاري الإضافة..." /> : 'إضافة'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddClassroomDialog;

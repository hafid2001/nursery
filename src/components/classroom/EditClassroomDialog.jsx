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
import { updateClassroom, getTeacherList } from '@/services/admin';
import toast from 'react-hot-toast';
import { Loading } from '@/components/ui/loading';
import { UpdateClassroomSchema } from '@/schemas/admin.schema';

const EditClassroomDialog = ({
  open,
  onOpenChange,
  classroom,
  refreshData,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    age_group: '',
    capacity: '',
    teacherId: '',
  });
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
      setFormData({
        name: '',
        age_group: '',
        capacity: '',
        teacherId: '',
      });
      setErrors({});
      setIsSubmitting(false);
      setTeachers([]);
    }
  }, [open]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setFormData({
        name: '',
        age_group: '',
        capacity: '',
        teacherId: '',
      });
      setErrors({});
      setIsSubmitting(false);
      setTeachers([]);
    };
  }, []);

  useEffect(() => {
    if (classroom && teachers.length > 0 && open) {
      setFormData({
        name: classroom.name || '',
        age_group: classroom.ageGroup || '',
        capacity: classroom.capacity || '',
        teacherId: classroom.teacher?.teacher_id || '',
      });
      setErrors({});
    }
  }, [classroom, teachers, open]);

  const handleSubmit = async () => {
    setErrors({});
    setIsSubmitting(true);

    const dataToSend = {
      id: classroom.id,
      ...Object.fromEntries(
        Object.entries(formData).filter(([key, value]) =>
          value !== '' && value !== null && value !== undefined
        )
      )
    };
    const validatedData = UpdateClassroomSchema.safeParse(dataToSend);

    if (!validatedData.success) {
      const formattedErrors = {};
      validatedData.error.issues.forEach((issue) => {
        formattedErrors[issue.path[0]] = issue.message;
      });
      setErrors(formattedErrors);
      setIsSubmitting(false);
      return;
    }

    console.log(classroom.id)
    await updateClassroom(classroom.id, validatedData.data, {
      onSuccess: () => {
        toast.success('تم تحديث البيانات');
        onOpenChange(false);
        refreshData();
      },
      onError : () => {
        toast.error('يرجى التحقق من البيانات المدخلة');
      },
      onFinal: () => setIsSubmitting(false),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>تعديل بيانات الفصل</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>اسم الفصل</Label>
            <Input
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
            {errors.age_group && (
              <p className="text-sm text-destructive">{errors.age_group}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>السعة القصوى</Label>
            <Input
              type="number"
              value={formData.capacity}
              onChange={(e) =>
                setFormData({ ...formData, capacity: Number(e.target.value) })
              }
              className={errors.capacity ? 'border-destructive' : ''}
            />
            {errors.capacity && (
              <p className="text-sm text-destructive">{errors.capacity}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>المعلمة الرئيسية</Label>
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
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? <Loading variant="button" text="جاري الحفظ..." /> : 'حفظ'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditClassroomDialog;

import { useState } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { addClassroom } from '@/services/admin';
import { ClassroomSchema } from '@/schemas/admin.schema';
import toast from 'react-hot-toast';
import { Loading } from '@/components/ui/loading';

const INITIAL_STATE = {
  name: '',
  age_group: '',
  capacity: '',
  teacher_name: '',
};

const AddClassroomDialog = ({ open, onOpenChange, refreshData }) => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
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
          setFormData(INITIAL_STATE);
          refreshData();
        },
        onError: (err) => toast.error(err?.message || 'حدث خطأ ما'),
        onFinal: () => setIsSubmitting(false),
      });
    } catch (err) {
      const formattedErrors = {};
      err.errors.forEach((e) => {
        formattedErrors[e.path[0]] = e.message;
      });
      setErrors(formattedErrors);
    }
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
              <Select
                onValueChange={(v) =>
                  setFormData({ ...formData, age_group: v })
                }
              >
                <SelectTrigger
                  className={errors.age_group ? 'border-destructive' : ''}
                >
                  <SelectValue placeholder="اختر الفئة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1 year">0 - 1 سنة</SelectItem>
                  <SelectItem value="1-2 years">1 - 2 سنوات</SelectItem>
                  <SelectItem value="2-3 years">2 - 3 سنوات</SelectItem>
                  <SelectItem value="3-4 years">3 - 4 سنوات</SelectItem>
                  <SelectItem value="4-5 years">4 - 5 سنوات</SelectItem>
                </SelectContent>
              </Select>
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
            <Label>المعلمة </Label>
            <Input
              placeholder="اسم المعلمة"
              value={formData.teacher_name}
              onChange={(e) =>
                setFormData({ ...formData, teacher_name: e.target.value })
              }
              className={errors.teacher_name ? 'border-destructive' : ''}
            />
            {errors.teacher_name && (
              <p className="text-sm text-destructive">{errors.teacher_name}</p>
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

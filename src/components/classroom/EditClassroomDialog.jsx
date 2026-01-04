import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { updateClassroom } from '@/services/admin';
import { ClassroomSchema } from '@/schemas/admin.schema';
import toast from 'react-hot-toast';
import { Loading } from '@/components/ui/loading';

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
    teacher_name: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (classroom) {
      setFormData({
        name: classroom.name || '',
        age_group: classroom.ageGroup || '',
        capacity: classroom.capacity || '',
        teacher_name: classroom.teacher.name || '',
      });
    }
  }, [classroom]);

  const handleSubmit = async () => {
    try {
      const validatedData = ClassroomSchema.parse(formData);
      setIsSubmitting(true);
      await updateClassroom(classroom.id, validatedData, {
        onSuccess: () => {
          toast.success('تم تحديث البيانات');
          onOpenChange(false);
          refreshData();
        },
        onFinal: () => setIsSubmitting(false),
      });
    } catch (err) {
      toast.error('يرجى التحقق من البيانات المدخلة');
    }
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
            />
          </div>
          <div className="space-y-2">
            <Label>الفئة العمرية</Label>
            <Select
              value={formData.age_group}
              onValueChange={(v) =>
                setFormData({ ...formData, age_group: v })
              }
            >
              <SelectTrigger>
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
          <div className="space-y-2">
            <Label>المعلمة الرئيسية</Label>
            <Input
              value={formData.teacher_name}
              onChange={(e) =>
                setFormData({ ...formData, teacher_name: e.target.value })
              }
            />
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

import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Mail, Phone, Building2 } from 'lucide-react';

const getStatusLabel = (status) => {
  switch (status) {
    case 'ACTIVE':
      return 'نشطة';
    case 'UNACTIVE':
      return 'في إجازة';
    default:
      return status;
  }
};

const ViewTeacherDialog = ({ open, onOpenChange, teacher, onEdit }) => {
  if (!teacher) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>ملف المعلمة</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-admin-accent text-admin-accent-foreground text-lg">
                {teacher.full_name
                  .split(' ')
                  .slice(1)
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{teacher.full_name}</h3>
              <Badge
                className={
                  teacher.status === 'ACTIVE' ? 'bg-success' : 'bg-warning'
                }
              >
                {getStatusLabel(teacher.status)}
              </Badge>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              {teacher.email}
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              {teacher.phone}
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-muted-foreground" />
              {teacher.classroom_name || 'غير محدد'}
            </div>
          </div>
          <div>
            <Label className="text-muted-foreground">الدور</Label>
            <p>{teacher.role}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">تاريخ التعيين</Label>
            <p>{teacher.created_at.split('T')[0]}</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إغلاق
          </Button>
          <Button
            className="bg-admin hover:bg-admin/90"
            onClick={() => {
              onOpenChange(false);
              onEdit(teacher);
            }}
          >
            تعديل
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewTeacherDialog;

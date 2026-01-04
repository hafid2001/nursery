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
import { Empty } from '@/components/ui/empty';
import { Mail, Phone } from 'lucide-react';

const getStatusLabel = (status) => {
  switch (status) {
    case 'PENDING_REVIEW':
      return 'قيد المراجعة';
    case 'APPROVED_AWAITING_PAYMENT':
      return 'بانتظار الدفع';
    case 'ACTIVE':
      return 'نشط';
    case 'REJECTED':
      return 'مرفوض';
    default:
      return status;
  }
};

const getStatusBadgeStyle = (status) => {
  switch (status) {
    case 'PENDING_REVIEW':
      return 'bg-warning text-warning-foreground';
    case 'APPROVED_AWAITING_PAYMENT':
      return 'bg-info text-info-foreground';
    case 'ACTIVE':
      return 'bg-success text-success-foreground';
    case 'REJECTED':
      return 'bg-destructive text-destructive-foreground';
    default:
      return '';
  }
};

const ViewParentDialog = ({ open, onOpenChange, user }) => {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl">تفاصيل ولي الأمر</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-2">
          {/* Parent Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-admin-accent text-admin-accent-foreground text-lg">
                  {user.full_name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg">{user.full_name}</h3>
                <Badge className={`${getStatusBadgeStyle(user.status)} mt-1`}>
                  {getStatusLabel(user.status)}
                </Badge>
              </div>
            </div>
            <div className="space-y-3 pl-20">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{user.phone}</span>
              </div>
            </div>
          </div>
          {/* Children Section */}
          <div className="space-y-4">
            <Label className="text-muted-foreground text-base font-medium">
              الأطفال
            </Label>
            <div className="space-y-4">
              {user.children && user.children.length > 0 ? (
                user.children.map((child) => (
                  <div
                    key={child.child_id}
                    className="border rounded-lg p-5 bg-muted/30 space-y-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-lg text-foreground">
                        {child.full_name}
                      </span>
                      <Badge variant="outline" className="text-sm">
                        {child.age} سنوات
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-muted-foreground">
                          الجنس:
                        </span>
                        <span>{child.gender === 'male' ? 'ذكر' : 'أنثى'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-muted-foreground">
                          تاريخ الميلاد:
                        </span>
                        <span>
                          {new Date(child.date_of_birth).toLocaleDateString(
                            'ar',
                            {
                              numberingSystem: 'latn',
                            }
                          )}
                        </span>
                      </div>
                    </div>
                    {child.documents && child.documents.length > 0 && (
                      <div className="pt-2 border-t">
                        <Label className="text-sm font-medium mb-3 block">
                          الوثائق
                        </Label>
                        <div className="space-y-3">
                          {child.documents.map((doc) => (
                            <div
                              key={doc.id}
                              className="flex items-center justify-between p-3 bg-background rounded-md border shadow-sm"
                            >
                              <span className="text-sm font-medium">
                                {doc.document_type === 'birth_certificate'
                                  ? 'شهادة الميلاد'
                                  : doc.document_type === 'medical_form'
                                    ? 'النموذج الطبي'
                                    : doc.document_type}
                              </span>
                              <a
                                href={doc.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-600 hover:text-blue-800 hover:underline font-medium"
                              >
                                عرض الوثيقة →
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <Empty variant="children" className="py-4" />
              )}
            </div>
          </div>
          {/* Join Date */}
          <div className="pt-2 border-t">
            <Label className="text-muted-foreground text-base font-medium">
              تاريخ الانضمام
            </Label>
            <p className="text-sm mt-1">
              {new Date(user.created_at).toLocaleDateString('ar', {
                numberingSystem: 'latn',
              })}
            </p>
          </div>
        </div>
        <DialogFooter className="pt-6 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إغلاق
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewParentDialog;

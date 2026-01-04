import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Loading } from '@/components/ui/loading';
import { Empty } from '@/components/ui/empty';

const ViewStudentsDialog = ({ open, onOpenChange, classroom, students }) => {
  const loading = false; // Students are passed directly, so no internal loading state

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{classroom?.name} - الطلاب</DialogTitle>
          <DialogDescription>
            قائمة الطلاب المسجلين في هذا الفصل
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {loading ? (
            <Loading variant="page" text="جاري تحميل الطلاب..." />
          ) : (
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {(students || []).map((student, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-admin-accent text-xs">
                      {student.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{student.name}</span>
                </div>
              ))}
              {(students || []).length === 0 && (
                <Empty variant="students" className="py-6" />
              )}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إغلاق
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewStudentsDialog
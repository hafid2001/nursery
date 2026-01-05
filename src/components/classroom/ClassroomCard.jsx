import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit, Users, GraduationCap, Building2, Settings } from 'lucide-react';

const ClassroomCard = ({ classroom, onEdit, onViewStudents, openSettings, openStudents, openEdit, color, iconColor }) => {
  // Convert border color to background color
  const getBackgroundColor = (borderColor) => {
    if (borderColor.includes('admin-accent')) return 'bg-admin-accent/10';
    if (borderColor.includes('blue-400')) return 'bg-blue-400/10';
    if (borderColor.includes('green-400')) return 'bg-green-400/10';
    if (borderColor.includes('yellow-400')) return 'bg-yellow-400/10';
    if (borderColor.includes('purple-400')) return 'bg-purple-400/10';
    return 'bg-slate-50';
  };

  const backgroundColor = getBackgroundColor(color);
  const occupancyRate = (classroom.current_enrollment / classroom.capacity) * 100;

  return (
    <Card
      key={classroom.id}
      className={`hover-lift border-2 ${color} ${backgroundColor}`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}
            >
              <Building2 className={`w-5 h-5 ${iconColor}`} />
            </div>
            <div>
              <CardTitle className="text-lg">{classroom.name}</CardTitle>
              <Badge variant="outline" className="mt-1">
                سعة: {classroom.capacity}
              </Badge>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => openSettings(classroom)}>
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Capacity */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">السعة</span>
            <span className="font-medium">
              {classroom.current_enrollment} / {classroom.capacity}
            </span>
          </div>
          <Progress
            value={(classroom.current_enrollment / classroom.capacity) * 100}
            className="h-2"
          />
        </div>

        {/* Teachers */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">الطاقم</p>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="text-xs bg-admin-accent">
                {classroom.teacher.name
                  .split(" ")
                  .slice(1)
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">
                {classroom.teacher.name}
              </p>
              <p className="text-xs text-muted-foreground">
                معلمة رئيسية
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="text-xs bg-muted">
                مس
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">
                غير محدد
              </p>
              <p className="text-xs text-muted-foreground">
                معلمة مساعدة
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={() => openStudents(classroom)}>
            <Users className="w-3 h-3" />
            الطلاب
          </Button>
          <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={() => onEdit(classroom)}>
            <Edit className="w-3 h-3" />
            تعديل
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassroomCard;

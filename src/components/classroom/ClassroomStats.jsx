import { Card, CardContent } from '@/components/ui/card';
import { Building2, Users, GraduationCap } from 'lucide-react';

const ClassroomStats = ({ classrooms }) => {
  const totalEnrolled = classrooms.reduce(
    (sum, c) => sum + (c.enrolled || 0),
    0
  );
  const totalCapacity = classrooms.reduce(
    (sum, c) => sum + (c.capacity || 0),
    0
  );

  const stats = [
    {
      label: 'إجمالي الفصول',
      value: classrooms.length,
      icon: Building2,
      color: 'text-admin',
      bg: 'bg-admin/10',
    },
    {
      label: 'إجمالي المسجلين',
      value: totalEnrolled,
      icon: Users,
      color: 'text-success',
      bg: 'bg-success/10',
    },
    {
      label: 'المعلمات',
      value: classrooms.length * 2,
      icon: GraduationCap,
      color: 'text-info',
      bg: 'bg-info/10',
    },
    {
      label: 'الأماكن المتاحة',
      value: totalCapacity - totalEnrolled,
      icon: Users,
      color: 'text-warning',
      bg: 'bg-warning/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <Card key={i}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}
              >
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ClassroomStats;

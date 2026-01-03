import { Card, CardContent } from '@/components/ui/card';

const TeacherStats = ({ teachers }) => {
  const activeCount = teachers.filter((t) => t.status === 'ACTIVE').length;
  const onLeaveCount = teachers.filter((t) => t.status === 'UNACTIVE').length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-admin">{teachers.length}</p>
            <p className="text-sm text-muted-foreground">إجمالي المعلمات</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-success">{activeCount}</p>
            <p className="text-sm text-muted-foreground">نشطات</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-warning">{onLeaveCount}</p>
            <p className="text-sm text-muted-foreground">في إجازة</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherStats;

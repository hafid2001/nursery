import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Users, GraduationCap } from 'lucide-react';
import { getClassroomStats } from '@/services/admin';

const ClassroomStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        await getClassroomStats({
          onStart: () => setLoading(true),
          onSuccess: (data) => {
            setStats(data);
            setLoading(false);
          },
          onError: (err) => {
            setError(err);
            setLoading(false);
          },
          onFinal : () => {
            setLoading(false)
          }
        });
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      label: 'إجمالي الفصول',
      value: stats?.total_rooms || 0,
      icon: Building2,
      color: 'text-admin',
      bg: 'bg-admin/10',
    },
    {
      label: 'إجمالي المسجلين',
      value: stats?.total_enrolled || 0,
      icon: Users,
      color: 'text-success',
      bg: 'bg-success/10',
    },
    {
      label: 'المعلمات',
      value: stats?.total_teachers || 0,
      icon: GraduationCap,
      color: 'text-info',
      bg: 'bg-info/10',
    },
    {
      label: 'الأماكن المتاحة',
      value: stats?.spots_available || 0,
      icon: Users,
      color: 'text-warning',
      bg: 'bg-warning/10',
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-200 animate-pulse" />
                <div>
                  <div className="w-12 h-8 bg-gray-200 animate-pulse rounded mb-1" />
                  <div className="w-16 h-4 bg-gray-200 animate-pulse rounded" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="col-span-full">
          <CardContent className="pt-6">
            <div className="text-center text-red-500">
              <p>حدث خطأ في تحميل البيانات</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      {statCards.map((stat, i) => (
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

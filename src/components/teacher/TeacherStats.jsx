import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { getTeacherStats } from '@/services/admin';

const TeacherStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        await getTeacherStats({
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

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-16 h-10 bg-gray-200 animate-pulse rounded mx-auto mb-2" />
                <div className="w-20 h-4 bg-gray-200 animate-pulse rounded mx-auto" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-admin">{stats?.total_teachers || 0}</p>
            <p className="text-sm text-muted-foreground">إجمالي المعلمات</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-success">{stats?.active || 0}</p>
            <p className="text-sm text-muted-foreground">نشطات</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-warning">{stats?.on_leave || 0}</p>
            <p className="text-sm text-muted-foreground">في إجازة</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherStats;

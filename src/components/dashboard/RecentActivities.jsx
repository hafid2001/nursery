import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRecentActivities } from '@/services/admin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';
import { Activity, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Empty } from '@/components/ui/empty';

const RecentActivities = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchActivities = async () => {
    getRecentActivities({
      onStart: () => {
        setLoading(true);
      },
      onSuccess: (response) => {
        setActivities(response.data || []);
        setLoading(false);
      },
      onError: (error) => {
        toast.error("حدث خطأ ما");
        setLoading(false);
        setActivities([]);
      },
      onFinal : () => {
        setLoading(false);
      }
    });
  };
  
  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <Card className="lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">
          النشاط الأخير
        </CardTitle>
        <Button variant="ghost" size="sm" className="text-admin" onClick={() => navigate("/admin/reports")}>
          عرض الكل
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="relative w-12 h-12">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        ) : activities.length > 0 ? (
          <div className="space-y-4">
            {activities.map((activity , index) => (
              <div
                key={activity.id || index}
                className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-admin-accent text-admin-accent-foreground text-sm">
                    {activity.title
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-sm">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.description}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <Empty variant="activities" />
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivities;


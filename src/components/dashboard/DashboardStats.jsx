import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboardStats } from '@/services/admin'; // Adjust path as needed
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Users, Home, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';

const DashboardStats = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total_parents: 0,
    total_classrooms: 0,
    enrolled_children: 0,
    available_capacity: 0,
    monthly_revenue: 0,
  });

  const [loading, setLoading] = useState(false);
  const fetchStats = async () => {
    getDashboardStats({
      onStart: () => {
        setLoading(true);
      },
      onSuccess: (response) => {
        setStats(response.data);
        setLoading(false);
      },
      onError: (error) => {
        toast.error("حدث خطأ ما");
        setLoading(false);
        setStats({
          total_parents: 0,
          total_classrooms: 0,
          enrolled_children: 0,
          available_capacity: 0,
          monthly_revenue: 0,
        });
      },
      onFinal: () => {
        setLoading(false);
      },
    });
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const statsData = [
    {
      title: "إجمالي أولياء الأمور",
      value: stats.total_parents,
      // Assuming a simple way to show change and trend. You might need to calculate these based on previous data if available from the API.
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "bg-admin",
      route: "/admin/users"
    },
    {
      title: "إجمالي الفصول",
      value: stats.total_classrooms,
      change: "0",
      trend: "neutral",
      icon: Home,
      color: "bg-warning",
      route: "/admin/classrooms"
    },
    {
      title: "الأطفال المسجلين",
      value: `${stats.enrolled_children} / ${stats.available_capacity}`,
      change: "+2",
      trend: "up",
      icon: Users, // Using Users icon for children as well, can be changed
      color: "bg-success",
      route: "/admin/children"
    },
    {
      title: "الإيرادات الشهرية",
      value: `${stats.monthly_revenue} ر.س`,
      change: "+8.5%",
      trend: "up",
      icon: DollarSign,
      color: "bg-info",
      route: "/admin/payments"
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {loading ? (
        <div className="flex items-center justify-center py-8 col-span-full">
          <div className="relative w-12 h-12">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      ) : (
        statsData.map((stat) => (
          <Card key={stat.title} className="hover-lift cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    {stat.value}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {stat.trend === "up" && (
                      <TrendingUp className="w-4 h-4 text-success" />
                    )}
                    {stat.trend === "down" && (
                      <TrendingDown className="w-4 h-4 text-destructive" />
                    )}
                    <span
                      className={`text-sm ${
                        stat.trend === "up"
                          ? "text-success"
                          : stat.trend === "down"
                          ? "text-destructive"
                          : "text-muted-foreground"
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div
                  className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default DashboardStats;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPendingActions } from '@/services/admin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Clock, Bell, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Empty } from '@/components/ui/empty';
import toast from 'react-hot-toast';

const PendingActions = () => {
  const navigate = useNavigate();
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPendingActions = async () => {
    getPendingActions({
      onStart: () => {
        setLoading(true);
      },
      onSuccess: (response) => {
        setActions(response.data || []);
        setLoading(false);
      },
      onError: (error) => {
        toast.error("حدث خطأ ما");
        setLoading(false);
        setActions([]);
      },
      onFinal: () => {
        setLoading(false);
      }
    });

  };
  
  useEffect(() => {
    fetchPendingActions();
  }, []);

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'medium':
        return <Bell className="h-5 w-5 text-yellow-500" />;
      case 'low':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPriorityVariant = (priority) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Bell className="w-5 h-5 text-admin" />
          الإجراءات المعلقة
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="relative w-12 h-12">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        ) : actions.length > 0 ? (
          <div className="space-y-3">
            {actions.map((action, index) => (
              <div
                key={action.id || index}
                className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-admin/50 transition-colors cursor-pointer"
                onClick={() => navigate(action.route)}
              >
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    action.priority === "high"
                      ? "bg-destructive"
                      : action.priority === "medium"
                      ? "bg-warning"
                      : "bg-muted-foreground"
                  }`}
                />
                <p className="text-sm">{action.title}</p>
              </div>
            ))}
          </div>
        ) : (
          <Empty variant="pending-actions" />
        )}
      </CardContent>
    </Card>
  );
};

export default PendingActions;


import { Empty } from '@/components/ui/empty';
import { FileX, Calendar, User, TrendingUp } from 'lucide-react';

const ParentEmptyState = ({
  type = 'default',
  title,
  description,
  action,
  className,
  ...props
}) => {
  // Specific configurations for different parent page empty states
  const parentConfigs = {
    attendance: {
      icon: Calendar,
      title: 'لا توجد سجلات حضور',
      description: 'لم يتم تسجيل أي سجلات حضور لأطفالك حتى الآن.',
    },
    'daily-reports': {
      icon: FileX,
      title: 'لا توجد تقارير يومية',
      description: 'لم يتم إنشاء أي تقارير يومية لأطفالك بعد.',
    },
    'child-profile': {
      icon: User,
      title: 'لا توجد معلومات عن الطفل',
      description: 'لم يتم العثور على معلومات الطفل المطلوبة.',
    },
    'progress-reports': {
      icon: TrendingUp,
      title: 'لا توجد تقارير تقدم',
      description: 'لم يتم إنشاء أي تقارير تقدم لأطفالك بعد.',
    },
    default: {
      icon: FileX,
      title: 'لا توجد بيانات',
      description: 'لم يتم العثور على أي بيانات متاحة.',
    },
  };

  const config = parentConfigs[type] || parentConfigs.default;

  return (
    <Empty
      variant="default"
      icon={config.icon}
      title={title || config.title}
      description={description || config.description}
      action={action}
      className={className}
      {...props}
    />
  );
};

export { ParentEmptyState };

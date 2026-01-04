import { cn } from '@/lib/utils';
import { FileX, Users, Building2, DollarSign, Search, Plus, Activity, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Empty = ({
  variant = 'default',
  icon: Icon,
  title,
  description,
  action,
  className,
  ...props
}) => {
  // Default configurations for common empty states
  const defaultConfigs = {
    users: {
      icon: Users,
      title: 'لا يوجد مستخدمون',
      description: 'لم يتم العثور على أي مستخدمين في النظام.',
    },
    classrooms: {
      icon: Building2,
      title: 'لا توجد فصول دراسية',
      description: 'لم يتم إضافة أي فصول دراسية بعد.',
    },
    payments: {
      icon: DollarSign,
      title: 'لا توجد مدفوعات',
      description: 'لم يتم تسجيل أي مدفوعات حتى الآن.',
    },
    search: {
      icon: Search,
      title: 'لا توجد نتائج',
      description: 'لم يتم العثور على نتائج مطابقة للبحث.',
    },
    students: {
      icon: Users,
      title: 'لا يوجد طلاب',
      description: 'لم يتم تسجيل أي طلاب في هذا الفصل.',
    },
    children: {
      icon: Users,
      title: 'لا توجد أطفال',
      description: 'لم يتم تسجيل أي أطفال لهذا الوالد.',
    },
    reports: {
      icon: FileX,
      title: 'لا توجد تقارير',
      description: 'لم يتم إنشاء أي تقارير بعد.',
    },
    announcements: {
      icon: FileX,
      title: 'لا توجد إعلانات',
      description: 'لم يتم نشر أي إعلانات بعد.',
    },
    activities: {
      icon: Activity,
      title: 'لا يوجد نشاط حديث',
      description: 'سيظهر النشاط هنا عندما يكون متاحًا.',
    },
    'pending-actions': {
      icon: CheckCircle,
      title: 'لا توجد إجراءات معلقة حاليًا!',
      description: 'كل شيء منظم في الوقت الحالي.',
    },
    default: {
      icon: FileX,
      title: 'لا توجد بيانات',
      description: 'لم يتم العثور على أي بيانات.',
    },
  };

  const config = defaultConfigs[variant] || defaultConfigs.default;
  const displayIcon = Icon || config.icon;
  const displayTitle = title || config.title;
  const displayDescription = description || config.description;

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 px-4 text-center',
        className
      )}
      {...props}
    >
      {displayIcon && (
        <div className="rounded-full bg-muted p-6 mb-4">
          <displayIcon className="w-12 h-12 text-muted-foreground" />
        </div>
      )}

      <h3 className="text-lg font-semibold text-foreground mb-2">
        {displayTitle}
      </h3>

      <p className="text-sm text-muted-foreground mb-6 max-w-sm">
        {displayDescription}
      </p>

      {action && (
        <div className="flex flex-col sm:flex-row gap-2">
          {action}
        </div>
      )}
    </div>
  );
};

// Quick helper components for common actions
const EmptyAction = ({ children, ...props }) => (
  <Button variant="outline" size="sm" {...props}>
    {children}
  </Button>
);

const EmptyPrimaryAction = ({ children, ...props }) => (
  <Button size="sm" {...props}>
    <Plus className="w-4 h-4 mr-2" />
    {children}
  </Button>
);

Empty.Action = EmptyAction;
Empty.PrimaryAction = EmptyPrimaryAction;

export { Empty };
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ClassroomStats from '@/components/classroom/ClassroomStats';
import AddClassroomDialog from '@/components/classroom/AddClassroomDialog';
import EditClassroomDialog from '@/components/classroom/EditClassroomDialog';
import ViewStudentsDialog from '@/components/classroom/ViewStudentsDialog';
import { getClassroomList } from '@/services/admin';
import ClassroomCard from '@/components/classroom/ClassroomCard';
import { Loading } from '@/components/ui/loading';
import { Empty } from '@/components/ui/empty';

const AdminClassrooms = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editData, setEditData] = useState({ open: false, classroom: null });
  const [settingsData, setSettingsData] = useState({ open: false, classroom: null });
  const [viewStudents, setViewStudents] = useState({
    open: false,
    classroom: null,
  });

  const openSettings = (classroom) => {
    setSettingsData({ open: true, classroom });
  };

  const getClassroomCardColors = (index) => {
    const colors = [
      { color: 'border-admin-accent/70', iconColor: 'text-admin-accent' },
      { color: 'border-blue-400/70', iconColor: 'text-blue-400' },
      { color: 'border-green-400/70', iconColor: 'text-green-400' },
      { color: 'border-yellow-400/70', iconColor: 'text-yellow-400' },
      { color: 'border-purple-400/70', iconColor: 'text-purple-400' },
    ];
    return colors[index % colors.length];
  };

  const fetchData = () => {
    setLoading(true);
    getClassroomList({
      onSuccess: (data) => {
        console.log("Classrooms data from API:", data);
        setClassrooms(data);
        console.log("Updated classrooms state (next render cycle):", data);
      },
      onError : () => {
        setClassrooms([]);
      },
      onFinal: () => setLoading(false),
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold">
              إدارة الفصول
            </h1>
            <p className="text-muted-foreground">
              إدارة الفصول والسعة وتعيينات المعلمات
            </p>
          </div>
          <Button
            className="bg-admin hover:bg-admin/90"
            onClick={() => setIsAddOpen(true)}
          >
            <Plus className="w-4 h-4 ml-2" /> إضافة فصل
          </Button>
        </div>

        <ClassroomStats />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full">
              <Loading variant="page" text="جاري تحميل الفصول..." size="lg" />
            </div>
          ) : classrooms.length === 0 ? (
            <div className="col-span-full">
              <Empty
                variant="classrooms"
                action={
                  <Empty.PrimaryAction onClick={() => setIsAddOpen(true)}>
                    إضافة فصل جديد
                  </Empty.PrimaryAction>
                }
              />
            </div>
          ) : (
            classrooms.map((classroom, index) => {
              const { color, iconColor } = getClassroomCardColors(index);
              return (
                <ClassroomCard
                  key={classroom.id}
                  classroom={classroom}
                  onEdit={(c) => setEditData({ open: true, classroom: c })}
                  onViewStudents={(c) =>
                    setViewStudents({ open: true, classroom: c })
                  }
                  openSettings={openSettings}
                  openStudents={(c) =>
                    setViewStudents({ open: true, classroom: c, students: c.children })
                  }
                  openEdit={(c) => setEditData({ open: true, classroom: c })}
                  color={color}
                  iconColor={iconColor}
                />
              );
            })
          )}
        </div>
      </div>

      <AddClassroomDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        refreshData={fetchData}
      />

      <EditClassroomDialog
        open={editData.open}
        onOpenChange={(open) => setEditData({ ...editData, open })}
        classroom={editData.classroom}
        refreshData={fetchData}
      />

      <ViewStudentsDialog
        open={viewStudents.open}
        onOpenChange={(open) => setViewStudents({ ...viewStudents, open })}
        classroom={viewStudents.classroom}
      />
    </AdminLayout>
  );
};


export default AdminClassrooms
import { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Megaphone,
  Plus,
  Users,
  GraduationCap,
  Building2,
  Edit,
  Trash2,
  Calendar,
  Clock,
} from 'lucide-react';

const AdminAnnouncements = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const getAudienceIcon = () => {
    switch (audience) {
      case 'parents':
        return <Users className="w-4 h-4" />;
      case 'teachers':
        return <GraduationCap className="w-4 h-4" />;
      default:
        return <Building2 className="w-4 h-4" />;
    }
  };

  const getAudienceLabel = () => {
    switch (audience) {
      case 'parents':
        return 'أولياء الأمور فقط';
      case 'teachers':
        return 'المعلمات فقط';
      default:
        return 'الجميع';
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case 'published':
        return 'منشور';
      case 'draft':
        return 'مسودة';
      default:
        return status;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              الإعلانات
            </h1>
            <p className="text-muted-foreground">
              إنشاء وإدارة الإعلانات لأولياء الأمور والموظفات
            </p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-admin hover:bg-admin/90 text-admin-foreground">
                <Plus className="w-4 h-4" />
                إعلان جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>إنشاء إعلان</DialogTitle>
                <DialogDescription>
                  إنشاء إعلان جديد لمشاركته مع أولياء الأمور والموظفات.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">العنوان</Label>
                  <Input id="title" placeholder="عنوان الإعلان..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">المحتوى</Label>
                  <Textarea
                    id="content"
                    placeholder="اكتب إعلانك..."
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>الجمهور</Label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">الجميع</SelectItem>
                        <SelectItem value="parents">
                          أولياء الأمور فقط
                        </SelectItem>
                        <SelectItem value="teachers">المعلمات فقط</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>الأولوية</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">عالية</SelectItem>
                        <SelectItem value="medium">متوسطة</SelectItem>
                        <SelectItem value="low">منخفضة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsCreateOpen(false)}
                >
                  إلغاء
                </Button>
                <Button className="bg-admin hover:bg-admin/90">
                  نشر الإعلان
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-admin/10 flex items-center justify-center">
                  <Megaphone className="w-5 h-5 text-admin" />
                </div>
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">
                    إجمالي الإعلانات
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">4</p>
                  <p className="text-sm text-muted-foreground">هذا الشهر</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">1</p>
                  <p className="text-sm text-muted-foreground">المسودات</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Announcements List */}
        <Card>
          <CardHeader>
            <CardTitle>جميع الإعلانات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="p-4 rounded-lg border border-border hover:border-admin/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{announcement.title}</h3>
                        <Badge
                          variant={
                            announcement.status === 'published'
                              ? 'default'
                              : 'secondary'
                          }
                          className={
                            announcement.status === 'published'
                              ? 'bg-success'
                              : ''
                          }
                        >
                          {getStatusLabel(announcement.status)}
                        </Badge>
                        {announcement.priority === 'high' && (
                          <Badge className="bg-destructive">أولوية عالية</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {announcement.content}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          {getAudienceIcon(announcement.audience)}
                          {getAudienceLabel(announcement.audience)}
                        </div>
                        <span>•</span>
                        <span>بواسطة {announcement.createdBy}</span>
                        <span>•</span>
                        <span>{announcement.createdAt}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminAnnouncements;

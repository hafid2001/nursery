import { ParentLayout } from '@/components/layout/ParentLayout.jsx';
import { useState, useEffect } from 'react';
import {
  User,
  Calendar,
  Phone,
  Mail,
  Heart,
  AlertCircle,
  Edit,
  Save,
  Baby,
  Cake,
  School,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loading } from '@/components/ui/loading';
import { ParentEmptyState } from '@/components/parent/ParentEmptyState';
import { ParentServices } from '@/schemas/parent.schema';
import { useToast } from '@/hooks/use-toast';

export default function ChildProfile() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [childData, setChildData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchChildData();
  }, []);

  const fetchChildData = async () => {
    try {
      setLoading(true);
      setError(null);

      await ParentServices.getChildDetails({
        onSuccess: (response) => {
          if (response.data && response.data.length > 0) {
            // Assuming we take the first child for now
            // In a real app, you might want to select which child to view
            setChildData(response.data[0]);
          } else {
            setChildData(null);
          }
        },
        onError: (error) => {
          console.error('Failed to fetch child data:', error);
          setError(error);
          toast({
            title: 'خطأ في تحميل البيانات',
            description: 'حدث خطأ أثناء تحميل معلومات الطفل. يرجى المحاولة مرة أخرى.',
            variant: 'destructive',
          });
        },
      });
    } catch (err) {
      console.error('Unexpected error:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    if (!childData) return;

    try {
      setSaving(true);

      // For each changed field, request profile change
      const originalData = childData; // This would be the original data before editing

      // Example: if allergies changed
      if (childData.allergies !== originalData.allergies) {
        await ParentServices.requestChildProfileChange(
          childData.child_id,
          'allergies',
          childData.allergies,
          {
            onSuccess: () => {
              toast({
                title: 'تم إرسال الطلب',
                description: 'تم إرسال طلب تغيير الحساسية للمراجعة.',
              });
            },
            onError: (error) => {
              console.error('Failed to request allergies change:', error);
              toast({
                title: 'خطأ في الطلب',
                description: 'حدث خطأ أثناء إرسال طلب تغيير الحساسية.',
                variant: 'destructive',
              });
            },
          }
        );
      }

      // Similarly for medical notes
      if (childData.medical_notes !== originalData.medical_notes) {
        await ParentServices.requestChildProfileChange(
          childData.child_id,
          'medical_notes',
          childData.medical_notes,
          {
            onSuccess: () => {
              toast({
                title: 'تم إرسال الطلب',
                description: 'تم إرسال طلب تغيير الملاحظات الطبية للمراجعة.',
              });
            },
            onError: (error) => {
              console.error('Failed to request medical notes change:', error);
              toast({
                title: 'خطأ في الطلب',
                description: 'حدث خطأ أثناء إرسال طلب تغيير الملاحظات الطبية.',
                variant: 'destructive',
              });
            },
          }
        );
      }

      setIsEditing(false);
    } catch (err) {
      console.error('Unexpected error:', err);
      toast({
        title: 'خطأ غير متوقع',
        description: 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const calculateAge = (dob) => {
    if (!dob) return 'غير محدد';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    )
      age--;
    return age;
  };

  if (loading) {
    return (
      <ParentLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-display text-foreground">
              ملف الطفل
            </h1>
            <p className="text-muted-foreground">عرض وإدارة معلومات طفلك</p>
          </div>
          <Loading variant="page" text="جاري تحميل معلومات الطفل..." />
        </div>
      </ParentLayout>
    );
  }

  if (error || !childData) {
    return (
      <ParentLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-display text-foreground">
              ملف الطفل
            </h1>
            <p className="text-muted-foreground">عرض وإدارة معلومات طفلك</p>
          </div>
          <ParentEmptyState
            type="child-profile"
            action={
              error ? (
                <Button onClick={fetchChildData} variant="outline">
                  إعادة المحاولة
                </Button>
              ) : null
            }
          />
        </div>
      </ParentLayout>
    );
  }

  return (
    <ParentLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-display text-foreground">
              ملف الطفل
            </h1>
            <p className="text-muted-foreground">عرض وإدارة معلومات طفلك</p>
          </div>
          <Button
            onClick={() =>
              isEditing ? handleSaveChanges() : setIsEditing(true)
            }
            className="rounded-full"
            disabled={saving}
          >
            {saving ? (
              <>
                <Loading size="sm" />
                جاري الحفظ...
              </>
            ) : isEditing ? (
              <>
                <Save className="h-4 w-4 ml-2" /> حفظ التغييرات
              </>
            ) : (
              <>
                <Edit className="h-4 w-4 ml-2" /> تعديل الملف
              </>
            )}
          </Button>
        </div>

        <Card className="rounded-2xl border-0 shadow-md overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-primary via-primary/80 to-accent" />
          <CardContent className="relative pt-0">
            <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-16 md:-mt-12">
              <Avatar className="h-32 w-32 border-4 border-card shadow-lg">
                <AvatarImage src="" alt={`${childData.first_name} ${childData.last_name}`} />
                <AvatarFallback className="bg-gradient-to-br from-lavender to-mint text-4xl font-bold text-foreground">
                  <Baby className="h-16 w-16" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 pb-2">
                <h2 className="text-2xl font-bold text-foreground">
                  {childData.first_name} {childData.last_name}
                </h2>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <Badge className="rounded-full bg-primary text-primary-foreground">
                    <School className="h-3 w-3 ml-1" />
                    {childData.classroom || 'غير محدد'}
                  </Badge>
                  <Badge variant="secondary" className="rounded-full">
                    <Cake className="h-3 w-3 ml-1" />
                    {calculateAge(childData.date_of_birth)} سنوات
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="rounded-2xl border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                المعلومات الأساسية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground text-sm">
                    الاسم الأول
                  </Label>
                  {isEditing ? (
                    <Input
                      value={childData.first_name}
                      onChange={(e) =>
                        setChildData({
                          ...childData,
                          first_name: e.target.value,
                        })
                      }
                      className="mt-1 rounded-xl"
                    />
                  ) : (
                    <p className="font-medium">{childData.first_name}</p>
                  )}
                </div>
                <div>
                  <Label className="text-muted-foreground text-sm">
                    اسم العائلة
                  </Label>
                  {isEditing ? (
                    <Input
                      value={childData.last_name}
                      onChange={(e) =>
                        setChildData({ ...childData, last_name: e.target.value })
                      }
                      className="mt-1 rounded-xl"
                    />
                  ) : (
                    <p className="font-medium">{childData.last_name}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground text-sm">
                    تاريخ الميلاد
                  </Label>
                  <p className="font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {childData.date_of_birth ? new Date(childData.date_of_birth).toLocaleDateString('ar-SA') : 'غير محدد'}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-sm">الجنس</Label>
                  <p className="font-medium">{childData.gender === 'male' ? 'ذكر' : childData.gender === 'female' ? 'أنثى' : childData.gender}</p>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground text-sm">
                  فصيلة الدم
                </Label>
                <p className="font-medium">{childData.blood_type || 'غير محدد'}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <School className="h-5 w-5 text-primary" />
                معلومات الصف
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-lavender">
                <Label className="text-lavender-foreground text-sm">
                  الصف المعين
                </Label>
                <p className="text-xl font-bold text-foreground">
                  {childData.classroom || 'غير محدد'}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground text-sm">
                  المعلمة الرئيسية
                </Label>
                <p className="font-medium">{childData.teacher || 'غير محدد'}</p>
              </div>
              <div>
                <Label className="text-muted-foreground text-sm">
                  تاريخ التسجيل
                </Label>
                <p className="font-medium">
                  {childData.enrollment_date ? new Date(childData.enrollment_date).toLocaleDateString('ar-SA') : 'غير محدد'}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-destructive" />
                المعلومات الطبية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-muted-foreground text-sm flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-warning" />
                  الحساسية
                </Label>
                {isEditing ? (
                  <Input
                    value={childData.allergies || ''}
                    onChange={(e) =>
                      setChildData({ ...childData, allergies: e.target.value })
                    }
                    className="mt-1 rounded-xl"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {childData.allergies ? (
                      childData.allergies.split(',').map((allergy, index) => (
                        <Badge
                          key={index}
                          variant="destructive"
                          className="rounded-full"
                        >
                          {allergy.trim()}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-sm">لا توجد حساسية مسجلة</p>
                    )}
                  </div>
                )}
              </div>
              <div>
                <Label className="text-muted-foreground text-sm">
                  ملاحظات طبية
                </Label>
                {isEditing ? (
                  <Textarea
                    value={childData.medical_notes || ''}
                    onChange={(e) =>
                      setChildData({
                        ...childData,
                        medical_notes: e.target.value,
                      })
                    }
                    className="mt-1 rounded-xl"
                    rows={3}
                  />
                ) : (
                  <p className="text-foreground mt-1 p-3 bg-secondary/50 rounded-xl">
                    {childData.medical_notes || 'لا توجد ملاحظات طبية'}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                جهات الاتصال للطوارئ
              </CardTitle>
              <CardDescription>الأشخاص المصرح لهم باستلام طفلك</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                <p className="text-muted-foreground text-center">
                  معلومات جهات الاتصال غير متوفرة حالياً
                </p>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  سيتم إضافة هذه المعلومات قريباً
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ParentLayout>
  );
}

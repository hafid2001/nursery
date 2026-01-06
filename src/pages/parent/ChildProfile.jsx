import { ParentLayout } from "@/components/layout/ParentLayout";
import { useState, useEffect } from "react";
import { User, Calendar, Phone, Mail, Baby, Cake, School, FileText, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ParentLoading } from "@/components/parent/ParentLoading";
import { ParentEmptyState } from "@/components/parent/ParentEmptyState";
import { parentServices } from "@/services/parent.schema";
import toast from 'react-hot-toast';

function calculateAge(dateOfBirth) {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function getDocumentTypeLabel(type) {
  const labels = {
    'birth_certificate': 'شهادة ميلاد',
    'medical_record': 'سجل طبي',
    'vaccination_card': 'بطاقة تطعيم',
    'id_copy': 'نسخة الهوية',
    'other': 'أخرى'
  };
  return labels[type] || type;
}

export default function ChildProfile() {
  const [childData, setChildData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchChildData = async () => {
    try {
      setLoading(true);
      setError(null);
      await parentServices.getChildDetails({
        onSuccess: (response) => {
          if (response.data && response.data.length > 0) {
            const child = response.data[0];
            setChildData({
              id: child.id,
              fullName: child.full_name,
              dateOfBirth: child.date_of_birth,
              gender: child.gender,
              age: child.age,
              classroom: child.classroom_name || 'غير محدد',
              classroomId: child.classroom_id,
              teacherId: child.teacher_id,
              teacherName: child.teacher_name || 'غير محدد',
              teacherEmail: child.teacher_email || '',
              teacherPhone: child.teacher_phone || '',
              documents: child.documents || [],
              emergencyContacts: child.emergency_contacts || [],
            });
          } else {
            setChildData(null);
          }
        },
        onError: (error) => {
          setError(error.message || 'فشل في تحميل بيانات الطفل');
          toast.error('فشل في تحميل بيانات الطفل');
        },
      });
    } catch (err) {
      setError('حدث خطأ غير متوقع');
      toast.error('حدث خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadDocument = (fileUrl, documentType) => {
    window.open(fileUrl, '_blank');
    toast(`جاري تحميل ${getDocumentTypeLabel(documentType)}`);
  };

  useEffect(() => {
    fetchChildData();
  }, []);

  if (loading) {
    return (
      <ParentLayout>
        <ParentLoading variant="page" text="جاري تحميل بيانات الطفل..." />
      </ParentLayout>
    );
  }

  if (error) {
    return (
      <ParentLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-display text-foreground">ملف الطفل</h1>
            <p className="text-muted-foreground">عرض وإدارة معلومات طفلك</p>
          </div>
          <ParentEmptyState
            type="child-profile"
            title="فشل في تحميل البيانات"
            description="حدث خطأ أثناء تحميل بيانات الطفل. يرجى المحاولة مرة أخرى."
          />
        </div>
      </ParentLayout>
    );
  }

  if (!childData) {
    return (
      <ParentLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-display text-foreground">ملف الطفل</h1>
            <p className="text-muted-foreground">عرض وإدارة معلومات طفلك</p>
          </div>
          <ParentEmptyState type="child-profile" />
        </div>
      </ParentLayout>
    );
  }

  return (
    <ParentLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-display text-foreground">ملف الطفل</h1>
            <p className="text-muted-foreground">عرض وإدارة معلومات طفلك</p>
          </div>
        </div>

        <Card className="rounded-2xl border-0 shadow-md overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-primary via-primary/80 to-accent" />
          <CardContent className="relative pt-0">
            <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-16 md:-mt-12">
              <Avatar className="h-32 w-32 border-4 border-card shadow-lg">
                <AvatarImage src="" alt={childData.fullName} />
                <AvatarFallback className="bg-gradient-to-br from-lavender to-mint text-4xl font-bold text-foreground">
                  <Baby className="h-16 w-16" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 pb-2">
                <h2 className="text-2xl font-bold text-foreground">{childData.fullName}</h2>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <Badge className="rounded-full bg-primary text-primary-foreground">
                    <School className="h-3 w-3 ml-1" />
                    {childData.classroom}
                  </Badge>
                  <Badge variant="secondary" className="rounded-full">
                    <Cake className="h-3 w-3 ml-1" />
                    {childData.age || calculateAge(childData.dateOfBirth)} سنوات
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
              <div>
                <label className="text-muted-foreground text-sm">الاسم الكامل</label>
                <p className="font-medium mt-1">{childData.fullName}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-muted-foreground text-sm">تاريخ الميلاد</label>
                  <p className="font-medium flex items-center gap-2 mt-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {new Date(childData.dateOfBirth).toLocaleDateString("ar-SA-u-nu-latn")}
                  </p>
                </div>
                <div>
                  <label className="text-muted-foreground text-sm">الجنس</label>
                  <p className="font-medium mt-1">{childData.gender}</p>
                </div>
              </div>
              <div>
                <label className="text-muted-foreground text-sm">العمر</label>
                <p className="font-medium mt-1">{childData.age || calculateAge(childData.dateOfBirth)} سنوات</p>
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
                <label className="text-lavender-foreground text-sm">الصف المعين</label>
                <p className="text-xl font-bold text-foreground">{childData.classroom}</p>
              </div>
              <div>
                <label className="text-muted-foreground text-sm">المعلمة الرئيسية</label>
                <p className="font-medium mt-1">{childData.teacherName}</p>
              </div>
              {childData.teacherPhone && (
                <div>
                  <label className="text-muted-foreground text-sm flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    هاتف المعلمة
                  </label>
                  <p className="font-medium mt-1">{childData.teacherPhone}</p>
                </div>
              )}
              {childData.teacherEmail && (
                <div>
                  <label className="text-muted-foreground text-sm flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    بريد المعلمة
                  </label>
                  <p className="font-medium mt-1">{childData.teacherEmail}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                المستندات
              </CardTitle>
              <CardDescription>مستندات وملفات الطفل</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {childData.documents && childData.documents.length > 0 ? (
                childData.documents.map((doc) => (
                  <div 
                    key={doc.id} 
                    className="flex items-center justify-between p-4 rounded-xl border bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{getDocumentTypeLabel(doc.document_type)}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(doc.created_at).toLocaleDateString("ar-SA-u-nu-latn")}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownloadDocument(doc.file_url, doc.document_type)}
                      className="rounded-full"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-8">لا توجد مستندات مرفوعة</p>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                جهات الاتصال للطوارئ
              </CardTitle>
              <CardDescription>للتواصل في حالات الطوارئ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {childData.emergencyContacts && childData.emergencyContacts.length > 0 ? (
                childData.emergencyContacts.map((contact, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-xl border ${
                      contact.is_primary 
                        ? "bg-mint/30 border-mint" 
                        : "bg-secondary/30 border-border"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">{contact.name}</span>
                      {contact.is_primary && (
                        <Badge className="bg-success text-success-foreground rounded-full text-xs">
                          أساسي
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{contact.relationship}</p>
                    <div className="space-y-1">
                      <p className="text-sm flex items-center gap-2">
                        <Phone className="h-3 w-3" /> {contact.phone}
                      </p>
                      <p className="text-sm flex items-center gap-2">
                        <Mail className="h-3 w-3" /> {contact.email}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  لا توجد جهات اتصال طوارئ مسجلة
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ParentLayout>
  );
}
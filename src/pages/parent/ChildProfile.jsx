import { ParentLayout } from '@/components/layout/ParentLayout.jsx';
import { useState } from 'react';
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

export default function ChildProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [childData, setChildData] = useState(initialChildData);

  const calculateAge = () => {
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
              isEditing ? setIsEditing(false) : setIsEditing(true)
            }
            className="rounded-full"
          >
            {isEditing ? (
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
                <AvatarImage src="" alt={childData.firstName} />
                <AvatarFallback className="bg-gradient-to-br from-lavender to-mint text-4xl font-bold text-foreground">
                  <Baby className="h-16 w-16" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 pb-2">
                <h2 className="text-2xl font-bold text-foreground">
                  {childData.firstName} {childData.lastName}
                </h2>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <Badge className="rounded-full bg-primary text-primary-foreground">
                    <School className="h-3 w-3 ml-1" />
                    {childData.classroom}
                  </Badge>
                  <Badge variant="secondary" className="rounded-full">
                    <Cake className="h-3 w-3 ml-1" />
                    {calculateAge(childData.dateOfBirth)} سنوات
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
                      value={childData.firstName}
                      onChange={(e) =>
                        setChildData({
                          ...childData,
                          firstName: e.target.value,
                        })
                      }
                      className="mt-1 rounded-xl"
                    />
                  ) : (
                    <p className="font-medium">{childData.firstName}</p>
                  )}
                </div>
                <div>
                  <Label className="text-muted-foreground text-sm">
                    اسم العائلة
                  </Label>
                  {isEditing ? (
                    <Input
                      value={childData.lastName}
                      onChange={(e) =>
                        setChildData({ ...childData, lastName: e.target.value })
                      }
                      className="mt-1 rounded-xl"
                    />
                  ) : (
                    <p className="font-medium">{childData.lastName}</p>
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
                    {new Date(childData.dateOfBirth).toLocaleDateString(
                      'ar-SA'
                    )}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-sm">الجنس</Label>
                  <p className="font-medium">{childData.gender}</p>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground text-sm">
                  فصيلة الدم
                </Label>
                <p className="font-medium">{childData.bloodType}</p>
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
                  {childData.classroom}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground text-sm">
                  المعلمة الرئيسية
                </Label>
                <p className="font-medium">{childData.teacher}</p>
              </div>
              <div>
                <Label className="text-muted-foreground text-sm">
                  تاريخ التسجيل
                </Label>
                <p className="font-medium">
                  {new Date(childData.enrollmentDate).toLocaleDateString(
                    'ar-SA'
                  )}
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
                    value={childData.allergies}
                    onChange={(e) =>
                      setChildData({ ...childData, allergies: e.target.value })
                    }
                    className="mt-1 rounded-xl"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {childData.allergies.split('، ').map((allergy, index) => (
                      <Badge
                        key={index}
                        variant="destructive"
                        className="rounded-full"
                      >
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <Label className="text-muted-foreground text-sm">
                  ملاحظات طبية
                </Label>
                {isEditing ? (
                  <Textarea
                    value={childData.medicalNotes}
                    onChange={(e) =>
                      setChildData({
                        ...childData,
                        medicalNotes: e.target.value,
                      })
                    }
                    className="mt-1 rounded-xl"
                    rows={3}
                  />
                ) : (
                  <p className="text-foreground mt-1 p-3 bg-secondary/50 rounded-xl">
                    {childData.medicalNotes}
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
              {emergencyContacts.map((contact, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border ${contact.isPrimary ? 'bg-mint/30 border-mint' : 'bg-secondary/30 border-border'}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{contact.name}</span>
                    {contact.isPrimary && (
                      <Badge className="bg-success text-success-foreground rounded-full text-xs">
                        أساسي
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {contact.relationship}
                  </p>
                  <div className="space-y-1">
                    <p className="text-sm flex items-center gap-2">
                      <Phone className="h-3 w-3" /> {contact.phone}
                    </p>
                    <p className="text-sm flex items-center gap-2">
                      <Mail className="h-3 w-3" /> {contact.email}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </ParentLayout>
  );
}

import { ParentLayout } from '@/components/layout/ParentLayout.jsx';
import { useState } from 'react';
import {
  FolderOpen,
  FileText,
  Upload,
  Download,
  Eye,
  File,
  FileImage,
  Heart,
  FileCheck,
  Plus,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const documentCategories = [
  { value: 'all', label: 'جميع المستندات' },
  { value: 'identification', label: 'الهوية' },
  { value: 'medical', label: 'السجلات الطبية' },
  { value: 'enrollment', label: 'التسجيل' },
  { value: 'emergency', label: 'الطوارئ' },
  { value: 'consent', label: 'نماذج الموافقة' },
];
const getDocumentIcon = () =>
  ({
    identification: <FileCheck className="h-6 w-6" />,
    medical: <Heart className="h-6 w-6" />,
    enrollment: <FileText className="h-6 w-6" />,
    emergency: <File className="h-6 w-6" />,
    consent: <FileImage className="h-6 w-6" />,
  })[type] || <File className="h-6 w-6" />;
const getTypeColor = () =>
  ({
    identification: 'bg-lavender text-lavender-foreground',
    medical: 'bg-mint text-mint-foreground',
    enrollment: 'bg-sky text-sky-foreground',
    emergency: 'bg-peach text-peach-foreground',
    consent: 'bg-secondary text-secondary-foreground',
  })[type] || 'bg-secondary text-secondary-foreground';
const getTypeLabel = () =>
  ({
    identification: 'هوية',
    medical: 'طبي',
    enrollment: 'تسجيل',
    emergency: 'طوارئ',
    consent: 'موافقة',
  })[type] || type;

export default function Documents() {
  const [filter, setFilter] = useState('all');
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const { toast } = useToast();
  const filteredDocuments =
    filter === 'all'
      ? documents
      : documents.filter((doc) => doc.type === filter);
  const handleUpload = () => {
    toast({
      title: 'تم رفع المستند! 📄',
      description: 'تم إرسال مستندك للمراجعة.',
    });
    setUploadDialogOpen(false);
  };
  const handleDownload = () => {
    toast({ title: 'بدأ التحميل', description: `جاري تحميل ${docName}...` });
  };

  return (
    <ParentLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-display text-foreground">
              المستندات 📁
            </h1>
            <p className="text-muted-foreground">إدارة مستندات ليلى المهمة</p>
          </div>
          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-full">
                <Upload className="h-4 w-4 ml-2" />
                رفع مستند
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl">
              <DialogHeader>
                <DialogTitle>رفع مستند جديد</DialogTitle>
                <DialogDescription>
                  أضف مستنداً جديداً لملف ليلى
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label>اسم المستند</Label>
                  <Input
                    placeholder="مثال: سجل التطعيمات المحدث"
                    className="mt-1.5 rounded-xl"
                  />
                </div>
                <div>
                  <Label>نوع المستند</Label>
                  <Select>
                    <SelectTrigger className="mt-1.5 rounded-xl">
                      <SelectValue placeholder="اختر النوع" />
                    </SelectTrigger>
                    <SelectContent>
                      {documentCategories.slice(1).map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>الملف</Label>
                  <div className="mt-1.5 border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      اضغط للرفع أو اسحب وأفلت
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF, JPG, PNG حتى 10MB
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 justify-end pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setUploadDialogOpen(false)}
                    className="rounded-full"
                  >
                    إلغاء
                  </Button>
                  <Button onClick={handleUpload} className="rounded-full">
                    رفع
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="rounded-2xl border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2">
              {documentCategories.map((cat) => (
                <Button
                  key={cat.value}
                  variant={filter === cat.value ? 'default' : 'outline'}
                  size="sm"
                  className="rounded-full"
                  onClick={() => setFilter(cat.value)}
                >
                  {cat.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.map((doc) => (
            <Card
              key={doc.id}
              className="rounded-2xl border-0 shadow-md hover-lift"
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`h-14 w-14 rounded-xl ${getTypeColor(doc.type)} flex items-center justify-center shrink-0`}
                  >
                    {getDocumentIcon(doc.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{doc.name}</h3>
                    <p className="text-sm text-muted-foreground capitalize">
                      {getTypeLabel(doc.type)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge
                        variant="secondary"
                        className={`rounded-full text-xs ${doc.status === 'verified' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'}`}
                      >
                        {doc.status === 'verified' ? 'موثق' : 'قيد المراجعة'}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {doc.fileSize}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4 pt-4 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 rounded-xl"
                    onClick={() => handleDownload(doc.name)}
                  >
                    <Download className="h-4 w-4 ml-1" />
                    تحميل
                  </Button>
                  <Button variant="ghost" size="sm" className="rounded-xl">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          <Card
            className="rounded-2xl border-2 border-dashed border-border shadow-none hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => setUploadDialogOpen(true)}
          >
            <CardContent className="p-4 h-full flex flex-col items-center justify-center min-h-[180px]">
              <div className="h-14 w-14 rounded-xl bg-muted flex items-center justify-center mb-3">
                <Plus className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="font-medium text-muted-foreground">
                رفع مستند جديد
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-2xl border-0 shadow-md bg-lavender/30">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <FolderOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">حافظ على تحديث المستندات</h3>
                <p className="text-sm text-muted-foreground">
                  يرجى التأكد من أن جميع المستندات الطبية والطوارئ محدثة. يجب
                  تحديث سجلات التطعيم بعد كل زيارة لطبيب الأطفال.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ParentLayout>
  );
}

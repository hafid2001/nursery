import { Calendar, FileText, Sparkles, TrendingUp } from 'lucide-react';

export const attendanceData = {
  '2024-12-02': { status: 'present', checkIn: '08:15', checkOut: '17:30' },
  '2024-12-03': { status: 'present', checkIn: '08:30', checkOut: '17:00' },
  '2024-12-04': { status: 'present', checkIn: '08:00', checkOut: '17:45' },
  '2024-12-05': { status: 'sick' },
  '2024-12-06': { status: 'sick' },
  '2024-12-09': { status: 'present', checkIn: '08:20', checkOut: '17:15' },
  '2024-12-10': { status: 'present', checkIn: '08:10', checkOut: '17:30' },
  '2024-12-11': { status: 'present', checkIn: '08:45', checkOut: '17:00' },
  '2024-12-12': { status: 'absent' },
  '2024-12-13': { status: 'present', checkIn: '08:00', checkOut: '17:30' },
  '2024-12-16': { status: 'present', checkIn: '08:15', checkOut: '17:45' },
  '2024-12-17': { status: 'present', checkIn: '08:30', checkOut: '17:00' },
  '2024-12-18': { status: 'present', checkIn: '08:05' },
};

export const initialChildData = {
  firstName: 'ليلى',
  lastName: 'محمد',
  dateOfBirth: '2020-05-15',
  gender: 'أنثى',
  bloodType: 'A+',
  allergies: 'الفول السوداني، المأكولات البحرية',
  medicalNotes: 'ربو خفيف - لديها بخاخ في الحقيبة',
  classroom: 'غرفة الشمس',
  teacher: 'أ. سارة أحمد',
  enrollmentDate: '2023-09-01',
};

export const emergencyContacts = [
  {
    name: 'فاطمة محمد',
    relationship: 'الأم',
    phone: '(555) 123-4567',
    email: 'fatima.mohammed@email.com',
    isPrimary: true,
  },
  {
    name: 'محمد أحمد',
    relationship: 'الأب',
    phone: '(555) 987-6543',
    email: 'mohammed.ahmed@email.com',
    isPrimary: false,
  },
  {
    name: 'سعاد علي',
    relationship: 'الجدة',
    phone: '(555) 456-7890',
    email: 'suad.ali@email.com',
    isPrimary: false,
  },
];

export const dailyReports = [
  {
    id: 1,
    date: '2024-12-18',
    meals: {
      breakfast: { status: 'أكل جيداً', notes: 'استمتع بالشوفان مع الفواكه' },
      lunch: { status: 'أكل قليلاً', notes: 'أكل معظم المعكرونة، ترك الخضار' },
      snack: { status: 'أحبها', notes: 'شرائح التفاح وكراكرز الجبن' },
    },
    nap: { startTime: '13:30', endTime: '15:00', quality: 'نام جيداً' },
    activities: ['فنون وحرف', 'لعب خارجي', 'وقت القصة', 'موسيقى ورقص'],
    mood: 'سعيد',
    behaviorNotes: 'ليلى كانت متعاونة جداً اليوم وساعدت في ترتيب الألعاب!',
    teacherNotes: 'يوم رائع! ليلى رسمت لوحة جميلة تجف في ركن الفن.',
  },
  {
    id: 2,
    date: '2024-12-17',
    meals: {
      breakfast: {
        status: 'أكل قليلاً',
        notes: 'أكلت الزبادي، لم تنهِ التوست',
      },
      lunch: { status: 'أكل جيداً', notes: 'أحبت قطع الدجاج!' },
      snack: { status: 'أكل جيداً', notes: 'كراكرز وعصير تفاح' },
    },
    nap: { startTime: '13:00', endTime: '14:30', quality: 'نوم متقطع' },
    activities: ['استكشاف علمي', 'لعب خارجي', 'وقت الألغاز'],
    mood: 'هادئ',
    behaviorNotes: 'متعبة قليلاً اليوم لكنها شاركت في جميع الأنشطة.',
    teacherNotes:
      'ليلى استمتعت بالنشاط العلمي - نظرنا إلى الأوراق تحت المكبرة!',
  },
];

export const childName = 'ليلى';

export const todaySummary = {
  meals: [
    { name: 'الفطور', status: 'أكل جيداً', emoji: '🥣' },
    { name: 'الغداء', status: 'أكل قليلاً', emoji: '🍝' },
    { name: 'وجبة خفيفة', status: 'أحبها', emoji: '🍎' },
  ],
  napTime: '1:30 م - 3:00 م',
  napQuality: 'نام جيداً',
  activities: ['فنون وحرف', 'لعب خارجي', 'وقت القصة'],
  mood: 'سعيد ومرح 😊',
};

export const quickStats = [
  {
    label: 'الحضور هذا الشهر',
    value: '18/20',
    percentage: 90,
    icon: Calendar,
    color: 'bg-mint',
    iconColor: 'text-mint-foreground',
  },
  {
    label: 'التقارير اليومية',
    value: '15',
    subtext: 'هذا الشهر',
    icon: FileText,
    color: 'bg-lavender',
    iconColor: 'text-lavender-foreground',
  },
  {
    label: 'الفعاليات القادمة',
    value: '2',
    subtext: 'هذا الأسبوع',
    icon: Sparkles,
    color: 'bg-peach',
    iconColor: 'text-peach-foreground',
  },
  {
    label: 'درجة التقدم',
    value: 'ممتاز',
    subtext: 'آخر تقرير',
    icon: TrendingUp,
    color: 'bg-sky',
    iconColor: 'text-sky-foreground',
  },
];

export const recentNotifications = [
  { id: 1, title: 'يوم التصوير غداً!', time: 'منذ ساعتين', type: 'reminder' },
  { id: 2, title: 'تقرير يومي جديد متاح', time: 'منذ 5 ساعات', type: 'report' },
  {
    id: 3,
    title: 'تم استلام الدفعة - شكراً لك!',
    time: 'منذ يوم',
    type: 'payment',
  },
];

export const documents = [
  {
    id: 1,
    name: 'شهادة الميلاد',
    type: 'identification',
    uploadDate: '2023-09-01',
    fileSize: '1.2 MB',
    status: 'verified',
  },
  {
    id: 2,
    name: 'سجل التطعيمات',
    type: 'medical',
    uploadDate: '2023-09-01',
    fileSize: '850 KB',
    status: 'verified',
  },
  {
    id: 3,
    name: 'بطاقة التأمين الصحي',
    type: 'medical',
    uploadDate: '2023-09-05',
    fileSize: '420 KB',
    status: 'verified',
  },
  {
    id: 4,
    name: 'اتفاقية التسجيل',
    type: 'enrollment',
    uploadDate: '2023-09-01',
    fileSize: '2.1 MB',
    status: 'verified',
  },
  {
    id: 5,
    name: 'نموذج جهات الطوارئ',
    type: 'emergency',
    uploadDate: '2023-09-01',
    fileSize: '156 KB',
    status: 'verified',
  },
  {
    id: 6,
    name: 'نموذج إذن التصوير',
    type: 'consent',
    uploadDate: '2023-09-02',
    fileSize: '98 KB',
    status: 'pending',
  },
];

export const payments = [
  {
    id: 1,
    description: 'رسوم ديسمبر 2024',
    amount: 1200,
    dueDate: '2024-12-01',
    paidDate: '2024-12-01',
    status: 'paid',
    method: 'بطاقة ائتمان',
  },
  {
    id: 2,
    description: 'رسوم يناير 2025',
    amount: 1200,
    dueDate: '2025-01-01',
    paidDate: null,
    status: 'pending',
    method: null,
  },
  {
    id: 3,
    description: 'رسوم نوفمبر 2024',
    amount: 1200,
    dueDate: '2024-11-01',
    paidDate: '2024-11-01',
    status: 'paid',
    method: 'تحويل بنكي',
  },
  {
    id: 4,
    description: 'رسوم أكتوبر 2024',
    amount: 1200,
    dueDate: '2024-10-01',
    paidDate: '2024-10-01',
    status: 'paid',
    method: 'بطاقة ائتمان',
  },
  {
    id: 5,
    description: 'رسوم سبتمبر 2024',
    amount: 1200,
    dueDate: '2024-09-01',
    paidDate: '2024-09-01',
    status: 'paid',
    method: 'بطاقة ائتمان',
  },
  {
    id: 6,
    description: 'رسوم التسجيل',
    amount: 150,
    dueDate: '2024-09-01',
    paidDate: '2024-09-01',
    status: 'paid',
    method: 'بطاقة ائتمان',
  },
];

export const progressReports = [
  {
    id: 1,
    period: 'نوفمبر 2024',
    dateRange: '1 - 30 نوفمبر 2024',
    summary:
      'ليلى أظهرت تقدماً ملحوظاً في المهارات الاجتماعية وتطور اللغة هذا الشهر.',
    categories: {
      eating: { level: 'ممتاز', score: 95, notes: 'تجرب أطعمة جديدة بسهولة' },
      sleeping: { level: 'جيد', score: 80, notes: 'جدول قيلولة منتظم' },
      social: {
        level: 'ممتاز',
        score: 90,
        notes: 'تكوّن صداقات بسهولة، تشارك الألعاب',
      },
      learning: {
        level: 'جيد جداً',
        score: 85,
        notes: 'تعرف الحروف، تعد حتى 20',
      },
      physical: {
        level: 'ممتاز',
        score: 92,
        notes: 'مهارات حركية رائعة، تحب اللعب الخارجي',
      },
    },
  },
  {
    id: 2,
    period: 'أكتوبر 2024',
    dateRange: '1 - 31 أكتوبر 2024',
    summary:
      'شهر جيد مع تحسن مستمر في جميع المجالات. ليلى تتأقلم جيداً مع روتين الصف.',
    categories: {
      eating: {
        level: 'جيد',
        score: 78,
        notes: 'لا تزال انتقائية مع الخضروات',
      },
      sleeping: {
        level: 'جيد',
        score: 75,
        notes: 'تتأقلم مع جدول القيلولة الجديد',
      },
      social: { level: 'جيد جداً', score: 85, notes: 'تلعب جيداً مع الآخرين' },
      learning: { level: 'جيد', score: 80, notes: 'تتعلم الحروف والأرقام' },
      physical: { level: 'جيد جداً', score: 88, notes: 'نشيطة ومتناسقة' },
    },
  },
];

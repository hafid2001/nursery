
import { z } from 'zod';

export const ParentInfoSchema = z.object({
  full_name: z
    .string()
    .min(2, 'الاسم يجب أن يكون على الأقل حرفين')
    .max(100, 'الاسم طويل جدًا'),

  email: z.string().email('البريد الإلكتروني غير صحيح'),

  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),

  phone: z
    .string()
    .min(10, 'رقم الهاتف قصير جدًا')
    .max(15, 'رقم الهاتف طويل جدًا'),
});



export const LoginSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
});




export const ChildInfoSchema = z.object({
  full_name: z
    .string()
    .min(2, 'اسم الطفل يجب أن يكون على الأقل حرفين')
    .max(100, 'اسم الطفل طويل جدًا'),

  age: z
    .number({
      invalid_type_error: 'العمر يجب أن يكون رقمًا',
    })
    .min(4, 'عمر الطفل يجب ألا يقل عن 4 سنوات')
    .max(12, 'عمر الطفل يجب ألا يزيد عن 12 سنة'),

  gender: z.enum(['male', 'female'], {
    errorMap: () => ({ message: 'الرجاء اختيار الجنس' }),
  }),

  date_of_birth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'صيغة تاريخ الميلاد غير صحيحة (YYYY-MM-DD)'),
});


export const DocumentsSchema = z.array(
  z.object({
    document_type: z.enum(['birth_certificate', 'medical_form'], {
      errorMap: () => ({ message: 'نوع الوثيقة غير صالح' }),
    }),
    file_url: z.string().url('رابط الملف غير صحيح'),
  }),
  {
    required_error: 'يجب رفع الوثائق المطلوبة',
    invalid_type_error: 'صيغة الوثائق غير صحيحة',
  }
);



export const ParentSignUpSchema = z.object({
  full_name: z
    .string()
    .min(2, 'الاسم الكامل يجب أن يكون على الأقل حرفين')
    .max(100, 'الاسم الكامل طويل جدًا'),

  email: z.string().email('البريد الإلكتروني غير صالح'),

  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),

  phone: z
    .string()
    .min(10, 'رقم الهاتف قصير جدًا')
    .max(15, 'رقم الهاتف طويل جدًا'),

  child: ChildInfoSchema,

  documents: DocumentsSchema,
});

import { z } from 'zod';

export const TeacherBaseSchema = z.object({
  full_name: z
    .string()
    .min(2, 'الاسم يجب أن يكون على الأقل حرفين')
    .max(100, 'الاسم طويل جدًا'),

  email: z.string().email('البريد الإلكتروني غير صحيح'),
  phone: z
    .string()
    .min(10, 'رقم الهاتف قصير جدًا')
    .max(15, 'رقم الهاتف طويل جدًا'),
  role: z.enum(['معلمة رئيسية', 'معلمة مساعدة'], {
    errorMap: () => ({ message: 'الرجاء اختيار الدور الصحيح' }),
  }),
  status: z.enum(['ACTIVE', 'UNACTIVE'], {
    errorMap: () => ({ message: 'الرجاء اختيار الحالة الصحيحة' }),
  }),
});

export const AddTeacherSchema = z.object({
  full_name: z
    .string()
    .min(2, 'الاسم يجب أن يكون على الأقل حرفين')
    .max(100, 'الاسم طويل جدًا'),

  email: z.string().email('البريد الإلكتروني غير صحيح'),

  phone: z
    .string()
    .min(10, 'رقم الهاتف قصير جدًا')
    .max(15, 'رقم الهاتف طويل جدًا'),

  password: z
    .string()
    .min(8, 'كلمة المرور يجب أن تكون على الأقل 8 أحرف')
    .max(100, 'كلمة المرور طويلة جدًا'),

  status: z.enum(['ACTIVE', 'UNACTIVE'], {
    errorMap: () => ({ message: 'الرجاء اختيار الحالة الصحيحة' }),
  }),
});

export const EditTeacherSchema = z.object({
  full_name: z
    .string()
    .min(2, 'الاسم يجب أن يكون على الأقل حرفين')
    .max(100, 'الاسم طويل جدًا'),

  email: z.string().email('البريد الإلكتروني غير صحيح'),

  phone: z
    .string()
    .min(10, 'رقم الهاتف قصير جدًا')
    .max(15, 'رقم الهاتف طويل جدًا'),

  status: z.enum(['ACTIVE', 'UNACTIVE'], {
    errorMap: () => ({ message: 'الرجاء اختيار الحالة الصحيحة' }),
  }),
});

export const TeacherWithClassroomSchema = TeacherBaseSchema.extend({
  classroom: z.string().min(1, 'يجب اختيار الفصل'),
});



// Add to admin.schema.js
export const ClassroomSchema = z.object({
  name: z.string().min(2, 'اسم الفصل يجب أن يكون حرفين على الأقل'),
  age_group: z.string().min(1, 'يرجى اختيار الفئة العمرية'),
  capacity: z.coerce.number().min(1, 'السعة يجب أن تكون 1 على الأقل'),
  teacherId: z.string().min(1, 'يرجى اختيار المعلمة '),
});


export const UpdateClassroomSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  age_group: z.string().optional(),
  capacity: z.coerce.number().optional(),
  teacherId: z.string().optional(),
});

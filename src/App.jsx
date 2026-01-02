import '@fontsource/nunito/400.css';
import '@fontsource/nunito/600.css';
import '@fontsource/nunito/700.css';
import '@fontsource/quicksand/500.css';
import '@fontsource/quicksand/700.css';

import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/parent/Dashboard';
import ChildProfile from './pages/parent/ChildProfile';
import DailyReports from './pages/parent/DailyReports';
import ProgressReports from './pages/parent/ProgressReports';
import Attendance from './pages/parent/Attendance';
import Documents from './pages/parent/Documents';
import Payments from './pages/parent/Payments';
import NotFound from './pages/parent/NotFound';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminTeachers from './pages/admin/AdminTeachers';
import AdminClassrooms from './pages/admin/AdminClassrooms';
import AdminReports from './pages/admin/AdminReports';
import AdminPayments from './pages/admin/AdminPayments';
import AdminAnnouncements from './pages/admin/AdminAnnouncements';
import AdminSettings from './pages/admin/AdminSettings';
import ParentRegistration from './pages/Registration/ParentRegistration';
import LoginPage from './pages/Registration/LoginPage';
import { AuthProvider } from './context/auth.context';
import RoleBasedRoute from './pages/Registration/RoleBasedRoute';
import { Toaster } from 'react-hot-toast';
import CompletePayment from './pages/Registration/CheckOut';
import PaymentSuccessGuard from './pages/Registration/PaymentSuccessGuard';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<div>google</div>} />
            <Route path="/register" element={<ParentRegistration />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Parent Routes */}
            <Route
              path="/parent"
              element={
                <RoleBasedRoute allowedRoles={['parent']}>
                  <Dashboard />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/parent/child-profile"
              element={
                <RoleBasedRoute allowedRoles={['parent']}>
                  <ChildProfile />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/parent/daily-reports"
              element={
                <RoleBasedRoute allowedRoles={['parent']}>
                  <DailyReports />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/parent/progress-reports"
              element={
                <RoleBasedRoute allowedRoles={['parent']}>
                  <ProgressReports />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/parent/attendance"
              element={
                <RoleBasedRoute allowedRoles={['parent']}>
                  <Attendance />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/parent/documents"
              element={
                <RoleBasedRoute allowedRoles={['parent']}>
                  <Documents />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/parent/payments"
              element={
                <RoleBasedRoute allowedRoles={['parent']}>
                  <Payments />
                </RoleBasedRoute>
              }
            />

            {/*  
            <Route
              path="/teacher"
              element={
                <RoleBasedRoute allowedRoles={['teacher']}>
                  <TeacherDashboard />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/teacher/classroom"
              element={
                <RoleBasedRoute allowedRoles={['teacher']}>
                  <TeacherClassroom />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/teacher/daily-reports"
              element={
                <RoleBasedRoute allowedRoles={['teacher']}>
                  <TeacherDailyReports />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/teacher/attendance"
              element={
                <RoleBasedRoute allowedRoles={['teacher']}>
                  <TeacherAttendance />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/teacher/progress-reports"
              element={
                <RoleBasedRoute allowedRoles={['teacher']}>
                  <TeacherProgressReports />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/teacher/messages"
              element={
                <RoleBasedRoute allowedRoles={['teacher']}>
                  <TeacherMessages />
                </RoleBasedRoute>
              }
            />
            */}
            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <RoleBasedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <RoleBasedRoute allowedRoles={['admin']}>
                  <AdminUsers />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/admin/teachers"
              element={
                <RoleBasedRoute allowedRoles={['admin']}>
                  <AdminTeachers />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/admin/classrooms"
              element={
                <RoleBasedRoute allowedRoles={['admin']}>
                  <AdminClassrooms />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/admin/reports"
              element={
                <RoleBasedRoute allowedRoles={['admin']}>
                  <AdminReports />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/admin/payments"
              element={
                <RoleBasedRoute allowedRoles={['admin']}>
                  <AdminPayments />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/admin/announcements"
              element={
                <RoleBasedRoute allowedRoles={['admin']}>
                  <AdminAnnouncements />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <RoleBasedRoute allowedRoles={['admin']}>
                  <AdminSettings />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/complete-payment"
              element={
                <RoleBasedRoute allowedRoles={['parent']}>
                  <CompletePayment />
                </RoleBasedRoute>
              }
            />

            <Route
              path="/payment/success"
              element={
                <PaymentSuccessGuard>
                  <PaymentSuccess />
                </PaymentSuccessGuard>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>google</div>} />
          <Route path="/register" element={<ParentRegistration />} />
          {/* Parent Routes */}
          <Route path="/parent" element={<Dashboard />} />
          <Route path="/child-profile" element={<ChildProfile />} />
          <Route path="/daily-reports" element={<DailyReports />} />
          <Route path="/progress-reports" element={<ProgressReports />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/payments" element={<Payments />} />

          {/* 
          
          
            <Route path="/teacher" element={<TeacherDashboard />} />
            <Route path="/teacher/classroom" element={<TeacherClassroom />} />
            <Route path="/teacher/daily-reports" element={<TeacherDailyReports />} />
            <Route path="/teacher/attendance" element={<TeacherAttendance />} />
            <Route path="/teacher/progress-reports" element={<TeacherProgressReports />} />
            <Route path="/teacher/messages" element={<TeacherMessages />} />
          
          
          */}

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/teachers" element={<AdminTeachers />} />
          <Route path="/admin/classrooms" element={<AdminClassrooms />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/payments" element={<AdminPayments />} />
          <Route path="/admin/announcements" element={<AdminAnnouncements />} />
          <Route path="/admin/settings" element={<AdminSettings />} />

          {/* Public Website */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

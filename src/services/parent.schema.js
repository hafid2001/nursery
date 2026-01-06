import { ParentServices } from '@/schemas/parent.schema';

// Parent Services - Service layer for Parent-related API calls
// This file contains all Parent-related API calls and uses the existing QueryHandler class
// It has NO UI logic and returns clean backend data only

export const parentServices = {
  // Get child details for the authenticated parent
  getChildDetails: (callbacks = {}) => ParentServices.getChildDetails(callbacks),

  // Get latest daily report for the authenticated parent
  getLatestDailyReport: (callbacks = {}) => ParentServices.getLatestDailyReport(callbacks),

  // Get attendance reports grouped by month for the authenticated parent
  getAttendanceReports: (callbacks = {}) => ParentServices.getAttendanceReports(callbacks),

  // Get latest attendance report for the authenticated parent
  getLatestAttendanceReport: (callbacks = {}) => ParentServices.getLatestAttendanceReport(callbacks),

  // Get daily reports with pagination for the authenticated parent
  getDailyReports: (page = 1, callbacks = {}) => ParentServices.getDailyReports(page, callbacks),

  // Get progress reports with pagination for the authenticated parent
  getProgressReports: (page = 1, callbacks = {}) => ParentServices.getProgressReports(page, callbacks),

  // Request child profile change for admin approval
  requestChildProfileChange: (childId, payload, callbacks = {}) =>
    ParentServices.requestChildProfileChange(childId, payload.field, payload.newValue, callbacks),

  // Create checkout session for payments
  createCheckoutSession: (payload, callbacks = {}) => ParentServices.createCheckoutSession(payload, callbacks),
};

import api from '@/lib/QueryHandler';

// Parent Services using QueryHandler
export const ParentServices = {
  // Get child details for the authenticated parent
  getChildDetails: async (callbacks = {}) => {
    return api.request('/parent/child-details', {
      onStart: callbacks.onStart,
      onSuccess: callbacks.onSuccess,
      onError: callbacks.onError,
      onFinal: callbacks.onFinal,
    });
  },

  // Get latest daily report for the authenticated parent
  getLatestDailyReport: async (callbacks = {}) => {
    return api.request('/parent/daily-report', {
      onStart: callbacks.onStart,
      onSuccess: callbacks.onSuccess,
      onError: callbacks.onError,
      onFinal: callbacks.onFinal,
    });
  },

  // Get latest attendance report for the authenticated parent
  getLatestAttendanceReport: async (callbacks = {}) => {
    return api.request('/parent/attendance-report', {
      onStart: callbacks.onStart,
      onSuccess: callbacks.onSuccess,
      onError: callbacks.onError,
      onFinal: callbacks.onFinal,
    });
  },

  // Get attendance reports grouped by month for the authenticated parent
  getAttendanceReports: async (callbacks = {}) => {
    return api.request('/parent/attendance-reports', {
      onStart: callbacks.onStart,
      onSuccess: callbacks.onSuccess,
      onError: callbacks.onError,
      onFinal: callbacks.onFinal,
    });
  },

  // Get daily reports with pagination for the authenticated parent
  getDailyReports: async (page = 1, callbacks = {}) => {
    return api.request(`/parent/daily-reports?page=${page}`, {
      onStart: callbacks.onStart,
      onSuccess: callbacks.onSuccess,
      onError: callbacks.onError,
      onFinal: callbacks.onFinal,
    });
  },

  // Get progress reports with pagination for the authenticated parent
  getProgressReports: async (callbacks = {}) => {
    return api.request(`/parent/progress-reports`, {
      onStart: callbacks.onStart,
      onSuccess: callbacks.onSuccess,
      onError: callbacks.onError,
      onFinal: callbacks.onFinal,
    });
  },

  // Get parent information for the authenticated parent
  getMyInformation: async (callbacks = {}) => {
    return api.request('/parent/my-information', {
      onStart: callbacks.onStart,
      onSuccess: callbacks.onSuccess,
      onError: callbacks.onError,
      onFinal: callbacks.onFinal,
    });
  },

  // Get attendance statistics for the authenticated parent's children
  getChildrenAttendanceStats: async (callbacks = {}) => {
    return api.request('/parent/attendance-stats', {
      onStart: callbacks.onStart,
      onSuccess: callbacks.onSuccess,
      onError: callbacks.onError,
      onFinal: callbacks.onFinal,
    });
  },

  // Request child profile change for admin approval
  requestChildProfileChange: async (childId, field, newValue, callbacks = {}) => {
    return api.request(`/parent/${childId}/request-child-profile-change`, {
      method: 'POST',
      body: JSON.stringify({ field, newValue }),
      onStart: callbacks.onStart,
      onSuccess: callbacks.onSuccess,
      onError: callbacks.onError,
      onFinal: callbacks.onFinal,
    });
  },

  // Create checkout session for payments
  createCheckoutSession: async (payload, callbacks = {}) => {
    return api.request('/parent/checkout-session', {
      method: 'POST',
      body: JSON.stringify(payload),
      onStart: callbacks.onStart,
      onSuccess: callbacks.onSuccess,
      onError: callbacks.onError,
      onFinal: callbacks.onFinal,
    });
  },
};

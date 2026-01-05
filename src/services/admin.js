import api from '@/lib/QueryHandler';

export const getParentList = async (
  status,
  page,
  { onStart, onSuccess, onError, onFinal } = {}
) => {
  const queryParams = new URLSearchParams({
    page: page?.toString() || '1',
  });

  if (status && status !== 'all') {
    queryParams.append('status', status);
  }

  return api.request(
    `/admin/filtered-parent-list?${queryParams.toString()}`,
    {
      onStart,
      onSuccess,
      onError,
      onFinal,
    },
    {
      method: 'GET',
    }
  );
};

export const addParent = async (
  payload,
  { onStart, onSuccess, onError, onFinal } = {}
) => {
  return api.request(
    `/admin/parent/create`,
    {
      onStart,
      onSuccess,
      onError,
      onFinal,
    },
    {
      method: 'POST',
      body: JSON.stringify(payload),
    }
  );
};

export const approve = async (
  parent_id,
  { onStart, onSuccess, onError, onFinal } = {}
) => {
  return api.request(
    `/admin/parent/${parent_id}/approve`,
    {
      onStart,
      onSuccess,
      onError,
      onFinal,
    },
    {
      method: 'PUT',
    }
  );
};

export const reject = async (
  parent_id,
  { onStart, onSuccess, onError, onFinal } = {}
) => {
  return api.request(
    `/admin/parent/${parent_id}/approve`,
    {
      onStart,
      onSuccess,
      onError,
      onFinal,
    },
    {
      method: 'PUT',
    }
  );
};

export const getTeacherList = async (
  status,
  page,
  { onStart, onSuccess, onError, onFinal } = {}
) => {
  const queryParams = new URLSearchParams({
    page: page?.toString() || '1',
  });

  if (status && status !== 'all') {
    queryParams.append('status', status);
  }

  return api.request(
    `/admin/filtered-teacher-list?${queryParams.toString()}`,
    {
      onStart,
      onSuccess,
      onError,
      onFinal,
    },
    {
      method: 'GET',
    }
  );
};

export const addTeacher = async (
  payload,
  { onStart, onSuccess, onError, onFinal } = {}
) => {
  return api.request(
    `/admin/teacher/create`,
    {
      onStart,
      onSuccess,
      onError,
      onFinal,
    },
    {
      method: 'POST',
      body: JSON.stringify(payload),
    }
  );
};

export const updateTeacher = async (
  teacher_id,
  payload,
  { onStart, onSuccess, onError, onFinal } = {}
) => {
  return api.request(
    `/admin/teacher/${teacher_id}`,
    {
      onStart,
      onSuccess,
      onError,
      onFinal,
    },
    {
      method: 'PUT',
      body: JSON.stringify(payload),
    }
  );
};


export const getClassroomList = async (
  { onStart, onSuccess, onError, onFinal } = {}
) => {
  return api.request(
    `/admin/classroom`,
    {
      onStart,
      onSuccess: (data) => {
        onSuccess(data.data);
      },
      onError,
      onFinal,
    },
    { method: 'GET' }
  );
};


export const getClassroomStudents = async (
  classroomId,
  { onStart, onSuccess, onError, onFinal } = {}
) => {
  return api.request(
    `/admin/classrooms/${classroomId}/students`,
    { onStart, onSuccess, onError, onFinal },
    { method: 'GET' }
  );
};

export const addClassroom = async (
  payload,
  { onStart, onSuccess, onError, onFinal } = {}
) => {
  return api.request(
    `/admin/classroom/create`,
    { onStart, onSuccess, onError, onFinal },
    { method: 'POST', body: JSON.stringify(payload) }
  );
};

export const updateClassroom = async (
  classroomId,
  payload,
  { onStart, onSuccess, onError, onFinal } = {}
) => {
  return api.request(
    `/admin/classroom/${classroomId}`,
    { onStart, onSuccess, onError, onFinal },
    { method: 'PUT', body: JSON.stringify(payload) }
  );
};

export const getDashboardStats = async (
  { onStart, onSuccess, onError, onFinal } = {}
) => {
  return api.request(
    `/stats/admin/dashboard`,
    { onStart, onSuccess, onError, onFinal },
    { method: 'GET' }
  );
};


export const getRecentActivities = async (
  { onStart, onSuccess, onError, onFinal } = {}
) => {
  return api.request(
    `/stats/admin/recent-activities`,
    { onStart, onSuccess, onError, onFinal },
    { method: 'GET' }
  );
};

export const getPendingActions = async (
  { onStart, onSuccess, onError, onFinal } = {}
) => {
  return api.request(
    `/stats/admin/pending-actions`,
    { onStart, onSuccess, onError, onFinal },
    { method: 'GET' }
  );
};

export const getClassroomStats = async (
  { onStart, onSuccess, onError, onFinal } = {}
) => {
  return api.request(
    `/stats/admin/classroom`,
    {
      onStart,
      onSuccess: (data) => {
        onSuccess(data.data);
      },
      onError,
      onFinal,
    },
    {
      method: 'GET',
    }
  );
};

export const getTeacherStats = async (
  { onStart, onSuccess, onError, onFinal } = {}
) => {
  return api.request(
    `/stats/admin/teacher`,
    {
      onStart,
      onSuccess: (data) => {
        onSuccess(data.data);
      },
      onError,
      onFinal,
    },
    {
      method: 'GET',
    }
  );
};

export const getPaymentsList = async (
  status,
  page,
  searchQuery,
  { onStart, onSuccess, onError, onFinal } = {}
) => {
  const queryParams = new URLSearchParams({
    page: page?.toString() || '1',
  });

  if (status && status !== 'all') {
    queryParams.append('status', status);
  }

  if (searchQuery) {
    queryParams.append('search', searchQuery);
  }

  return api.request(
    `/admin/payments?${queryParams.toString()}`,
    {
      onStart,
      onSuccess: (data) => {
        const transformedData = data.data.map((payment) => ({
          id: payment.id,
          invoiceNumber: payment.invoiceNumber || `INV-${String(payment.id).padStart(3, '0')}`,
          parentName: payment.parentName,
          amount: payment.amount,
          currency: payment.currency,
          dueDate: payment.dueDate,
          paymentDate: payment.paymentDate,
          status: payment.status,
          paymentMethod: payment.paymentMethod === 'credit_card' ? 'بطاقة ائتمان' : 'تحويل بنكي',
        }));
        onSuccess({
          data: transformedData,
          totalCount: data.totalCount,
          currentPage: data.currentPage,
          totalPages: data.totalPages,
        });
      },
      onError,
      onFinal,
    },
    {
      method: 'GET',
    }
  );
};
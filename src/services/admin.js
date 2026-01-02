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

export const addParent = async(
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
        body : JSON.stringify(payload)
      }
    );
}


export const approve = async(
  parent_id,
  {onStart , onSuccess , onError , onFinal} = {}
) => {
  return api.request(
    `/admin/parent/${parent_id}/approve`,
    {
      onStart,
      onSuccess,
      onError,
      onFinal
    },
    {
      method : 'PUT',
    }
  )
}


export const reject = async(
  parent_id,
  {onStart , onSuccess , onError , onFinal} = {}
) => {
  return api.request(
    `/admin/parent/${parent_id}/approve`,
    {
      onStart,
      onSuccess,
      onError,
      onFinal
    },
    {
      method : 'PUT',
    }
  )
}
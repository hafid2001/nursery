/**
 * Handles HTTP status codes with a callback
 * @param {number} status - HTTP status code
 * @param {function} callback - function to call when handling this status
 */
export function handleStatus(status, callback) {
  if (typeof callback !== 'function') {
    throw new Error('Callback must be a function');
  }

  switch (status) {
    case 200:
    case 201:
      callback('Success', status);
      break;
    case 400:
      callback('Bad Request', status);
      break;
    case 401:
      callback('Unauthorized', status);
      break;
    case 403:
      callback('Forbidden', status);
      break;
    case 404:
      callback('Not Found', status);
      break;
    case 500:
      callback('Server Error', status);
      break;
    default:
      callback('Unexpected Error', status);
      break;
  }
}

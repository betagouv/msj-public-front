import {
  useState, useCallback, useRef, useEffect,
} from 'react';
import axios, { Method } from 'axios';

const useHttpClient = () => {
  const [error, setError] = useState < { message: string, name: string } | null >(null);
  const [loading, setIsLoading] = useState(false);

  const httpRequests = useRef([]);

  const sendRequest = useCallback(async (url, method: Method = 'GET', body = null, headers = {}) => {
    setIsLoading(true);
    const httpAbortCtrl = new AbortController();
    httpRequests.current.push(httpAbortCtrl);

    try {
      const res = await axios.request({
        url,
        method,
        data: body,
        headers,
        signal: httpAbortCtrl.signal,
      });

      // Make sure we do not cancel requests which are already completed
      httpRequests.current = httpRequests.current.filter((reqCtrl) => reqCtrl !== httpAbortCtrl);

      setIsLoading(false);
      return res.data;
    } catch (err) {
      // We don't care about errors thrown by the abortControllers
      if (err.name === 'AbortError') {
        return false;
      }
      setIsLoading(false);
      throw err;
    }
  }, []);

  const clearError = () => {
    setError(null);
  };

  useEffect(
    () => () => {
      // Clear ongoing requests when component unmounts
      httpRequests.current.forEach((abortCtrl) => {
        abortCtrl.abort();
      });
    },

    [],
  );

  return {
    loading, error, sendRequest, clearError,
  };
};

export default useHttpClient;

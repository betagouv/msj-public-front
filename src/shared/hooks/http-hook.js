import {
  useState, useCallback, useRef, useEffect,
} from 'react';

const useHttpClient = () => {
  const [error, setError] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const httpRequests = useRef([]);

  const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setIsLoading(true);
    const httpAbortCtrl = new AbortController();
    httpRequests.current.push(httpAbortCtrl);

    let resData;

    try {
      const res = await fetch(url, {
        method,
        body,
        headers,
        signal: httpAbortCtrl.signal,
      });

      resData = await res.json();

      // Make sure we do not cancel requests which are already completed
      httpRequests.current = httpRequests.current.filter((reqCtrl) => reqCtrl !== httpAbortCtrl);

      if (!res.ok) {
        throw Error(resData.message);
      }
      setIsLoading(false);
      return resData;
    } catch (err) {
      // We don't care about errors thrown by the abortControllers
      if (err.name !== 'AbortError') {
        setError(err);
        setIsLoading(false);
        throw err;
      }
      return false;
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

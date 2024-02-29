import {
  useState, useCallback, useRef, useEffect,
} from 'react';
import axios, { AxiosRequestConfig, HttpStatusCode, Method } from 'axios';
import { useAuth } from './auth-hook';

interface HttpRequestParam {
  url: string;
  method?: Method;
  body?: any,
  errorWhiteList?: HttpStatusCode[],
  headers?: AxiosRequestConfig['headers']
}

interface HttpError {
  message: string,
  name: string,
  code: HttpStatusCode
}

interface HttpResponse {
  error?: HttpError;
  data?: any;
}

const defaultRequest: Partial<HttpRequestParam> = {
  method: 'GET',
  body: null,
  headers: {},
  errorWhiteList: [],
};

const useHttpClient = () => {
  const [error, setError] = useState < HttpError | null>(null);
  const [loading, setIsLoading] = useState(false);
  const { logout } = useAuth();
  const httpRequests = useRef([]);

  const sendRequest = useCallback(async (request: HttpRequestParam): Promise<HttpResponse> => {
    const {
      url, method, body, headers, errorWhiteList,
    } = { ...defaultRequest, ...request };
    setIsLoading(true);
    const httpAbortCtrl = new AbortController();
    httpRequests.current.push(httpAbortCtrl);

    try {
      const { data } = await axios.request({
        url,
        method,
        data: body,
        headers,
        signal: httpAbortCtrl.signal,
      });

      // Make sure we do not cancel requests which are already completed
      httpRequests.current = httpRequests.current.filter((reqCtrl) => reqCtrl !== httpAbortCtrl);

      setIsLoading(false);
      return { data };
    } catch (err) {
      setIsLoading(false);
      if (err.response?.status === HttpStatusCode.Unauthorized) {
        logout();
      }
      const errData = {
        name: err.name,
        message: err.response?.data?.message || null,
        code: err.response?.status,
      };
      // We don't care about errors thrown by the abortControllers
      if (err.name === 'CanceledError') {
        return { error: errData };
      }

      if (errorWhiteList.includes(err.response?.status)) {
        throw err;
      } else {
        setError(errData);
      }

      return { error: errData };
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

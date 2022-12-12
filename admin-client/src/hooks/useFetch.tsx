import { useState, useEffect } from 'react';
import { Tile } from '../types/apiTypes';

export function useFetch(request?: RequestInfo, init?: RequestInit) {
  const [response, setResponse] = useState<Tile[] | null>(null);
  const [error, setError] = useState<Error | null>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const baseUrl = 'http://localhost:9001';
    const abortController = new AbortController();
    setIsLoading(true);
    (async () => {
      try {
        if (request) {
          const response = await fetch(`baseUrl/${request}`, {
            ...init,
            signal: abortController.signal,
          });
          setResponse(await response?.json());
          setIsLoading(false);
        } else {
          const response = await fetch(baseUrl, {
            ...init,
            signal: abortController.signal,
          });
          setResponse(await response?.json());
          setIsLoading(false);
        }
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          setError(error);
          return;
        }
        setIsLoading(false);
      }
    })();
    return () => {
      abortController.abort();
    };
  }, [init, request]);

  return { response, error, isLoading };
}

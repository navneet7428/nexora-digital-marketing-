import { useState, useEffect, useRef } from 'react';

export function useFetch(fetchFn, deps = []) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const isMounted = useRef(true);

  const run = () => {
    setLoading(true);
    setError(null);
    fetchFn()
      .then(d  => { if (isMounted.current) { setData(d); setLoading(false); } })
      .catch(e => { if (isMounted.current) { setError(e.message); setLoading(false); } });
  };

  useEffect(() => {
    isMounted.current = true;
    run();
    return () => { isMounted.current = false; };
  }, deps);

  return { data, loading, error, refetch: run };
}

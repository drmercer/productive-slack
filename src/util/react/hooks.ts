import { useEffect, useState } from "react";

export function useAsyncGetter<T>(asyncGet: () => Promise<NonNullable<T>>): [data: T | undefined, error: unknown] {
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<unknown>(undefined);

  useEffect(() => {
    asyncGet().then((data: T) => {
      console.log('loaded', { data })
      setData(data)
      setError(undefined)
    }, error => {
      setData(undefined)
      setError(error)
    })
    return () => {
      setData(undefined)
      setError(undefined);
    }
  }, [asyncGet])

  return [data, error];
}

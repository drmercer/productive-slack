import { useEffect, useState } from "react";

export function useAsyncGetter<T>(
  asyncGet: () => Promise<NonNullable<T>>,
): [data: T | undefined, error: unknown, refresh: () => void] {
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<unknown>(undefined);

  const clear = () => {
    setData(undefined)
    setError(undefined);
  }

  const refresh = () => {
    clear();
    asyncGet().then((data: T) => {
      setData(data)
      setError(undefined)
    }, error => {
      setData(undefined)
      setError(error)
    })
  }

  useEffect(() => {
    refresh();
    return clear;
  }, [asyncGet])

  return [data, error, refresh];
}

export function useTime() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    });
    return () => clearInterval(interval);
  })
  return time;
}

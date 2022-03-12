import { useEffect, useState } from "react";

function useTime() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    });
    return () => clearInterval(interval);
  })
  return time;
}

export const App = () => {
  const time = useTime();
  return <div className="App">Yeet! {time.toISOString()}</div>
}


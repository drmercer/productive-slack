import { computeFocusedStats } from "../store/analytics";
import { getEvents } from "../store/store";
import { useAsyncGetter } from "../util/react/hooks";

export const App = () => {
  const [events, error] = useAsyncGetter(getEvents);

  const stats = events && computeFocusedStats(events);
  return <div className="App">
    {events ? <>
      <p>Slack was opened {stats.count} times</p>
      <p>Slack was active for {Math.round(stats.totalMs / 6000) / 10} minutes</p>
      <p>({stats.totalMs})</p>
    </> :
      error ? <>Error: </> :
        <>Loading...</>}
  </div>
}


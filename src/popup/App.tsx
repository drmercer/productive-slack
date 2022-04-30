import { computeFocusedStats, getTodaysEvents } from "../store/analytics";
import { getEvents } from "../store/store";
import { useAsyncGetter } from "../util/react/hooks";

export const App = () => {
  const [events, error] = useAsyncGetter(getEvents);

  const filteredEvents = events && getTodaysEvents(events);
  const stats = filteredEvents && computeFocusedStats(filteredEvents);
  return <div className="App">
    {filteredEvents ? <>
      <p>Slack was opened {stats.count} times today.</p>
      <p>Slack was active for {Math.round(stats.totalMs / 6000) / 10} minutes ({stats.totalMs}ms) today.</p>
    </> :
      error ? <>Error: </> :
        <>Loading...</>}
  </div>
}


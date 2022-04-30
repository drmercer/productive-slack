import { computeFocusedStats, getTodaysEvents } from "../store/analytics";
import { getEvents } from "../store/store";
import { useAsyncGetter } from "../util/react/hooks";
import { niceDurationString } from "../util/time";

export const PopupApp = () => {
  const [events, error] = useAsyncGetter(getEvents);

  const filteredEvents = events && getTodaysEvents(events);
  const stats = filteredEvents && computeFocusedStats(filteredEvents);
  return <div className="App">
    {filteredEvents ? <>
      <p>Slack was opened {stats.count} times today.</p>
      <p>Slack was active for {niceDurationString(stats.totalMs)} today.</p>
      <p>Each session lasted {niceDurationString(stats.avgMs)} on average.</p>
    </> :
      error ? <>Error: </> :
        <>Loading...</>}
  </div>
}


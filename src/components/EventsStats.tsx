import { useMemo } from "react";
import { getTodaysEvents, getDurationStats, getFocusedDurations } from "../store/analytics";
import { PEvent } from "../store/event"
import { niceDurationString } from "../util/time";

export const EventsStats = ({ events }: { events: PEvent[] }) => {

  const nowMs = useMemo(() => Date.now(), []);
  const filteredEvents = getTodaysEvents(events);
  const durations = getFocusedDurations(filteredEvents);
  const stats = getDurationStats(durations);
  const timeSinceFirstDurationMs = nowMs - durations[0]?.start.timestamp.getTime()

  return <>
    <p>Slack was opened <strong>{stats.count} times</strong> today (over the past {niceDurationString(timeSinceFirstDurationMs)}).</p>
    <p>Slack was active for <strong>{niceDurationString(stats.totalMs)}</strong> today.</p>
    <p>Each session lasted {niceDurationString(stats.avgMs)} on average.</p>
  </>
}

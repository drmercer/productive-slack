import { getFocusedDurations, getDurationMagnitudeMs } from "../store/analytics";
import { getEvents, nukeAllEvents } from "../store/store";
import { useTime, useAsyncGetter } from "../util/react/hooks";
import { niceDurationString } from "../util/time";
import { PopupApp } from "./PopupApp";

export const Debug = () => {
  const time = useTime();
  const [events, , refresh] = useAsyncGetter(getEvents);
  const durations = events && getFocusedDurations(events);

  return <div>
    <div>
      <details open>
        <summary>Event debugger:</summary>
        <button onClick={refresh}>Refresh</button>
        <button onClick={nukeAllEvents}>Clear events</button>
        <p>Events:</p>
        <ul>
          {events?.map((e, i) => {
            const di = durations.findIndex(d => d.start === e || d.end === e);
            const d = durations[di];
            const isStart = d?.start === e;
            const isEnd = d?.end === e;
            const magnitude = d ? niceDurationString(getDurationMagnitudeMs(d)) : '';
            return <li style={{
              color: isStart ? 'red' : isEnd ? 'green' : '',
            }} key={String(i)}>
              {JSON.stringify(e) + ' ' + (d ? `index:${di}` : '') + ' ' + magnitude}
            </li>
          })}
        </ul>
        <p>Durations:</p>
        <ul>
          {durations?.map((d, i) => {
            return <li key={String(i)}>{niceDurationString(getDurationMagnitudeMs(d))} ({JSON.stringify(d)})</li>
          })}
        </ul>
        <p>
          Current time: {time.toString()}
        </p>
      </details>
    </div>
    <h1>Popup preview (static - does not refresh)</h1>
    <div className="OptionsApp-popup-preview">
      <PopupApp></PopupApp>
    </div>
  </div>
}

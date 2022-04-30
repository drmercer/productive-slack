import { PopupApp } from "./PopupApp";
import "../css/popup.css";
import { useAsyncGetter, useTime } from "../util/react/hooks";
import { getEvents, nukeAllEvents } from "../store/store";
import { getDurationMagnitudeMs, getDurations } from "../store/analytics";
import { includesProperties } from "../util/object";

export const OptionsApp = () => {
  const time = useTime();
  const [events, , refresh] = useAsyncGetter(getEvents);
  const durations = events && getDurations(
    events,
    includesProperties({ focused: true }),
    includesProperties({ focused: false }),
  )

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
            const magnitude = d ? Math.round(getDurationMagnitudeMs(d) / 1000) + 's' : '';
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
            return <li key={String(i)}>{JSON.stringify(d)}</li>
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


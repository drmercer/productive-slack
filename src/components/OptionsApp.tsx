import { App } from "../popup/App";
import "../css/popup.css";
import { useAsyncGetter } from "../util/react/hooks";
import { getEvents } from "../store/store";

export const OptionsApp = () => {
  const [events] = useAsyncGetter(getEvents);

  return <div>
    <div>
      <h1>Events:</h1>
      <ul>
        {events?.map((e, i) => {
          return <li key={String(i)}>{JSON.stringify(e)}</li>
        })}
      </ul>
    </div>
    <div className="OptionsApp-popup-preview">
      <App></App>
    </div>
  </div>
}


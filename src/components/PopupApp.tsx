import { getEvents } from "../store/store";
import { useAsyncGetter } from "../util/react/hooks";
import { EventsStats } from "./EventsStats";

export const PopupApp = () => {
  const [events, error] = useAsyncGetter(getEvents);

  return <div className="App">
    {events ? <EventsStats events={events} /> :
      error ? <>Error: </> :
        <>Loading...</>}
  </div>
}


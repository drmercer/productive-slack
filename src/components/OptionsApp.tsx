import "../css/popup.css";
import { useMemo } from "react";
import { Debug } from "./Debug";

export const OptionsApp = () => {
  const isDebug = useMemo(() => !!new URLSearchParams(window.location.search).get("debug"), []);

  return isDebug ? <Debug /> : <div>
    <h1>Productive Slack settings</h1>
    <p>TODO</p>
  </div>
}


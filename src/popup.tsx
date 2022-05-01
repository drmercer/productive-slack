import ReactDOM from "react-dom";
import { PopupApp } from "./components/PopupApp";
import { log } from "./util/log";

log.observeUncaughtErrors();

const app = document.body;
ReactDOM.render(<PopupApp />, app);

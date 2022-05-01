import ReactDOM from "react-dom";
import { OptionsApp } from "./components/OptionsApp";
import { log } from "./util/log";

log.observeUncaughtErrors();

const app = document.getElementById('app');
ReactDOM.render(<OptionsApp />, app);

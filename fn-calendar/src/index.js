import "@fontsource/roboto";
import "./index.scss";

import { createCalendar } from "./components/calendar.js";

createCalendar(
	document.getElementById("calendar-root")
);
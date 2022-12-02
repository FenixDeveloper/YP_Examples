import "@fontsource/roboto";
import "./index.scss";

import { Calendar } from "./components/Calendar.js";

const calendar = new Calendar(
	document.getElementById("calendar-root")
);

calendar.render();

const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
};

function getWeekNumber(currentDate = new Date()) {
    const startDate = new Date(currentDate.getFullYear(), 0, 1);
    const days = Math.floor((currentDate - startDate) /
        (24 * 60 * 60 * 1000));
          
    return Math.ceil(days / 7);
}
import "@fontsource/roboto";
import "./index.scss";
import { initNavBurger, initForm } from "ypmodule";

const formConstraints = {
    name: {
        presence: true,
        length: { minimum: 3, maximum: 40 }
    },
    username: {
        presence: true,
        length: { minimum: 3, maximum: 40 },
        format: {
            pattern: "[a-z0-9]+",
            flags: "i",
            message: "can only contain a-z and 0-9"
        }
    },
    email: {
        presence: true,
        email: true
    },
    about: {
        length: { minimum: 0, maximum: 50 }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initNavBurger();
    initForm(document.forms["demo-form"], formConstraints, (data) => {
        console.log(data);
        alert('Форма заполнена успешно!');
    });
});
import React, { useState } from 'react';
import styles from "./app.module.css";
import { Form } from "../form/form";
import { withGroups } from "../master/master";

/*
Наш контейнер для группировки полей, выводит табы и фильтрует филды.
*/
const Steps = withGroups([
    { title: "Основное", fields: ["firstName", "lastName", "age", "city"] },
    { title: "Работа", fields: ["company", "size", "position"] },
    { title: "Интересы", fields: ["hobby", "films", "music"] }
]);

function sendForm(data) {
    return new Promise((resolve, reject) => {
        
        setTimeout(() => {
            if (data.firstName && data.lastName) {
                resolve({ _id: Date.now() });
            } else {
                reject("Имя и Фамилия обязательные поля!")
            }
        }, 1000);
    });
};

function App() {
    const [state, setState] = useState(null);
    return <div className={styles.app}>
        <h1>Форма регистрации</h1>
        {state ? <p>Спасибо за регистрацию!</p> : <Form 
            name="test"
            fields={[
                { label: 'Имя', name: 'firstName' },
                { label: 'Фамилия', name: 'lastName' },
                { label: 'Возраст', name: 'age' },
                { label: 'Город', name: 'city' },
                { label: 'Компания', name: 'company' },
                { label: 'Размер компании', name: 'size' },
                { label: 'Должность', name: 'position' },
                { label: 'Увлечения', name: 'hobby' },
                { label: 'Любимые фильмы', name: 'films' },
                { label: 'Любимая музыка', name: 'music' }
            ]} 
            formAction={sendForm}
            onSubmit={(data, result) => {
                setState(Object.assign({}, data, result));
            }}
            /*
            Если убрать наш контейнер и форма возьмет дефолтный, 
            то будет длинная и страшная форма. 
            Можете попробовать, не сломается.
            */
            Container={Steps}
        /> }
    </div>
}

export default App;
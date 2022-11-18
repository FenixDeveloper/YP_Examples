import "@fontsource/roboto";
import "./index.scss";
import { Api } from "./components/Api";
import { Form } from "./components/Form";
import { TodoList } from "./components/TodoList";
import { TodoItem } from "./components/TodoItem";

//инициализируем подходящий АПИ в зависимости от настроек через паттерн Фабрика
const api = Api.factory({
    initial: [
        {text: "Провести вебинар"},
        {text: "Рассказать про ООП"}
    ]
});

//создаем наш TodoList и прописываем во втором аргументе правила рендера итема
const todoList = new TodoList(".todo__list", item => {
    const todoItem = new TodoItem(item, {
        onComplete: (todo) => {
            api.completeTodo(todo.getId()).then(result => {
                todo.setComplete();
            });
        },
        onRemove: (todo) => {
            api.deleteTodo(todo.getId()).then(result => {
                todo.remove();
            })
        }
    });
    todoList.appendItem(todoItem.render());
});

const todoForm = new Form(document.forms["todo-form"], {
    onValidate: ({ text }) => text && text.length > 3,
    onData: (data) => {
        api.createTodo(data).then(item => {
            todoForm.reset();
            todoList.renderItem(item);
        });
    }
});

api.findTodos().then(items => {
    todoList.renderItems(items);
});

window.__api = api;

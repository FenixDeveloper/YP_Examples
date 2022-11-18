//По факту в нашем случае этот класс отвечает только за свой контейнер
// и вывод списка неизвестных ему элементов через кастомную функцию render
export class TodoList {
    constructor(selector, render) {
        this._container = document.querySelector(selector);
        this._render = render; //тут логика на каждый итем
    }

    //что умеет наш TodoList

    clear() {
        this._container.innerHTML = "";
    }

    appendItem(todo) {
        this._container.append(todo);
    }

    prependItem(todo) {
        this._container.append(todo);
    }

    //прямой вызов обработчиков и полей снижает абстракцию,
    //лучше обернуть в функцию, так можно и поведение при необходимости поменять,
    // не затрагивая другие части кода

    renderItems(items) {
        items.forEach(item => this._render(item));
    }

    renderItem(data) {
        this._render(data);
    }
}
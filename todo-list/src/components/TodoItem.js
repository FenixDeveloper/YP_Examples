export class TodoItem {
    //глобальные настройки поместим здесь, как делали с константами перед функциями
    static template = document.querySelector("#todo-item").content;
    static completeClass = "todo__complete";
    static elements = {
        _label: ".todo__label",
        _checkBtn: ".todo__check",
        _removeBtn: ".todo__delete"
    };

    //прописать поля и дефолтные значения (если необходимо) просто хороший тон
    //но если поля инициализируются динамически, то это must have
    _label;
    _checkBtn;
    _removeBtn;

    constructor(data, handlers) {
        this._data = data;
        this._container = this.constructor.template.cloneNode(true).children[0];

        //перебираем элементы в конфиге и инициализируем динамически
        for (let key in this.constructor.elements) {
            this[key] = this._container.querySelector(this.constructor.elements[key]);
        }

        //инициализируем только те обработчики, что поддерживаются классом
        for (let handlerName in handlers) {
            if (typeof this[handlerName] === "function") { //проверяем что такое поле есть и в нем функция
                this[handlerName] = handlers[handlerName];
            }
        }

        //так как нам могут при различных сценариях потребоваться повторные рендеры
        //то ничего здесь больше не делаем, выносим остальную инициализацию в render
    }

    //проставляем данные и слушатели на элементах
    render() {
        this._label.textContent = this._data.text;
        if (this._data.complete) {
            this.setComplete();
        }
        this._checkBtn.addEventListener('click', (event) => {
            this.onComplete(this, event);
        });
        this._removeBtn.addEventListener('click', (event) => {
            this.onRemove(this, event);
        });

        return this._container;
    }

    //скрываем реализацию данных
    getId() {
        return this._data.id;
    }

    setComplete() {
        this._container.classList.add(this.constructor.completeClass);
        this._checkBtn.disabled = true;
    }

    remove() {
        this._container.remove();
    }

    //обработчики будут передаваться как аргументы, а в случае наследования их стандартное поведение
    //нам скорее всего не понадобится, объявляем методы на уровне инстанса

    onComplete = () => {
        this.setComplete();
    }

    onRemove = () => {
        this.remove();
    }
}

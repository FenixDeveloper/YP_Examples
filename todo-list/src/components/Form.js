export class Form {
    static submitQuery = "[type=submit]";
    static changeEvents = ["keyup", "change"];

    constructor(element, handlers) {
        this._form = element;
        this._submit = this._form.querySelector(this.constructor.submitQuery);
        for (let handlerName in handlers) {
            if (typeof this[handlerName] === "function") {
                this[handlerName] = handlers[handlerName];
            }
        }

        //нам вряд-ли понадобится несколько раз рендерить нашу форму,
        // так как можем использовать ее много раз и без этого
        //поэтому можем инициализировать прямо здесь
        this._form.addEventListener("submit", this.onSubmit);
        for (let eventName of this.constructor.changeEvents) {
            this._form.addEventListener(eventName, this.onChange);
        }

        this.onChange();
    }

    reset() {
        this._form.reset();
    }

    getFormData() {
        return new FormData(this._form);
    }

    getData() {
        return Object.fromEntries(this.getFormData().entries());
    }

    //далее идут обработчики, которые определяют жизненный цикл нашей формы

    onChange = () => { //1. изменение полей формы
        const result = this.onValidate(this.getData());
        this._submit.disabled = result !== true;
    }

    onValidate = (data) => { //2. валидация данных
        return true;
    }

    onSubmit = (event) => { //3. отправка формы
        event.preventDefault();
        this.onData(this.getData());
        return false;
    };

    onData = (data) => {}; //4. обработка данных
}
//если мы хотим использовать разные апи и они были одинаковые, то хорошо создать родительский класс
//можно сделать его фабрикой и получать дочерний динамически
export class Api {
    async findTodos() {}
    async createTodo() {}
    async deleteTodo(id) {}
    async completeTodo(id) {}

    //По сути Фабрика это просто функция, которая получает аргументы и возвращает объект
    //в зависимости от аргументов принимает решение какого класса инстанс создавать
    static factory(settings) {
        if (settings.baseUrl) return new RemoteApi(settings);
        return new LocalApi(settings); //всегда должен быть вариант по-умолчанию!
    }
}

//локальный API в памяти
export class LocalApi extends Api {
    _nextId = 1;
    _items = [];

    constructor({initial = []}) {
        super();
        this._nextId = 1;
        this._items = initial.map(this._newItem);
    }

    _newItem = (item) => ({
        ...item,
        complete: item.complete ?? false,
        id: this._nextId++
    });

    async findTodos() {
        return this._items;
    }

    async createTodo(item) {
        const newItem = this._newItem(item);
        this._items = [newItem, ...this._items];
        return newItem;
    }

    async deleteTodo(id) {
        const oldLength = this._items.length;
        this._items = this._items.filter(item => item.id !== id);
        return oldLength !== this._items.length;
    }

    async completeTodo(id) {
        let result = false;
        this._items = this._items.map(item => {
            if (item.id === id && !item.complete) {
                result = true;
                return {...item, complete: true};
            } else {
                return item;
            }
        });
        return result;
    }
}

//удаленный АПИ на сервере
class RemoteApi extends Api {
    constructor({baseUrl, token}) {
        super();
        this._baseUrl = baseUrl;
        this._headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        };
    }

    _handleReponse = (response) => response.json()

    createTodo(data) { //return
        return fetch(this._baseUrl + '/todo', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        }).then(this._handleReponse);
    }

    findTodos() {
        return fetch(this._baseUrl + '/todo', {
            method: 'GET',
            headers: this._headers
        }).then(this._handleReponse);
    }

    completeTodo(id) {
        return fetch(this._baseUrl + '/todo/' + id, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({ complete: true })
        }).then(this._handleReponse);
    }

    deleteTodo(id) {
        return fetch(this._baseUrl + '/todo/' + id, {
            method: 'DELETE',
            headers: this._headers
        }).then(this._handleReponse);
    }
}
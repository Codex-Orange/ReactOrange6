import Todo from './Todo';
import makeRiver from './makeRiver';
export default class TodoDomain {
    constructor() {
        this.todos = {};
        this.store = makeRiver();
    }

    addTodo(descriptionText) {
        const newTodo = new Todo(descriptionText);
        newTodo.domain = this;
        this.todos[newTodo.id] = newTodo;
        return newTodo;
    }

    removeTodo(todoId) {
        delete this.todos[todoId];
    }

    getAllTodos() {
        return Object.keys(this.todos).map((each) => this.todos[each]);
    }

    update() {
        this.todoApp.update();
    }
}
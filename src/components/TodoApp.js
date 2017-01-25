import React from 'react';
import TodoList from './TodoList';
import TodoDomain from '../lib/TodoDomain';
const domain = new TodoDomain();
export default class TodoApp extends React.Component {
    constructor() {
        super();
        this.visibilityFilters = ["ALL_TODOS", "LEFT_TODOS", "COMPLETED_TODOS"]
        this.state = {
            todos: domain.getAllTodos(),
            visibilityFilter: "ALL_TODOS"
        };
    }

    addTodo = () => {
        if (this._todoInputField.value) {
            domain.addTodo(this._todoInputField.value);
            this.setState({todos: domain.getAllTodos()});
            this._todoInputField.value = '';
        }
    }
    archiveToggleTodo = (e) => {
        domain.archiveToggleTodo(e.target.dataset.id);
        this.setState({todos: domain.getAllTodos()});
    }
    removeTodo = (e) => {
        domain.removeTodo(e.target.dataset.id);
        this.setState({todos: domain.getAllTodos()});
    }
    changeVisibilityFilter = (e) => {
        this.setState({visibilityFilter: e.target.dataset.id});
    }
    visibleTodos = () => {
        switch (this.state.visibilityFilter) {
            case "ALL_TODOS":
                return this.state.todos;
            case "LEFT_TODOS":
                return this.state.todos.filter(each => each.isDone === false);
            case "COMPLETED_TODOS":
                return this.state.todos.filter(each => each.isDone === true);
            default:
                return this.state.todos;
        }
    }

    render() {
        let visibleTodos = this.visibleTodos();
        return (
            <div>
                <h2> Down and Dirty TodoApp built with React </h2>
                <input
                    type="text"
                    placeholder="What do you want todo?"
                    ref={((thisElement) => this._todoInputField = thisElement)}
                />
                <button onClick={this.addTodo}>Add Todo</button>
                <TodoList
                    visibleTodos={visibleTodos}
                    visibilityFilter={this.state.visibilityFilter}
                    archiveToggleTodo={this.archiveToggleTodo}
                    removeTodo={this.removeTodo}
                />
                <div>
                    SHOW:
                    {
                        this.visibilityFilters.map(
                            each =>
                                <button
                                    key={each}
                                    onClick={this.changeVisibilityFilter}
                                    data-id={each}>
                                    {each.replace("_", " ")}
                                </button>
                        )
                    }
                </div>

            </div>
        );
    }
}
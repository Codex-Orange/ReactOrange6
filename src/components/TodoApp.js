import React from 'react';
import TodoList from './TodoList';
import MessagePane from '../lib/messagePane';
import TodoDomain from '../lib/TodoDomain';
const domain = new TodoDomain();
import makeRiver from '../lib/makeRiver';
export default class TodoApp extends React.Component {
    constructor() {
        super();
        this.river = makeRiver();
        this.visibilityFilters = ["ALL_TODOS", "LEFT_TODOS", "COMPLETED_TODOS"];
        this.state = {
            todos: domain.getAllTodos(),
            visibilityFilter: "ALL_TODOS"
        };
        domain.todoApp = this;
    }

    update = () => {
        this.setState({todos: domain.getAllTodos()});
    };
    addTodo = () => {
        var text = this._todoInputField.value;
        if (text) {
            domain.addTodo(text);
            this.update();
            this._todoInputField.value = '';
            this.river.messageAppend.push("Add Todo " + text);
        }
    };
    changeVisibilityFilter = (e) => {
        this.setState({visibilityFilter: e.target.dataset.id});
        this.river.messageAppend.push("Change Filter");
    };
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
    };

    render() {
        let visibleTodos = this.visibleTodos();
        return (
            <div>
                <h2> Down and Dirty TodoApp built with React </h2>
                <p>Started with https://hashnode.com/post/getting-started-with-es6-and-react-by-building-a-minimal-todo-app-citaix6xe04og8y531g491a1o</p>
                <p>Refactored, and added Bacon.js</p>
                <input
                    type="text"
                    placeholder="What do you want todo?"
                    ref={((thisElement) => this._todoInputField = thisElement)}
                />
                <button onClick={this.addTodo}>Add Todo</button>
                <TodoList
                    visibleTodos={visibleTodos}
                    visibilityFilter={this.state.visibilityFilter}
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
                <div className="MessagePane">
                    <MessagePane inStream={this.river.messageWrite} inAppendStream={this.river.messageAppend}
                                 outStream={this.river.messageRead}/>
                </div>

            </div>
        );
    }
}
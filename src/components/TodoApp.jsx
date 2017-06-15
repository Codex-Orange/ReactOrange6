import React from 'react';
import TodoList from './TodoList';
import MessagePane from '../lib/MessagePane';
import TodoDomain from '../lib/TodoDomain';
const domain = new TodoDomain();
import makeRiver from '../lib/makeRiver';
export default class TodoApp extends React.Component {
	constructor() {
		super();
		this.visibilityFilters = ["ALL_TODOS", "LEFT_TODOS", "COMPLETED_TODOS"];
		this.river = makeRiver();
		this.river.visibilityFilter.push("ALL_TODOS");
		this.river.todos.push(domain.getAllTodos());
		domain.todoApp = this;
	}

	update = () => {
		this.river.todos.push(domain.getAllTodos());
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
		this.river.visibilityFilter.push(e.target.dataset.id);
		this.river.messageAppend.push("Change Filter " + e.target.dataset.id);
	};

	render() {
		return (
		  <div>
			  <h2> Down and Dirty TodoApp built with React </h2>
			  <p>Started with
				  https://hashnode.com/post/getting-started-with-es6-and-react-by-building-a-minimal-todo-app-citaix6xe04og8y531g491a1o </p>
			  <p>Refactored, and added Bacon.js</p>
			  <input
				type="text"
				placeholder="What do you want todo?"
				ref={((thisElement) => this._todoInputField = thisElement)}
			  />
			  <button onClick={this.addTodo}>Add Todo</button>
			  <TodoList
				className="TodoList"
				todos={this.river.todos}
				visibilityFilter={this.river.visibilityFilter}
			  />
			  <div className="show">
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
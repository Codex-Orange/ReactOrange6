import React from 'react';
import TodoRoot from './TodoRoot';
import TodoItem from './TodoItem';

export default class TodoList extends TodoRoot {
	componentWillMount() {
		this.connectPropStreamToState("visibilityFilter");
		this.connectPropStreamToState("todos");
	}

	visibleTodos() {
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
		return (
		  <div className="TodoList">
			  <h3>{this.state.visibilityFilter.replace("_", " ")}</h3>
			  {this.visibleTodos().length > 0 ?
				(
				  <ul>
					  {this.visibleTodos().map(
						(each) =>
						  <TodoItem
							key={each.id}
							todo={each}
						  />
					  )}
				  </ul>
				) :
				(
				  "No Todos to show"
				)
			  }
		  </div>
		);
	}
}
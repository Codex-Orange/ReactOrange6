import React from 'react';
import TodoRoot from './TodoRoot';
import TodoItem from './TodoItem';

export default class TodoList extends TodoRoot {
	componentWillMount() {
		this.connectPropStreamToState("visibilityFilter");
		this.connectPropStreamToState("todos");
	}

	render() {
		return (
		  <div className="TodoList">
			  <h3>{this.state.visibilityFilter.replace("_", " ")}</h3>
			  {this.state.todos.length > 0 ?
				(
				  <ul>
					  {this.state.todos.map(
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
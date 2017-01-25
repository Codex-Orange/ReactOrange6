import React from 'react';
import TodoItem from './TodoItem';
export default class TodoList extends React.Component {
    // visibilityFilter could be either of the following values:
    // "ALL_TODOS", "LEFT_TODOS", or "COMPLETED_TODOS"
    render() {
        return (
            <div>
                <h3>{this.props.visibilityFilter.replace("_", " ")}</h3>
                {this.props.visibleTodos.length > 0 ?
                    (
                        <ul>
                            {this.props.visibleTodos.map(
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
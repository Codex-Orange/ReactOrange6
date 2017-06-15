import React from 'react';
export default class TodoItem extends React.Component {
    render() {
        return (
            <li>
                <input
                    data-id={this.props.todo.id}
                    checked={this.props.todo.isDone}
                    onChange={this.props.todo.toggleDone}
                    type="checkbox"
                />
                <label>{this.props.todo.descriptionText}{this.props.todo.isDone ? " - DONE" : ""}</label>
                <button
                    data-id={this.props.todo.id}
                    onClick={this.props.todo.remove}>
                    Delete
                </button>
            </li>
        );
    }
}


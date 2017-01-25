//console.log("MessagePane A");
import React from 'react';
//console.log("MessagePane B");
//
// Props channel, river
//
var MessagePane = React.createClass({
	// ============================
	// Accessing
	//
	// Use getValue for latest synchronous value
	// Use {this.state.value} to set dependency on asychronous value
	// ============================
	value_: null,
	getValue: function () {
		return this.value_;
	},
	setValue: function (value) {
		this.value_ = value;
		this.setState({
			value: value
		});
	},
	// ============================
	// React
	// ============================
	getInitialState: function () {
		return {}
	},
	componentWillMount: function () {
		//console.log("componentWillMount")
		this.props.inStream.onValue(function (value) {
			this.setValue(value);
		}.bind(this));
		this.props.inAppendStream.onValue(function (value) {
			var newValue = this.getValue() ? this.getValue() + "\n" + value : value;
			this.setValue(newValue);
		}.bind(this));
		var initialValue = this.props.inStream.value_;
		if (initialValue) {
			this.setValue(initialValue);
			this.props.outStream.push(initialValue);
		} else {
			this.props.outStream.push("");
		}
	},
	componentDidMount: function () {
		//console.log("componentDidMount", this.props.channel);
	},
	componentDidUpdate: function () {
		//console.log("componentDidUpdate", this.props.channel);
	},
	// ============================
	// Events
	// ============================
	eventTextAreaOnChange: function (event) {
		var text = event.target.value;
		this.setValue(text);
		this.props.outStream.push(text);
	},
	eventTextAreaOnKeyDown: function (event) {
		this.handleKeepTabInTextArea(event);
	},
	// ============================
	// Utility
	// ============================
	handleKeepTabInTextArea: function (event) {
		var txa = event.target;
		//keep tab in textarea
		if (event.keyCode === 9) {
			//tab
			event.preventDefault();
			var start = txa.selectionStart;
			txa.value = txa.value.substring(0, txa.selectionStart) + "\t" + txa.value.substring(txa.selectionEnd);
			txa.selectionEnd = start + 1;
		}
	},
	// ============================
	// Render
	// ============================
	render: function () {
		return (
		  <div className="MessagePane">
			  <textarea className="border"
			            onChange={ this.eventTextAreaOnChange }
			            onKeyDown={ this.eventTextAreaOnKeyDown }
			            value={ this.state.value }>
				  </textarea>
		  </div>
		);
	}
});
//console.log("MessagePane C");
export default MessagePane
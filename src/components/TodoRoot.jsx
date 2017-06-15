import React from 'react';

export default class TodoRoot extends React.Component {
	connectPropStreamToState(sName) {
		this.setState({[sName]: this.props[sName].value_});
		this.props[sName].onValue(function (value) {
			this.setState({[sName]: value});
		}.bind(this));
	}
}

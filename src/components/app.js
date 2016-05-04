import { h, Component } from 'preact';
import { connect } from 'react-redux';
import { bindActions } from '../util';
import reduce from '../reducers';
import * as actions from '../actions';
import TodoItem from './todo-item';

@connect(reduce, bindActions(actions))
export default class App extends Component {
	@bind
	addTodos() {
    let { text } = this.state;
    this.setState({ text: '' });
    this.props.addTodo(text);
    return false;
	}

	@bind
	removeTodo(todo) {
    this.props.removeTodo(todo);
	}

	render({ todos }, { text }) {
    return (
      <div />
    );
	}
}

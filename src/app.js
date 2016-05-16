import { h, render, Component } from 'preact';
import * as actions from './actions';
import store from './store';
import Map from './components/map';

class App extends Component {
	unsubscribe = Function.prototype

	componentDidMount() {
		this.unsubscribe = store.subscribe(this.setState.bind(this, { refresh: true }));
	}

	componentWillUnMount() {
		this.unsubscribe();
	}

	handleMapChange(filters) {
		store.dispatch(actions.setFilter(filters));

		const storeState = store.getState();
		store.dispatch(actions.fetchPoints());
	}

	render() {
		const styles = {
			width: '100%',
			height: '100%',
			padding: '0',
			margin: '0'
		};

		return (
			<div style={styles}>
				<Map
					handleChange={this.handleMapChange}
					data={store.getState()}
				/>
			</div>
		);
	}
}

render((<App />), document.body);

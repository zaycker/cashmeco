import { h, render } from 'preact';
import { Provider } from 'react-redux';
import * as actions from './actions';
import store from './store';
import Map from './components/map';

function handleMapChange(filters) {
	store.dispatch(actions.setFilter(filters));

	const storeState = store.getState();
	store.dispatch(actions.fetchPoints());
}

const styles = { width: '100%', height: '100%', padding: '0', margin: '0' };

render((<div style={styles}>
		<Provider store={store}>
			<Map
				handleChange={handleMapChange}
				points={store.getState().points}
			/>
		</Provider>
	</div>), document.body);

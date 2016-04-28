import { h, render, Component } from 'preact';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/app';

render((
	<div id="outer">
		<Provider store={store}>
			<App />
		</Provider>
	</div>
), document.body);

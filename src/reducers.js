import { combineReducers } from 'redux';
import { SET_FILTER, REQUEST_POINTS, RECEIVE_POINTS } from './actions';

const defaultCurrencies = ['USD'];
const defaultCurrency = 'USD';

function filters(state = { currency: defaultCurrency, operation: 'buy' }, { type, payload }) {
  switch (type) {
    case RECEIVE_POINTS:
      const currencies = payload.currencies || defaultCurrencies;
      const currentCurrency = state.currency;

      return {
        ...state,
        currency: currencies.indexOf(currentCurrency) > -1 ?
          currentCurrency : currencies[0]
      };
    case SET_FILTER:
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
}

function points(state = [], { type, payload }) {
  switch (type) {
    case RECEIVE_POINTS:
      return payload.results || [];
    default:
      return state;
  }
}

function currencies(state = defaultCurrencies, { type, payload }) {
  switch (type) {
    case RECEIVE_POINTS:
      return payload.currencies || defaultCurrencies;
    default:
      return state;
  }
}

function lastFetchTS(state = null, { type, payload }) {
  switch (type) {
    case REQUEST_POINTS:
      return +new Date();
    case RECEIVE_POINTS:
      return null;
    default:
      return state;
  }
}

const reducers = combineReducers({
  lastFetchTS,
  filters,
  points
});

export default reducers;

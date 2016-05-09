import { combineReducers } from 'redux';
import { SET_FILTER, REQUEST_POINTS, RECEIVE_POINTS } from './actions';

function filters(state = {}, { type, payload }) {
  switch (type) {
    case SET_FILTER:
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
}

function points(state = { isFetching: false }, { type, payload }) {
  switch (type) {
    case REQUEST_POINTS:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_POINTS:
      return {
        ...payload,
        isFetching: false
      };
    default:
      return state;
  }
}

const reducers = combineReducers({
  filters,
  points
});

export default reducers;

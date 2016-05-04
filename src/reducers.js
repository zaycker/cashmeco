import { combineReducers } from 'redux';
import { SET_FILTER, REQUEST_POINTS, RECEIVE_POINTS } from './actions';

function points(state = [], action) {
  switch (action.type) {
    case REQUEST_POINTS:
      return [];
    case RECEIVE_POINTS:
      return action.points;
    default:
      return state;
  }
}

function filters(state = {}, action) {
  switch (action.type) {
    case SET_FILTER:
      return action.filter;
    default:
      return state;
  }
}

const cashmecoApp = combineReducers({
  visibilityFilter,
  points
});

export default todoApp;

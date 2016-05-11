const API_URL = '//api.cashme.co/api/v1/rates.json';

export const REQUEST_POINTS = 'REQUEST_POINTS';
export function requestPoints() {
  return {
    type: REQUEST_POINTS
  };
};

export const RECEIVE_POINTS = 'RECEIVE_POINTS';
export function receivePoints() {
  return {
    type: RECEIVE_POINTS
  };
}

export const SET_FILTER = 'SET_FILTER';
export function setFilter(payload) {
  return {
    type: SET_FILTER,
    payload
  };
}

export function fetchPoints({ lat, lng, radius }) {
  return function (dispatch) {
    dispatch(requestPoints());

    return fetch(`${API_URL}?point[latitude]=${lat}&point[longitude]=${lng}&radius=${radius}`)
      .then(response => dispatch(receivePoints(response.json())));
  };
}

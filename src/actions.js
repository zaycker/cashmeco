import { createAction } from 'redux-actions';

const API_URL = '//api.cashme.co/api/v1/rates.json';

export const REQUEST_POINTS = 'REQUEST_POINTS';
export const requestPoints = createAction(REQUEST_POINTS);

export const RECEIVE_POINTS = 'RECEIVE_POINTS';
export const receivePoints = createAction(RECEIVE_POINTS);

export const SET_FILTER = 'SET_FILTER';
export const setFilter = createAction(SET_FILTER);

export const fetchPoints = () => async (dispatch, getState) => {
    dispatch(requestPoints());

    const { lat, lng, radius } = getState().filters;
    const url = `${API_URL}?point[latitude]=${lat}&point[longitude]=${lng}&radius=${radius}`;
    const response = await fetch(url);
    dispatch(receivePoints(await response.json()));
  };

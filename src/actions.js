export const REQUEST_POINTS = 'REQUEST_POINTS';
export function requestPoints(filters) {
  return {
    type: REQUEST_POINTS,
    filters
  };
}

export const RECEIVE_POINTS = 'RECEIVE_POINTS';
export function receivePoints(json) {
  return {
    type: RECEIVE_POINTS,
    points: json,
    receivedAt: Date.now()
  };
}

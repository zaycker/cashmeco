import {h, Component, render} from 'preact';
import getMarker from './marker-template';

const MARKER_COLOR_STEPS = 5;

const iconHtml = (props) => {
    const {
        data: {
            filters: {
                currency,
                operation
            }
        },
        range: {
            min,
            max
        }
    } = props;

    const rateFullNumber = props.point.rates[currency][operation];
    const step = (max - min) / (MARKER_COLOR_STEPS - 1);
    const markerType = (operation === 'buy' ?
            (rateFullNumber - min) : (max - rateFullNumber)) / (step || 1) | 0;

    return getMarker({
        className: `marker_type-${markerType}`,
        text: rateFullNumber.toFixed(1)
    });
};

const getIcon = (props) => L.divIcon({
    ...iconDefaults,
    html: iconHtml(props)
});

const iconDefaults = {
    iconSize: [30.11, 51],
    iconAnchor: [15.58, 50],
    className: 'marker-container'
};

export default function (props) {
    const location = props.point.location;

    return L.marker(
        [location.latitude, location.longitude],
        {icon: getIcon(props)});
}

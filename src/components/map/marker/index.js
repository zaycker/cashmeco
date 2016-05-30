import {h, Component, render} from 'preact';
import getMarker, { getShadow } from './marker-template';

class DivIconWithShadow extends L.DivIcon {
    createShadow = function() {
        const div = document.createElement('div');
        div.innerHTML = getShadow();
        L.Icon.prototype._setIconStyles.call(this, div, 'shadow');
        return div;
    }
}

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
    const markerType = Math.round((operation === 'buy' ?
            (rateFullNumber - min) : (max - rateFullNumber)) / (step || 1));

    return getMarker({
        className: `marker_type-${markerType}`,
        text: rateFullNumber.toFixed(1)
    });
};

const getIcon = (props) => new DivIconWithShadow({
    ...iconDefaults,
    html: iconHtml(props),
});

const iconDefaults = {
    iconSize: [36, 61],
    iconAnchor: [18, 62],
    className: 'marker-container',
    shadowSize: [40, 55],
    shadowAnchor: [15, 55]
};

export default function (props) {
    const location = props.point.location;

    return L.marker(
        [location.latitude, location.longitude],
        {icon: getIcon(props)});
}

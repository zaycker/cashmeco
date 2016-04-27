require('style!css!leaflet/dist/leaflet.css');
import L from 'leaflet';

L.map(document.querySelector('.cashmeco'), {
  center: [51.505, -0.09],
  zoom: 13,
  preferCanvas: true
});

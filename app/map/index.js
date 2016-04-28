import L from 'leaflet';

const token = 'pk.eyJ1IjoiemF5Y2tlciIsImEiOiJjaWgwbDdnYTMwMGhxc3RseW1vMHB3dThrIn0' +
  '.wMFneANk_VWXqExnMhxGAg';

const map = L.map(document.querySelector('.cashmeco'), {
  center: [51.505, -0.09],
  zoom: 13,
  preferCanvas: true
});

L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?' +
    'access_token=' + token, { maxZoom: 18 }).addTo(map);

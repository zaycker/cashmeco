import L from 'leaflet';

const TOKEN = 'pk.eyJ1IjoiemF5Y2tlciIsImEiOiJjaWgwbDdnYTMwMGhxc3RseW1vMHB3dThrIn0' +
  '.wMFneANk_VWXqExnMhxGAg';

export default function() {
  return L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?' +
      'access_token=' + TOKEN, { maxZoom: 18 });
}

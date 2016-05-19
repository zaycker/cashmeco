import { h, Component, render } from 'preact';
import L from 'leaflet';
import getMapBoxLayer from './layers/mapbox';
import getMarker from './marker';

export default class Map extends Component {
  map = null;
  markers = [];

  componentDidMount = () => this.initMap();

  componentWillReceiveProps = (props) => this.drawMarkers(props.data);

  shouldComponentUpdate = () => false;

  initMap() {
    const mapContainer = this.props.mapContainer || '';
    const container = mapContainer ?
      (typeof mapContainer == 'string' ?
        document.querySelector(mapContainer) : mapContainer) :
          this.base;

    this.map = L.map(container, {
      center: [55.75189769534975, 37.62036323547364],
      zoom: 13,
      preferCanvas: true
    });

    this.listenMap();
    getMapBoxLayer().addTo(this.map);
    this.locate();
  }

  locate() {
		this.map.locate({
      setView: true,
      maxZoom: 16
    });
  }

  listenMap() {
    //TODO unbind
    this.map.on('layeradd', this.map._onResize.bind(this.map));

    //TODO unbind
    this.map.on('load zoomstart zoom movestart move resize',
      L.Util.throttle(this.handleMapChange, 500, this));
  }

  drawMarkers(data) {
    const { currency, operation } = data.filters;
    let range = {
      min: Number.MAX_VALUE,
      max: Number.MIN_VALUE
    };

    this.markers.forEach(marker => marker.remove());

    const filteredPoints = data.points.filter(point => {
      const value = point.rates[currency] && point.rates[currency][operation];
      const latLngLocation = L.latLng(point.location.latitude, point.location.longitude);

      if (!value || !this.map.getBounds().contains(latLngLocation)) {
        return false;
      }

      range = {
        min: Math.min(range.min, value),
        max: Math.max(range.max, value)
      };

      return !!value;
    });

    const step = (range.max - range.min) / 100;

    this.markers = filteredPoints.map(point => getMarker({
      point,
      data,
      range: {
        ...range,
        step
      }
    }).addTo(this.map));
  }

  handleMapChange() {
    const handleChange = this.props.handleChange;

    if (!handleChange) {
      return;
    }

    const center = this.map.getCenter();
    const radius = center.distanceTo(this.map.getBounds().getSouthEast()) / 1e3;

    handleChange({
      'lat': center.lat,
      'lng': center.lng,
      radius
    });
  }

  render() {
    const styles = {
      width: '100%',
      height: '100%',
      padding: '0',
      margin: '0'
    };

    return (
      this.props.mapContainer ? null : <div style={styles} />
    );
  }
};

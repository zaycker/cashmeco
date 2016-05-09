import { h, Component } from 'preact';
import L from 'leaflet';
import getMapBoxLayer from './layers/mapbox';

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.map = null;
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

  componentDidMount() {
    this.initMap();
  }

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
};

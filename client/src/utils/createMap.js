import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

import { filterDataLayer } from './mapLayers';

// reset marker default icon/shadow to fix leaflet asset bundling bug
import iconBlueUrl from '../assets/marker-icon-blue.png';
import iconRedUrl from '../assets/marker-icon-red.png';

import shadowUrl from '../assets/marker-shadow.png';
const DefaultIcon = L.icon({ iconUrl: iconBlueUrl, shadowUrl });
L.Marker.prototype.options.icon = DefaultIcon;

let map;

export const getMap = () => map;

export default (data) => {
  if (!map) {
    map = new L.Map('map_canvas', {
      center: [59.9295797, 30.2879701],
      zoom: 10,
      pmIgnore: false, // necessary due to opt-in option
    });

    // add base map layer
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    // add cluster layer
    const layer = filterDataLayer('clusterLayer', 'all', data);
    map.addLayer(layer);

    map.on('popupopen', function (e) {
      const popup = e.popup;
      const { title, categories, image } = popup._source.options;

      // console.log(e);
      const capitalize = s => s && s[0].toUpperCase() + s.slice(1);

      popup.setContent(
        '<img src="data:image/jpeg;base64,' + image + '" height="100" /></br>' + title + '</br>Категории: ' + categories.map(cat => capitalize(cat)).join(', '),
        // '</br>Координаты:</br>' + popup.getLatLng().lng + '</br>' + popup.getLatLng().lat
      );
    });

    // const popup = L.popup();

    // function onMapClick(e) {
    //   popup
    //     .setLatLng(e.latlng)
    //     .setContent(`You clicked the map at ${e.latlng.toString()}`)
    //     .openOn(map);
    // }

    // map.on('click', onMapClick);
  }
};

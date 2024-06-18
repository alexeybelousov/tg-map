import L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

import { createPoints } from './createData';

const layer = L.markerClusterGroup();

export const filterDataLayer = (layerId, filter, mapData) => {
  layer.clearLayers();

  let data = createPoints(mapData);

  if (filter && filter !== 'all') {
    data = data.filter(({ categories }) => categories.includes(filter));
  }

  data.forEach(({ marker }) => {
    layer.addLayer(marker);
  });
  return layer;
};

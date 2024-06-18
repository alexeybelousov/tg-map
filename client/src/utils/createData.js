import L from 'leaflet';

export const createPoints = (data) => {
  const features = data.points.map(({ id, coordinates: coordsStr, categories: categoriesStr, title, image }) => {
    const coordinates = coordsStr.split(', ').map(coord => parseFloat(coord));
    const categories = categoriesStr.split(', ');

    const [lng, lat] = coordinates;
    const popup = L.popup({ offset: [12, 10] });
    const marker = L.marker([lat, lng], { id, title, categories, image }).bindPopup(popup);

    return { marker, categories, title, image };
  });

  return features;
};

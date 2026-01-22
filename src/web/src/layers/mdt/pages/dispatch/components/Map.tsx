import React from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

const mapCenter: [number, number] = [-119.43, 58.84];
const latPr100 = 1.421;

export function gameToMap(x: number, y: number): [number, number] {
  return [mapCenter[0] + latPr100 / 100 * y, mapCenter[1] + latPr100 / 100 * x];
}

const Map: React.FC = () => {
  const map = useMap();

  const bounds = L.latLngBounds(L.latLng(0.0, 128.0), L.latLng(-192.0, 0.0))

  map.setMaxBounds(bounds);

  map.setView([0, 0], 2);

  map.attributionControl.setPrefix(false);

  return null;
};

export default Map;
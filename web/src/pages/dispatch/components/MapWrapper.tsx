// https://github.com/BubbleDK/bub-mdt/blob/main/src/pages/dispatch/index.tsx

import React from 'react';
import { MapContainer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Map from './Map';
import L from 'leaflet';
import { useMantineTheme } from '@mantine/core';
import OfficerMarkers from './OfficerMarkers';

const MapWrapper: React.FC = () => {
  const theme = useMantineTheme();

  const CRS = L.extend({}, L.CRS.Simple, {
    projection: L.Projection.LonLat,
    scale: function (zoom: number) {
      return Math.pow(2, zoom);
    },
    zoom: function (sc: number) {
      return Math.log(sc) / 0.6931471805599453;
    },
    distance: function (pos1: { lng: number; lat: number }, pos2: { lng: number; lat: number }) {
      const x_difference = pos2.lng - pos1.lng;
      const y_difference = pos2.lat - pos1.lat;

      return Math.sqrt(x_difference * x_difference + y_difference * y_difference);
    },
    transformation: new L.Transformation(0.02072, 117.3, -0.0205, 172.8),
    infinite: false,
  });

  return (
    <MapContainer
      center={[0, -1024]}
      maxBoundsViscosity={1.0}
      zoom={6}
      maxZoom={6}
      minZoom={2}
      zoomControl={false}
      crs={CRS}
      style={{ width: '100%', height: '100%', borderRadius: theme.radius.md, zIndex: 1 }}
    >
      <Map />
      <OfficerMarkers />
    </MapContainer>
  );
};

export default MapWrapper;

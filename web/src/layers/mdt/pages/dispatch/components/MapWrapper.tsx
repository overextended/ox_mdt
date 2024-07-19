import React from 'react';
import { MapContainer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Map from './Map';
import L from 'leaflet';
import { useMantineTheme } from '@mantine/core';
import OfficerMarkers from './OfficerMarkers';
import CallMarkers from './CallMarkers';
import { useSetDispatchMap } from '../../../../../state';

const MapWrapper: React.FC = () => {
  const theme = useMantineTheme();
  const setMap = useSetDispatchMap();

  const Layer = L.tileLayer('https://s.rsg.sc/sc/images/games/GTAV/map/game/{z}/{x}/{y}.jpg', {
    maxZoom: 7,
    minZoom: 2,
    bounds: L.latLngBounds(L.latLng(0.0, 128.0), L.latLng(-192.0, 0.0)),
  });

  const CRS = L.CRS.Simple;

  return (
    <MapContainer
      center={[-119.43, 58.84]}
      maxBoundsViscosity={1.0}
      preferCanvas
      ref={setMap}
      zoom={2}
      maxZoom={7}
      minZoom={2}
      zoomControl={false}
      layers={[Layer]}
      crs={CRS}
      style={{ width: '100%', height: '100%', borderRadius: theme.radius.md, zIndex: 1, backgroundColor: "#000" }}
    >
      <Map />
      <OfficerMarkers />
      <React.Suspense>
        <CallMarkers />
      </React.Suspense>
    </MapContainer>
  );
};

export default MapWrapper;
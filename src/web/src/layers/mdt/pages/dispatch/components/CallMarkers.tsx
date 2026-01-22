import React from 'react';
import { useCalls } from '../../../../../state';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { Text } from '@mantine/core';
import MarkerPopup from './MarkerPopup';
import { useNuiEvent } from '../../../../../hooks/useNuiEvent';
import { queryClient } from '../../../../../main';
import { Call } from '../../../../../typings';
import { gameToMap } from './Map';

const CallMarkers: React.FC = () => {
  const calls = useCalls();

  useNuiEvent('updateCallCoords', (data: { id: number; coords: [number, number] }) => {
    queryClient.setQueriesData(['calls'], (oldData: Call[] | undefined) => {
      if (!oldData) return;

      return oldData.map((prevCall) => (prevCall.id === data.id ? { ...prevCall, coords: data.coords } : prevCall));
    });
  });

  return (
    <>
      {calls.length > 0 &&
        calls.map((call) => (
          <Marker
            key={call.id}
            position={gameToMap(call.coords[0], call.coords[1])}
            icon={L.icon({
              iconSize: [26, 26],
              iconUrl: `./blips/${call.blip}.png`,
            })}
          >
            <MarkerPopup>
              <Text>
                {call.offense} ({call.code})
              </Text>
            </MarkerPopup>
          </Marker>
        ))}
    </>
  );
};

export default CallMarkers;

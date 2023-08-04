import React from 'react';
import { useCalls } from '../../../../../state';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import * as ReactDOMServer from 'react-dom/server';
import { IconCircleFilled } from '@tabler/icons-react';
import { createStyles, Text } from '@mantine/core';
import MarkerPopup from './MarkerPopup';

const useStyles = createStyles((theme) => ({
  icon: {
    color: theme.colors.red[8],
  },
}));

const CallMarkers: React.FC = () => {
  const calls = useCalls();
  const { classes } = useStyles();

  return (
    <>
      {calls.length > 0 &&
        calls.map((call) => (
          <Marker
            key={call.id}
            position={[call.coords[1], call.coords[0]]}
            icon={L.divIcon({
              className: 'custom-icon',
              iconSize: [20, 20],
              html: ReactDOMServer.renderToString(<IconCircleFilled size={20} className={classes.icon} />),
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

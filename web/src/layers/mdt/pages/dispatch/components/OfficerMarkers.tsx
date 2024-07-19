import React from 'react';
import { Marker } from 'react-leaflet';
import * as ReactDOMServer from 'react-dom/server';
import { createStyles, Text } from '@mantine/core';
import { useNuiEvent } from '../../../../../hooks/useNuiEvent';
import { debugData } from '../../../../../utils/debugData';
import { IconCircleFilled } from '@tabler/icons-react';
import L from 'leaflet';
import MarkerPopup from './MarkerPopup';
import { Officer } from '../../../../../typings';
import { gameToMap } from './Map';

const useStyles = createStyles((theme) => ({
  icon: {
    color: theme.colors.blue[8],
  },
}));

const OfficerMarkers: React.FC = () => {
  const [officers, setOfficers] = React.useState<Officer[]>([]);
  const { classes } = useStyles();

  debugData<Officer[]>([
    {
      data: [
        { firstName: 'John', lastName: 'Snow', position: [0, 0, 0], stateId: '391231', playerId: 1 },
        {
          firstName: 'Billy',
          lastName: 'Bob',
          position: [250, 250, 250],
          callSign: 564,
          stateId: '312351',
          playerId: 2,
        },
        {
          firstName: 'Merry',
          lastName: 'Jane',
          position: [300, 1000, 0],
          callSign: 751,
          stateId: '103214',
          playerId: 3,
        },
      ],
      action: 'updateOfficerPositions',
    },
  ]);

  useNuiEvent<Officer[]>('updateOfficerPositions', (data) => {
    setOfficers(data);
  });

  return (
    <>
      {officers.length > 0 &&
        officers.map((officer) => (
          <Marker
            key={officer.stateId}
            position={gameToMap(officer.position[0], officer.position[1])}
            icon={L.divIcon({
              className: 'custom-icon',
              iconSize: [20, 20],
              html: ReactDOMServer.renderToString(<IconCircleFilled size={20} className={classes.icon} />),
            })}
          >
            <MarkerPopup>
              <Text>
                {officer.firstName} {officer.lastName} {officer.callSign ? `(${officer.callSign})` : ''}
              </Text>
            </MarkerPopup>
          </Marker>
        ))}
    </>
  );
};

export default OfficerMarkers;

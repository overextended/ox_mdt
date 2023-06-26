import React from 'react';
import { Marker } from 'react-leaflet';
import * as ReactDOMServer from 'react-dom/server';
import { createStyles, Text } from '@mantine/core';
import { useNuiEvent } from '../../../hooks/useNuiEvent';
import { debugData } from '../../../utils/debugData';
import { IconCircleFilled } from '@tabler/icons-react';
import L from 'leaflet';
import MarkerPopup from './MarkerPopup';

interface OfficerPosition {
  name: string;
  callSign: number;
  position: [number, number];
}

const useStyles = createStyles((theme) => ({
  icon: {
    color: theme.colors.blue[8],
  },
}));

const OfficerMarkers: React.FC = () => {
  const [officers, setOfficers] = React.useState<OfficerPosition[]>([]);
  const { classes } = useStyles();

  debugData<OfficerPosition[]>([
    {
      data: [
        { name: 'John Snow', position: [0, 0], callSign: 199 },
        { name: 'Billy Bob', position: [250, 250], callSign: 564 },
        { name: 'Merry Jane', position: [1000, 300], callSign: 751 },
      ],
      action: 'updateOfficerPositions',
    },
  ]);

  useNuiEvent<OfficerPosition[]>('updateOfficerPositions', (data) => {
    setOfficers(data);
  });

  return (
    <>
      {officers.length > 0 &&
        officers.map((officer) => (
          <Marker
            key={officer.callSign}
            position={officer.position}
            icon={L.divIcon({
              className: 'custom-icon',
              iconSize: [20, 20],
              html: ReactDOMServer.renderToString(<IconCircleFilled size={20} className={classes.icon} />),
            })}
          >
            <MarkerPopup>
              <Text>
                {officer.name} ({officer.callSign})
              </Text>
            </MarkerPopup>
          </Marker>
        ))}
    </>
  );
};

export default OfficerMarkers;

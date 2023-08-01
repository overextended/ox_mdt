import React from 'react';
import { Popup } from 'react-leaflet';
import { createStyles } from '@mantine/core';

interface Props {
  children?: React.ReactNode;
}

const useStyles = createStyles((theme) => ({
  popup: {
    '> .leaflet-popup-content-wrapper': {
      backgroundColor: theme.colors.durple[4],
      color: theme.colors.dark[0],
      borderRadius: theme.radius.md,
      '> .leaflet-popup-content': {
        margin: 0,
        width: 'fit-content',
        padding: 8,
      },
    },
    '.leaflet-popup-tip': {
      backgroundColor: theme.colors.durple[4],
    },
  },
}));

const MarkerPopup: React.FC<Props> = ({ children }) => {
  const { classes } = useStyles();

  return (
    <Popup closeButton={false} className={classes.popup}>
      {children}
    </Popup>
  );
};

export default MarkerPopup;

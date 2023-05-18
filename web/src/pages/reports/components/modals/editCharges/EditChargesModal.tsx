import React from 'react';
import {
  Button,
  Divider,
  Grid,
  Stack,
  TextInput,
  Text,
  Group,
  createStyles,
  ActionIcon,
  SimpleGrid,
} from '@mantine/core';
import { IconMinus, IconPlus, IconSearch } from '@tabler/icons-react';
import ChargeCardsList from './ChargeCardsList';
import SelectedChargesList from './SelectedChargesList';

const useStyles = createStyles((theme) => ({
  countButton: {
    backgroundColor: theme.colors.dark[4],
    '&:hover': {
      backgroundColor: theme.colors.durple[2],
    },
  },
  infoContainer: {
    backgroundColor: theme.colors.durple[2],
    borderRadius: theme.radius.md,
    padding: 4,
    '&:hover': {
      backgroundColor: theme.colors.durple[0],
    },
  },
}));

const EditChargesModal: React.FC = () => {
  const { classes } = useStyles();

  return (
    <Grid grow h="100%">
      <Grid.Col span={7}>
        <Stack>
          <TextInput icon={<IconSearch size={20} />} placeholder="Search charges..." />
          <ChargeCardsList />
        </Stack>
      </Grid.Col>
      <Divider orientation="vertical" sx={{ marginBottom: '8px' }} />
      <Grid.Col span={3}>
        <SelectedChargesList />
      </Grid.Col>
    </Grid>
  );
};

export default EditChargesModal;

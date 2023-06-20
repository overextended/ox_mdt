import React from 'react';
import { ActionIcon, Badge, createStyles, Divider, Group, Stack, Text } from '@mantine/core';
import { IconCar, IconEdit, IconTrash } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  unitContainer: {
    background: theme.colors.durple[5],
    boxShadow: theme.shadows.md,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
  },
}));

const UnitCard: React.FC = () => {
  const { classes } = useStyles();

  return (
    <Stack className={classes.unitContainer}>
      <Group position="apart">
        <Group spacing="xs">
          <IconCar />-<Text>Unit 1</Text>
        </Group>
        <Group spacing={8}>
          <ActionIcon color="blue" variant="light">
            <IconEdit size={20} />
          </ActionIcon>
          <ActionIcon color="red" variant="light">
            <IconTrash size={20} />
          </ActionIcon>
        </Group>
      </Group>
      <Group spacing="xs">
        <Badge>John Doe (132)</Badge>
        <Badge>Michael smith (295)</Badge>
        <Badge>Pog Champer (499)</Badge>
      </Group>
    </Stack>
  );
};

export default UnitCard;

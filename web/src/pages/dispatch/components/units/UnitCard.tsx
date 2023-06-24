import React from 'react';
import { ActionIcon, Badge, createStyles, Divider, Group, Stack, Text } from '@mantine/core';
import {
  IconCar,
  IconEdit,
  IconHelicopter,
  IconLogin,
  IconLogout,
  IconMotorbike,
  IconSpeedboat,
  IconTrash,
} from '@tabler/icons-react';
import { Unit } from '../../../../typings';
import { useCharacter } from '../../../../state';

const useStyles = createStyles((theme) => ({
  unitContainer: {
    background: theme.colors.durple[5],
    boxShadow: theme.shadows.md,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
  },
}));

const UnitCard: React.FC<{ unit: Unit }> = ({ unit }) => {
  const { classes } = useStyles();
  const character = useCharacter();

  return (
    <Stack className={classes.unitContainer}>
      <Group position="apart">
        <Group spacing="xs">
          {unit.type === 'car' ? (
            <IconCar />
          ) : unit.type === 'motor' ? (
            <IconMotorbike />
          ) : unit.type === 'boat' ? (
            <IconSpeedboat />
          ) : (
            <IconHelicopter />
          )}
          ·<Text>{unit.name}</Text>
        </Group>
        <Group spacing={8}>
          <ActionIcon color={character.unit === unit.id ? 'red' : 'blue'} variant="light">
            {character.unit === unit.id ? <IconLogout size={20} /> : <IconLogin size={20} />}
          </ActionIcon>
        </Group>
      </Group>
      {unit.members.length > 0 && (
        <Group spacing="xs">
          {unit.members.map((member) => (
            <Badge key={member.callSign}>
              {member.name} ({member.callSign})
            </Badge>
          ))}
        </Group>
      )}
    </Stack>
  );
};

export default UnitCard;

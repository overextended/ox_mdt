import React from 'react';
import { ActionIcon, Badge, createStyles, Group, Stack, Text } from '@mantine/core';
import { IconCar, IconHelicopter, IconLogin, IconLogout, IconMotorbike, IconSpeedboat } from '@tabler/icons-react';
import { Unit } from '../../../../typings';
import { useCharacterState } from '../../../../state';
import { fetchNui } from '../../../../utils/fetchNui';
import { queryClient } from '../../../../main';

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
  const [character, setCharacter] = useCharacterState();

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
          <ActionIcon
            color={character.unit === unit.id ? 'red' : 'blue'}
            variant="light"
            onClick={async () => {
              if (character.unit === unit.id) {
                setCharacter((prev) => ({ ...prev, unit: undefined }));
                const resp = await fetchNui('leaveUnit', { data: 1 });
                queryClient.invalidateQueries(['units']);

                return;
              }
              const resp = await fetchNui('joinUnit', unit.id, { data: 1 });
              queryClient.invalidateQueries(['units']);
              setCharacter((prev) => ({ ...prev, unit: unit.id }));
            }}
          >
            {character.unit === unit.id ? <IconLogout size={20} /> : <IconLogin size={20} />}
          </ActionIcon>
        </Group>
      </Group>
      {unit.members.length > 0 && (
        <Group spacing="xs">
          {unit.members.map((member) => (
            <Badge key={member.stateId}>
              {member.firstName} {member.lastName} {member.callSign ? `(${member.callSign})` : ''}
            </Badge>
          ))}
        </Group>
      )}
    </Stack>
  );
};

export default React.memo(UnitCard);

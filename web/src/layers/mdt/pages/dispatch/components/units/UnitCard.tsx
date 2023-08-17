import React from 'react';
import { ActionIcon, Badge, createStyles, Group, Stack, Text } from '@mantine/core';
import { IconCar, IconHelicopter, IconLogin, IconLogout, IconMotorbike, IconSpeedboat } from '@tabler/icons-react';
import { Unit } from '../../../../../../typings';
import { useSetCharacter } from '../../../../../../state';
import { fetchNui } from '../../../../../../utils/fetchNui';
import BadgeButton from '../../../../components/BadgeButton';
import locales from '../../../../../../locales';
import { modals } from '@mantine/modals';
import ManageOfficersModal from '../modals/ManageOfficersModal';
const useStyles = createStyles((theme) => ({
  unitContainer: {
    background: theme.colors.durple[5],
    boxShadow: theme.shadows.md,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    lineHeight: 'normal',
  },
}));

const UnitCard: React.FC<{ unit: Unit; isInThisUnit: boolean; isDispatch: boolean }> = ({
  unit,
  isInThisUnit,
  isDispatch,
}) => {
  const { classes } = useStyles();
  const setCharacter = useSetCharacter();

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
            color={isInThisUnit ? 'red' : 'blue'}
            variant="light"
            onClick={async () => {
              if (isInThisUnit) {
                await fetchNui('leaveUnit', { data: 1 });
                setCharacter((prev) => ({ ...prev, unit: undefined }));

                return;
              }
              await fetchNui('joinUnit', unit.id, { data: 1 });
              setCharacter((prev) => ({ ...prev, unit: unit.id }));
            }}
          >
            {isInThisUnit ? <IconLogout size={20} /> : <IconLogin size={20} />}
          </ActionIcon>
        </Group>
      </Group>
      <Group spacing="xs">
        <BadgeButton
          label={locales.manage_officers}
          disabled={!isDispatch}
          onClick={() =>
            modals.open({
              title: locales.manage_officers,
              children: <ManageOfficersModal id={unit.id} members={unit.members} />,
            })
          }
        />
        {unit.members.map((member) => (
          <Badge key={member.stateId}>
            {member.firstName} {member.lastName} {member.callSign ? `(${member.callSign})` : ''}
          </Badge>
        ))}
      </Group>
    </Stack>
  );
};

export default React.memo(UnitCard);

import React from 'react';
import { BOLO } from '../../../../../../../typings/bolo';
import { createStyles, Group, Stack, Text, Image, ActionIcon, Avatar, Menu } from '@mantine/core';
import ReadOnlyEditor from '../../../../../components/ReadOnlyEditor';
import { modals } from '@mantine/modals';
import dayjs from 'dayjs';
import { IconDots, IconEdit, IconTrash } from '@tabler/icons-react';
import locales from '../../../../../../../locales';

interface Props {
  bolo: BOLO;
}

const useStyles = createStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.durple[4],
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
    padding: theme.spacing.md,
    minHeight: 120,
    flex: '1 0 auto',
  },
  image: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

const BoloCard: React.FC<Props> = ({ bolo }) => {
  const { classes } = useStyles();

  return (
    <Stack className={classes.container}>
      <Group position="apart">
        <Group h="100%">
          <Avatar variant="light" color="blue" />
          <Stack spacing={0} align="start">
            <Text c="dark.0" size="md" weight={500}>{`${bolo.firstName} ${bolo.lastName} · ${bolo.callSign}`}</Text>
            <Text c="dark.2" size="xs">
              {dayjs(bolo.createdAt).fromNow()}
            </Text>
          </Stack>
        </Group>
        <Menu position="bottom-end" offset={3} withArrow arrowPosition="center">
          <Menu.Target>
            <ActionIcon variant="light" color="blue" size="lg">
              <IconDots />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item icon={<IconEdit size={18} />}>{locales.edit}</Menu.Item>
            <Menu.Item color="red" icon={<IconTrash size={18} />}>
              {locales.delete}
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
      <ReadOnlyEditor content={bolo.contents} />
      {bolo.images && bolo.images.length > 0 && (
        <Group spacing="xs">
          {bolo.images.map((image) => (
            <Image
              src={image}
              width={105}
              height={105}
              radius="md"
              className={classes.image}
              onClick={() =>
                modals.open({
                  children: <Image src={image} onClick={() => modals.closeAll()} />,
                  withCloseButton: false,
                  padding: 0,
                  size: 'unset',
                  styles: {
                    content: {
                      maxWidth: '50%',
                      maxHeight: '50%',
                    },
                  },
                  transitionProps: { transition: 'pop' },
                })
              }
            />
          ))}
        </Group>
      )}
    </Stack>
  );
};

export default React.memo(BoloCard);

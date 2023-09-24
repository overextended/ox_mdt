import React from 'react';
import { BOLO } from '../../../../../../../typings/bolo';
import { createStyles, Group, Stack, Text, Image } from '@mantine/core';
import ReadOnlyEditor from '../../../../../components/ReadOnlyEditor';
import { modals } from '@mantine/modals';
import dayjs from 'dayjs';

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
      <Group position="apart">
        <Text c="dark.2" size="xs">{`${bolo.firstName} ${bolo.lastName} · ${bolo.callSign}`}</Text>
        <Text c="dark.2" size="xs">
          {dayjs(bolo.createdAt).fromNow()}
        </Text>
      </Group>
    </Stack>
  );
};

export default BoloCard;

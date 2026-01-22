import React from 'react';
import { ActionIcon, Box, createStyles, Image, Tooltip, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { Report } from '../../../../../../typings';
import { IconX } from '@tabler/icons-react';
import locales from '../../../../../../locales';
import { useReportId, useSetEvidence } from '../../../../../../state';
import { fetchNui } from '../../../../../../utils/fetchNui';

const useStyles = createStyles((theme) => ({
  container: {
    position: 'relative',
  },
  image: {
    zIndex: 2,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  actionIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },
}));

const EvidenceImage: React.FC<{ evidence: { label: string; image: string } }> = ({ evidence }) => {
  const { classes } = useStyles();
  const [isHovering, setIsHovering] = React.useState(false);
  const setEvidence = useSetEvidence();
  const id = useReportId();

  return (
    <Tooltip label={evidence.label}>
      <Box
        className={classes.container}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Image
          src={evidence.image}
          key={`${evidence.label}-${evidence.image}`}
          radius="sm"
          width={105}
          height={105}
          className={classes.image}
          onClick={() =>
            modals.open({
              children: <Image src={evidence.image} onClick={() => modals.closeAll()} />,
              withCloseButton: false,
              padding: 0,
              size: 'unset',
              transitionProps: { transition: 'pop' },
            })
          }
        />
        {isHovering && (
          <ActionIcon
            variant="filled"
            color="red"
            radius="sm"
            size="xs"
            className={classes.actionIcon}
            onClick={() =>
              modals.openConfirmModal({
                title: locales.remove_evidence,
                children: (
                  <Text size="sm" c="dark.2">
                    {locales.remove_evidence_confirm.format(evidence.label)}
                  </Text>
                ),
                labels: { confirm: locales.confirm, cancel: locales.cancel },
                confirmProps: { color: 'red' },
                groupProps: { spacing: 6 },
                onConfirm: async () => {
                  await fetchNui('removeEvidence', { id, label: evidence.label, image: evidence.image }, { data: 1 });
                  setEvidence((prev) =>
                    prev.filter(
                      (prevEvidence) => prevEvidence.image !== evidence.image && prevEvidence.label !== evidence.label
                    )
                  );
                },
              })
            }
          >
            <IconX />
          </ActionIcon>
        )}
      </Box>
    </Tooltip>
  );
};

export default EvidenceImage;

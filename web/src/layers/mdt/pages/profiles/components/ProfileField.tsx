import React from 'react';
import { createStyles, rem, TextInput } from '@mantine/core';
import { TablerIconsProps } from '@tabler/icons-react';

interface Props {
  icon: (props: TablerIconsProps) => JSX.Element;
  label: string;
  value: string | number;
}

// https://ui.mantine.dev/category/inputs#contained-inputs

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
  },

  input: {
    height: rem(54),
    paddingTop: rem(18),
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.xs,
    paddingTop: `calc(${theme.spacing.sm} / 2)`,
    zIndex: 1,
    color: theme.colors.dark[2],
  },

  icon: {
    marginTop: rem(18),
    color: theme.colors.dark[0],
  },
}));

const ProfileField: React.FC<Props> = (props) => {
  const { classes } = useStyles();

  return (
    <TextInput label={props.label} value={props.value} classNames={classes} readOnly icon={<props.icon size={20} />} />
  );
};

export default ProfileField;

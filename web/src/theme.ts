import { MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
  fontFamily: 'Roboto',
  colorScheme: 'dark',
  shadows: {
    md: '0 4px 3px rgba(0, 0, 0, 0.07)',
  },
  components: {
    Button: {
      styles: (theme, _, { variant }) => ({
        root: {
          backgroundColor: variant === 'default' ? theme.colors.durple[2] : undefined,
          borderColor: variant === 'default' ? 'transparent' : undefined,
          color: variant === 'default' ? theme.colors.dark[0] : undefined,
          '&:hover': {
            backgroundColor: variant === 'default' ? theme.colors.durple[0] : undefined,
            color: variant === 'default' ? 'white' : undefined,
          },
        },
      }),
    },
    Input: {
      styles: (theme) => ({
        input: {
          backgroundColor: theme.colors.durple[4],
          borderColor: 'transparent',
        },
      }),
    },
    Menu: {
      styles: (theme) => ({
        dropdown: {
          backgroundColor: theme.colors.durple[6],
          borderColor: theme.colors.durple[2],
        },
        arrow: {
          borderColor: theme.colors.durple[2],
        },
      }),
    },
    Modal: {
      styles: (theme) => ({
        header: {
          backgroundColor: theme.colors.durple[6],
        },
        body: {
          backgroundColor: theme.colors.durple[6],
        },
      }),
    },
  },
  colors: {
    durple: [
      '#3F404C',
      '#393A45',
      '#33343F',
      '#2E2F3A',
      '#2A2B35',
      '#262730',
      '#22232C',
      '#1F2027',
      '#1C1D23',
      '#191A20',
    ],
  },
};

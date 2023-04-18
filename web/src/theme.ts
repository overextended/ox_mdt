import { MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
  fontFamily: 'Roboto',
  colorScheme: 'dark',
  components: {
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

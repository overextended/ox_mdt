import { MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
  fontFamily: 'Roboto',
  colorScheme: 'dark',
  shadows: {
    md: '0 4px 3px rgba(0, 0, 0, 0.07)',
  },
  components: {
    Tooltip: {
      styles: (theme) => ({
        tooltip: {
          fontSize: 13,
          backgroundColor: theme.colors.durple[0],
          color: theme.colors.dark[0],
        },
      }),
    },
    Checkbox: {
      styles: (theme) => ({
        input: {
          backgroundColor: theme.colors.durple[4],
          borderColor: theme.colors.durple[2],
        },
      }),
    },
    Select: {
      styles: (theme) => ({
        dropdown: {
          backgroundColor: theme.colors.durple[4],
          borderColor: 'transparent',
        },
        item: {
          '&:hover': {
            backgroundColor: theme.colors.durple[2],
          },
        },
      }),
    },
    Badge: {
      defaultProps: { variant: 'default' },
      variants: {
        default: (theme) => ({
          root: {
            backgroundColor: theme.colors.durple[2],
            color: theme.colors.dark[0],
          },
        }),
      },
    },
    RichTextEditor: {
      styles: (theme) => ({
        content: {
          backgroundColor: theme.colors.durple[4],
          borderRadius: 0,
          fontSize: 14,
          '> .ProseMirror > blockquote': {
            fontSize: 14,
            padding: 0,
            paddingLeft: 16,
          },
        },
        toolbar: {
          backgroundColor: theme.colors.durple[4],
          borderColor: theme.colors.durple[3],
        },
        root: {
          borderColor: theme.colors.durple[3],
        },
        control: {
          backgroundColor: theme.colors.durple[2],
        },
      }),
    },
    Button: {
      variants: {
        default: (theme) => ({
          root: {
            backgroundColor: theme.colors.durple[2],
            borderColor: 'transparent',
            color: theme.colors.dark[0],
            '&:hover': {
              backgroundColor: theme.colors.durple[0],
              color: 'white',
            },
          },
        }),
      },
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

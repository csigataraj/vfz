import {
  ColorModeContextType,
  extendTheme,
  theme as defaultTheme,
} from '@chakra-ui/react';

const breakpoints = {
  xs: '375px',
  sm: '425px',
  md: '800px',
  lg: '1000px',
  xl: '1400px',
};

const lightTheme = {
  colors: {
    gray: {
      50: '#ffffff',
      100: '#f0f0f0',
      200: '#e0e0e0',
      300: '#c0c0c0',
      400: '#a0a0a0',
      500: '#808080',
      600: '#606060',
      700: '#404040',
      800: '#303030',
      900: '#202020',
    },
  },
};

const darkTheme = {
  colors: {
    gray: {
      50: '#f9f9f9',
      100: '#ededed',
      200: '#d3d3d3',
      300: '#b3b3b3',
      400: '#a0a0a0',
      500: '#898989',
      600: '#6c6c6c',
      700: '#202020',
      800: '#121212',
      900: '#111',
    },
  },
};

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: (props: ColorModeContextType) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.50',
        color: props.colorMode === 'dark' ? 'white' : 'black',
      },
    }),
  },
  breakpoints: {
    ...defaultTheme.breakpoints,
    ...breakpoints,
  },
  ...lightTheme,
  ...darkTheme,
});

export default theme;

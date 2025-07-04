import { extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    50: '#E6F7FF',
    100: '#BAE7FF',
    200: '#91D5FF',
    300: '#69C0FF',
    400: '#40A9FF',
    500: '#1890FF',
    600: '#096DD9',
    700: '#0050B3',
    800: '#003A8C',
    900: '#002766',
  },
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
};

const shadows = {
  card: '0px 4px 20px rgba(0, 0, 0, 0.05)',
  hover: '0px 8px 30px rgba(0, 0, 0, 0.08)',
};

const fonts = {
  body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
  heading: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: '500',
      borderRadius: '8px',
    },
    variants: {
      solid: {
        bg: 'brand.500',
        color: 'white',
        _hover: {
          bg: 'brand.600',
          _disabled: {
            bg: 'brand.500',
          },
        },
        _active: { bg: 'brand.700' },
      },
      outline: {
        borderColor: 'brand.500',
        color: 'brand.500',
        _hover: {
          bg: 'brand.50',
        },
      },
      ghost: {
        color: 'gray.600',
        _hover: {
          bg: 'gray.100',
        },
      },
    },
  },
  Input: {
    baseStyle: {
      field: {
        borderRadius: '8px',
      },
    },
    variants: {
      outline: {
        field: {
          borderColor: 'gray.200',
          _focus: {
            borderColor: 'brand.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
          },
        },
      },
    },
  },
  Card: {
    baseStyle: {
      container: {
        borderRadius: '12px',
        boxShadow: 'card',
        overflow: 'hidden',
        transition: 'all 0.2s ease-in-out',
        _hover: {
          boxShadow: 'hover',
        },
      },
    },
  },
  Table: {
    variants: {
      simple: {
        th: {
          borderColor: 'gray.200',
          backgroundColor: 'gray.50',
          color: 'gray.700',
          fontSize: 'sm',
          fontWeight: '600',
        },
        td: {
          borderColor: 'gray.100',
        },
      },
    },
  },
};

const theme = extendTheme({
  colors,
  shadows,
  fonts,
  components,
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800',
      },
    },
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

export default theme; 
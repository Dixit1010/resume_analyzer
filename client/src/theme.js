import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false
  },
  colors: {
    brand: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e'
    }
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? '#0a0a0a' : '#fafafa',
        color: props.colorMode === 'dark' ? '#ffffff' : '#1a202c'
      }
    })
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'brand'
      },
      variants: {
        solid: {
          borderRadius: '8px',
          fontWeight: '500',
          _hover: {
            transform: 'translateY(-1px)',
            boxShadow: 'lg'
          },
          transition: 'all 0.2s'
        }
      }
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }
      }
    }
  }
});

export default theme;


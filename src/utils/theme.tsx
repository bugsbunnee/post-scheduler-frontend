import { switchAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, extendTheme, ThemeConfig } from '@chakra-ui/react';

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(switchAnatomy.keys)


const config: ThemeConfig = {
	initialColorMode: 'dark',
};

const switchTheme = defineMultiStyleConfig({ 
    baseStyle: {
        track: {
            bg: 'gray.200',
            _checked: {
                bg: 'green.300'
            }
        }
    }
});

const theme = extendTheme({
    components: { Switch: switchTheme },
	config,
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
		blue: {
			100: '#1976d2',
		},
		red: {
			700: '#ab3c3c',
		},
		error: {
			100: 'tomato',
		},
	},
	fonts: {
		heading: `'Space Grotesk', sans-serif`,
		body: `'Space Grotesk', sans-serif`,
	},
});

export default theme;

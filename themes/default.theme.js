/* @flow */

import color from 'color';
import { primaryColor } from './colors';
import { DefaultTheme } from 'react-native-paper';

export const H2HTheme = {
    dark: true,
    roundness: 4,
    colors: {
        primary: '#008FB8',
        accent: color(primaryColor).darken(.5).string(),
        background: '#f6f6f6',
        surface: '#ffffff',
        error: '#B00020',
        text: '#000000',
        disabled: color('#000000')
            .alpha(0.26)
            .rgb()
            .string(),
        placeholder: color('#000000')
            .alpha(0.54)
            .rgb()
            .string(),
        backdrop: color('#000000')
            .alpha(0.5)
            .rgb()
            .string(),
    },
    fonts: DefaultTheme.fonts
};

/* @flow */

import color from 'color';
import { primaryColor } from './colors';
import { DefaultTheme } from 'react-native-paper';

export const H2HTheme = {
    dark: false,
    roundness: 4,
    colors: {
        primary: primaryColor,
        accent: color(primaryColor)
            .darken(0.5)
            .string(),
        background: '#f6f6f6',
        surface: '#fafafa',
        error: '#B00020',
        text: '#000000',
        disabled: color('#efefef')
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
    fonts: DefaultTheme.fonts,
};

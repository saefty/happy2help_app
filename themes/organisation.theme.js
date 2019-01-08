/* @flow */

import color from 'color';

import { Platform } from 'react-native';
import { H2HTheme } from './default.theme';

const isIOS = Platform.OS === 'ios';

const fonts = {
    regular: isIOS ? 'Helvetica Neue' : 'Roboto',
    medium: isIOS ? 'HelveticaNeue-Medium' : 'Roboto',
    light: isIOS ? 'HelveticaNeue-Light' : 'Roboto',
    thin: isIOS ? 'HelveticaNeue-Thin' : 'Roboto',
};

export default fonts;
export const H2HOrganisationTheme = {
    dark: false,
    roundness: 0,
    colors: {
        primary: H2HTheme.colors.accent,
        accent: color(H2HTheme.colors.accent)
            .lighten(0.1)
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
    fonts,
};

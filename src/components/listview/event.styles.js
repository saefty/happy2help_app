// @flow
import { StyleSheet } from 'react-native';
import { H2HTheme } from '../../../themes/default.theme';
import color from 'color';

export const styles = StyleSheet.create({
    defaultStyle: {
        borderColor: color(H2HTheme.colors.primary)
            .darken(0.3)
            .alpha(0.2)
            .rgb()
            .string(),
        borderWidth: 5,
    },
    highLightStyle: {
        borderColor: color(H2HTheme.colors.primary)
            .darken(0.25)
            .rgb()
            .string(),
        borderWidth: 5,
    },
});

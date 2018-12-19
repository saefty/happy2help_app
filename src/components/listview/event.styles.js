// @flow
import { StyleSheet } from 'react-native';
import { H2HTheme } from '../../../themes/default.theme';
import color from 'color';

export const styles = StyleSheet.create({
    defaultStyle: {
        borderColor: color(H2HTheme.colors.primary)
            .lighten(0.25)
            .rgb()
            .string(),
        borderWidth: 3,
        borderRadius: 10,
    },
    highLightStyle: {
        borderColor: color(H2HTheme.colors.primary)
            .darken(0.25)
            .rgb()
            .string(),
        borderWidth: 3,
        borderRadius:10,
    },

    title:{
        marginTop:10,
        color: '#008fb8',
        fontSize: 20,
        fontWeight:'bold',
    },

    creator: {
        fontStyle: 'italic'
    },
});

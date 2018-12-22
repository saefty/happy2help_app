// @flow
import { StyleSheet } from 'react-native';
import color from 'color';
import { primaryColor } from '../../../../themes/colors';

export const styles = StyleSheet.create({
    card: {
        margin: 10,
    },
    defaultStyle: {
        borderColor: color(primaryColor)
            .lighten(0.25)
            .rgb()
            .string(),
        borderWidth: 3,
        borderRadius: 10,
    },
    highLightStyle: {
        borderColor: color(primaryColor)
            .darken(0.25)
            .rgb()
            .string(),
        borderWidth: 3,
        borderRadius: 10,
    },

    title: {
        marginTop: 10,
        color: primaryColor,
        fontSize: 20,
        fontWeight: 'bold',
    },

    creator: {
        fontStyle: 'italic',
    },
});

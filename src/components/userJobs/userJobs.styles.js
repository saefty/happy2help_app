/* @flow */

import { StyleSheet } from 'react-native';
import { neutralColors } from '../../../themes/colors';

const styles = StyleSheet.create({
    card: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
    },

    container: {
        alignContent: 'center',
        backgroundColor: neutralColors.surface,
    },
    header: {
        backgroundColor: neutralColors.dark,
        justifyContent: 'center',
    },

    title: {
        color: '#fff',
        fontSize: 25,
        marginLeft: 5,
        marginBottom: 2,
    },

    list: {
        height: '50%',
    },

    fab: {
        position: 'absolute',
    },
});

export default styles;

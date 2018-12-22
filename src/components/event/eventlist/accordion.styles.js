/* @flow */

import { StyleSheet } from 'react-native';
import { neutralColors } from '../../../../themes/colors';

const styles = StyleSheet.create({
    item: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5,
        borderWidth: 1,
        borderColor: neutralColors.dark,
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    radioButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default styles;

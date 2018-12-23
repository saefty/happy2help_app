import { StyleSheet } from 'react-native';
import { H2HTheme } from '../../../themes/default.theme';
import { primaryColor } from '../../../themes/colors';

export const segmentStyle = StyleSheet.create({
    list: {
        width: '100%',
        alignSelf: 'center',
    },

    tabsContainerStyle: {
        height: 50,
        backgroundColor: 'transparent',
    },

    tabStyle: {
        borderWidth: 0,
        borderColor: 'transparent',
        backgroundColor: 'transparent',
    },

    activeTabStyle: {
        backgroundColor: 'transparent',
        borderBottomColor: primaryColor,
        borderBottomWidth: 4,
    },

    tabTextStyle: {
        fontWeight: 'bold',
        color: primaryColor,
    },

    activeTabTextStyle: {
        color: primaryColor,
    },
});

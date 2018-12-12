import { StyleSheet } from 'react-native';
import { H2HTheme } from '../../../themes/default.theme';

export const segmentStyle = StyleSheet.create({
    list: {
        width: '100%',
        alignSelf: 'center',
    },

    tabsContainerStyle: {
        height: 50,
        backgroundColor: H2HTheme.colors.primary,
    },

    tabStyle: {
        backgroundColor: 'white',
        borderWidth: 0,
        borderColor: 'transparent',
    },

    activeTabStyle: {
        backgroundColor: 'white',
        marginBottom: 4,
    },

    tabTextStyle: {
        fontWeight: 'bold',
        color: H2HTheme.colors.primary,
    },

    activeTabTextStyle: {
        color: H2HTheme.colors.primary,
    },
});

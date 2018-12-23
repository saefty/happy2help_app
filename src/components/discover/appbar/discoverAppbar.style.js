import { H2HTheme } from '../../../../themes/default.theme';
import { StyleSheet } from 'react-native';

export const DiscoverAppbarStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        height: 56,
        alignSelf: 'center',
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
    },

    menuButton: {
        alignSelf: 'center',
        left: 4,
    },

    searchContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        height: 42,
        width: '70%',
    },

    searchBar: {
        height: 42,
        width: '100%',
    },

    filterButton: {
        alignSelf: 'center',
        right: 4,
    },
});

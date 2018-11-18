import { H2HTheme } from '../../../themes/default.theme';
import { StyleSheet } from 'react-native';

export const MapStyle = StyleSheet.create({
    mapContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        position: 'absolute',
    },
    map: {
        flex: 1
    },
    logOut: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    clusterStyle: {
        backgroundColor: H2HTheme.colors.accent,
        width: 30,
        height: 30,
        borderRadius: 30,
        justifyContent: 'center',
    },
    clusterStyleText: {
        color: 'white',
        textAlignVertical: "center",
        textAlign: "center",
    }
});
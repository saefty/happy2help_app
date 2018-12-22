import { StyleSheet } from 'react-native';
import { secondaryColor } from '../../../../themes/colors';

export const MapStyle = StyleSheet.create({
    mapContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        position: 'absolute',
    },
    map: {
        flex: 1,
    },
    logOut: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    clusterStyle: {
        backgroundColor: secondaryColor,
        width: 30,
        height: 30,
        borderRadius: 30,
        justifyContent: 'center',
    },
    clusterStyleText: {
        color: 'white',
        textAlignVertical: 'center',
        textAlign: 'center',
    },
});

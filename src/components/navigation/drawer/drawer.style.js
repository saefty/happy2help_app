import { StyleSheet } from 'react-native';
export const DrawerStyle = StyleSheet.create({
    qrStyle: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    logoutContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
    },
    logoutButton: {
        width: '100%',
        margin: 0,
        height: 40,
    },
    profilePicture: {
        width: 110,
        height: 110,
        borderRadius: 150,
        margin: 10,
        justifyContent: 'flex-start',
    },
});

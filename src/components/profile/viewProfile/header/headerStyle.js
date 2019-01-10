// @flow
import { StyleSheet } from 'react-native';
import { primaryColor } from '../../../../../themes/colors';

export const styles = StyleSheet.create({
    container: {
        height: '40%',
        justifyContent: 'flex-start',
    },
    background: {
        backgroundColor: primaryColor,
        position: 'absolute',
        height: '50%',
        width: '100%',
        top: 0,
    },
    pictureContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '85%',
    },
    profilePicture: {
        height: 180,
        width: 180,
        borderRadius: 150,
        margin: 10,
        borderWidth: 4,
        borderColor: 'white',
    },
    infoContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    name: {
        fontSize: 24,
        fontWeight: '400',
    },
    location: {
        fontSize: 11,
    },
});

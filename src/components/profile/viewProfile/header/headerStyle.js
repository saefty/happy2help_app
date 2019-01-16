// @flow
import { StyleSheet } from 'react-native';
import { primaryColor } from '../../../../../themes/colors';

export const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
    },
    pictureContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        backgroundColor: primaryColor,
        position: 'absolute',
        height: '50%',
        width: '100%',
        top: 0,
    },
    profilePicture: {
        height: 180,
        width: 180,
        borderRadius: 150,
        borderWidth: 4,
        borderColor: 'white',
    },
    name: {
        fontSize: 24,
        fontWeight: '400',
        alignSelf: 'center',
    },
    location: {
        fontSize: 12,
        alignSelf: 'center',
    },
});

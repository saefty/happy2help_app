/* @flow */

import { StyleSheet } from 'react-native';
import { primaryColor, neutralTextColors, secondaryColor } from '../../../themes/colors';

export const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        height: 128,
        overflow: 'hidden',
        alignItems: 'center',
    },
    ownerContainer: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#F8F8F8',
        elevation: 2,
        padding: 8,
    },
    dateContainer: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    dateText: {
        marginTop: 2,
        fontSize: 25,
    },
    dateDay: {
        fontSize: 36,
        marginBottom: 2,
    },
    dates: { 
        fontSize: 14,
        fontWeight: 'bold',
        color: secondaryColor, 
        maxWidth: '80%' 
    },
    profilePicture: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 35,
        height: 35,
        borderRadius: 150,
        borderWidth: 1,
        borderColor: primaryColor,
    },
    eventImage: {
        flex: 1,
        alignSelf: 'stretch',
        width: undefined,
        height: undefined,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 0,
        marginTop: 12,
        marginBottom: 0,
        width: '80%',
    },
    subheading: {
        fontSize: 14,
        marginLeft: 4,
        marginRight: 8,
        width: '80%',
    },
    ownerText: {
        fontSize: 14,
        color: primaryColor,
    },
    subheadingIconBar: {
        flex: 0,
        flexDirection: 'row',
    },
});

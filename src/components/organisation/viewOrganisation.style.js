/* @flow */

import { StyleSheet } from 'react-native';
import { neutralColors } from '../../../themes/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: 100 + '%',
    },
    profilePicContainer: {
        alignItems: 'center',
    },
    imageContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1,
        height: 128,
        overflow: 'hidden',
        alignItems: 'center',
    },
    profilePicture: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 110,
        height: 110,
        borderRadius: 150,
        margin: 10,
        borderWidth: 4,
        borderColor: 'white',
    },
    titleBar: {
        flexDirection: 'row',
        height: 25,
    },
    nameContainer: {
        flex: 10,
        width: 100 + '%',
    },
    nameText: {
        margin: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
    iconContainer: {
        flex: 0,
        paddingTop: 11,
        fontSize: 60,
    },
    memberContainer: {
        flex: 0,
    },
    dividerContainer: {
        width: 100 + '%',
        height: 30,
    },
    divider: {
        backgroundColor: neutralColors.dark,
        margin: 30,
        height: 2,
    },
    accordionContainer: {
        paddingTop: 15,
        width: 96 + '%',
    },
    imgContainer: {
        flex: 1,
        height: 128,
        overflow: 'hidden',
        alignItems: 'center',
    },
    eventImage: {
        flex: 1,
        alignSelf: 'stretch',
        width: undefined,
        height: undefined,
    }
});

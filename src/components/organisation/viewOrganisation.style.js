/* @flow */

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        height: 100 + '%',
        width: 100 + '%',
    },
    headerContainer: {
        alignItems: 'center',
        width: 100 + '%',
        height: 140,
    },
    imageContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    profileContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    headerImage: {
        position: 'absolute',
        width: 100 + '%',
        height: 140,
    },
    profilePicture: {
        width: 110,
        height: 110,
        borderRadius: 150,
        margin: 10,
        borderWidth: 8,
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
        backgroundColor: '#cccccc',
        margin: 30,
        height: 2,
    },
    accordionContainer: {
        paddingTop: 15,
        width: 96 + '%',
        height: 100 + '%',
    },
});

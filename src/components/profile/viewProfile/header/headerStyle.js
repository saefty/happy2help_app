// @flow
import { StyleSheet } from 'react-native';
import { H2HTheme } from './../../../../../themes/default.theme';

export const styles = StyleSheet.create({
    container: {
        height: 100,
    },
    colouredBlock: {
        position: 'absolute',
        width: '100%',
        height: '50%',
        backgroundColor: H2HTheme.colors.primary,
    },
    headerTextContainer: {
        flex: 1,
        left: -20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    userName: {
        color: 'white',
        fontSize: 25,
        top: -10,
        fontWeight:'bold'
    },
    location: {
        fontSize: 15,
        fontStyle: 'italic'
        },
    nameAndLocationContainer: { margin: 10 },
    profilePicture: {
        width: 110,
        height: 110,
        borderRadius: 150,
        margin: 10,
        borderWidth: 4,
        borderColor: 'white',
    },
});

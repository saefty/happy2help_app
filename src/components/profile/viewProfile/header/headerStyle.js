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
        left: 0,
       // marginTop: 25,
        top:0,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    userName: {
        color: 'white',
        fontSize: 25,
        top: -15,
        fontWeight:'bold'
    },
    location: {
        fontSize: 15,
        fontStyle: 'italic',
        width: 230,
        position: 'absolute',
        top:20,
        //left: 124,
        },
    nameAndLocationContainer: {
        margin: 10,
        //marginTop: 10,
//        width: 200
    },
    profilePicture: {
        width: 110,
        height: 110,
        borderRadius: 150,
        margin: 10,
        borderWidth: 4,
        borderColor: 'white',
    },
});

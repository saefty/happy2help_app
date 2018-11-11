// @flow
import { StyleSheet } from 'react-native';
import { H2HTheme } from './../../../../themes/default.theme';


export const styles = StyleSheet.create({
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
    },
});

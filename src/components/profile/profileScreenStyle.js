// @flow
import { StyleSheet } from 'react-native';
import { H2HTheme } from '../../../themes/default.theme';



export const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        alignContent: 'center',
        flexDirection: 'column',
        backgroundColor: H2HTheme.colors.background,
    },
    outerContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
});

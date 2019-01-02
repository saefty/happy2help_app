// @flow
import { StyleSheet } from 'react-native';
import { neutralColors, primaryColor } from '../../../themes/colors';

export const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 15,
        padding: 20,
        width: '100%',
    },
    bannerWrapper: {
        alignItems: 'center',
    },
    banner: {
        width: '70%',
        marginBottom: 15,
    },
    button: {
        zIndex: -1,
        backgroundColor: neutralColors.background,
    },
    imgContainer: {
        flex: 1,
        height: 128,
        overflow: 'hidden',
        alignItems: 'center',
    },
    imgButton: {
        position: 'absolute',
        top: 60,
        right: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        backgroundColor: primaryColor,
        borderRadius: 60,
        bottom: 0,
    },
    eventImage: {
        flex: 1,
        alignSelf: 'stretch',
        width: undefined,
        height: undefined,
    }
});

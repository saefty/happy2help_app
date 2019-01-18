// @flow
import { StyleSheet } from 'react-native';
import color from 'color';
import { primaryColor, neutralTextColors } from '../../../../themes/colors';

export const styles = StyleSheet.create({
    card: {
        width: '100%',
        marginTop: 4,
        marginBottom: 10,
    },
    coverContainer: {
        flex: 1,
        height: 96,
    },
    cover: {
        flex: 1,
        alignSelf: 'stretch',
        width: undefined,
        height: undefined,
    },
    contentContainer: {
        marginTop: 10,
        flexDirection: 'row',
        marginBottom: 5,
    },
    dateContainer: {},
    rightContent: {
        marginLeft: 15,
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        maxWidth: '80%',
    },
    creatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    creatorText: {
        color: neutralTextColors.dark,
        maxWidth: '80%',
    },
    dates: {
        color: neutralTextColors.medium,
    },
    location: {
        color: neutralTextColors.medium,
    },
    distance: {
        color: neutralTextColors.medium,
        fontStyle: 'italic',
    },
    distanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
});

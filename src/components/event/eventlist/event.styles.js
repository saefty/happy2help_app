// @flow
import { StyleSheet } from 'react-native';
import color from 'color';
import { primaryColor, neutralTextColors } from '../../../../themes/colors';

export const styles = StyleSheet.create({
    card: {
        marginBottom: 10,
        borderRadius: 0,
    },
    coverContainer: {
        flex: 1,
        height: 96,
        overflow: 'hidden',
    },
    cover: {
        flex: 1,
        alignSelf: 'stretch',
        width: undefined,
        height: undefined,
    },
    contentContainer: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    dateContainer: { marginTop: 10 },
    rightContent: {
        marginLeft: 15,
        marginRight: 5,
        width: '100%',
    },
    title: {
        marginTop: 10,
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
        maxWidth: '80%',
    },
    location: {
        color: neutralTextColors.medium,
        maxWidth: '80%',
    },
    distance: {
        marginTop: 5,
        color: neutralTextColors.medium,
        fontStyle: 'italic',
    },
    distanceContainer: {
        width: '85%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    }
});

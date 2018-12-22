// @flow
import { StyleSheet } from 'react-native';
import { neutralColors } from '../../../../../themes/colors';

export const styles = StyleSheet.create({
    divider: { backgroundColor: neutralColors.light, marginVertical: 10, marginHorizontal: 20, height: 2 },
    outerContainer: { alignItems: 'center' },
    innerContainer: { flexDirection: 'row', alignItems: 'center' },
    title: { fontSize: 20 },
    creditPoints: { fontSize: 30 },
    view: { marginTop: 15 },
});

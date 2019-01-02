// @flow
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    modal: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: '#fff',
        elevation: 6,
    },
    modalOptions: {
        flex: 0,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    buttonText: {
        paddingLeft: 18,
        fontSize: 18,
    },
    buttonDelete: {
        paddingLeft: 18,
        fontSize: 18,
        color: 'red',
    }

});

/* @flow */

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    card: {
        marginLeft: 10,
        marginRight:10,
        marginBottom: 10,
    },
    
    container: {
        alignContent: 'center',
        backgroundColor: '#eee',
    },
    header: {
        backgroundColor: '#008FB8',
        justifyContent: 'center',
    },

    title: {
        color: '#fff',
        fontSize: 25,
        marginLeft: 5,
        marginBottom: 2,
    },

    list: {
        height: '50%',
    },

    fab: {
        position: 'absolute',
    },
});

export default styles;

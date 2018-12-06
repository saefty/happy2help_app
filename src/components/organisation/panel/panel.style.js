/* @flow */

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container   : {
        backgroundColor: '#F4F9FE',
        margin:10,
        overflow:'hidden'
    },
    titleContainer : {
        flexDirection: 'row',
    },
    title       : {
        flex    : 1,
        padding : 10,
        color   :'#2A2F43',
        fontWeight:'bold',
        fontSize: 20
    },
    buttonImage : {
        width   : 30,
        height  : 25
    },
    body        : {
        padding     : 10,
        paddingTop  : 0
    }
});
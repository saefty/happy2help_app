/* @flow */

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      marginTop: 5,
      marginBottom: 5,
    },
    cardContainer: {
      borderWidth: 4,
      borderColor: 'steelblue',
      borderStyle: 'solid',
      borderRadius: 4,
    },
    titleContainer: {
      backgroundColor: 'steelblue',
      justifyContent: 'center',
      height: 30,
    },
    title: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold'
    },
    image: {
      width: '100%',
      height: 150,
    },
    descriptionContainer: {
      backgroundColor: 'white',
      maxHeight: 55,
      marginLeft: 2,
      marginRight: 2,
    },
    description: {
      color: '#666'
    },
    creatorContainer: {
      backgroundColor: 'white',
      marginRight: 5,
      height: 20,
      justifyContent: 'center',
      alignItems: 'flex-end'
    },
    creator: {
      fontSize: 12,
      color: 'black',
      fontWeight: 'bold'
    },
    separator: {
      width: '100%',
      height: 5,
      backgroundColor: 'white',
    }
});

export default styles;
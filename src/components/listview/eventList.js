// @flow
import React, { Component } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import eventsMock from '../../../assets/mockdata/mockevents';

type Props = {
};

export class EventList extends Component<Props> {
  constructor(props) {
    super(props);

  }
// name, description, organization, creator

  render() {
    return (
      <View style={styles.container}>
        <FlatList 
          data={eventsMock}
          keyExtractor={(item, index) => item.id}
          ItemSeparatorComponent={this.renderSeparator}
          contentContainerStyle= {{
            width: '90%',
          }}
          renderItem={({item}) => { 
            
          let description = item.description.length > 110 
            ? item.description.substr(0, 110) + "..."
            : item.description
          let creator = item.organization
            ? item.organization
            : item.creator

          return (
            <View style={styles.cardContainer}>
              {this.getImage(item.image)}
              <View style={styles.titleContainer}><Text style={styles.title}>{item.name}</Text></View>
              <View style={styles.descriptionContainer}><Text style={styles.description}>{description}</Text></View>
              <View style={styles.creatorContainer}><Text style={styles.creator}>{creator}</Text></View>
            </View>
          );}}
        />
      </View>
    );
  }
  getImage(image) {
    if(image) {
    return (
      <Image style={styles.image} source={{uri: 'https://picsum.photos/200'}} />
    );
    } else {
      return (
        <View style={{width: 0, height: 0}}></View>
      );
    }
  }
  renderSeparator() {
    return (
      <View style={styles.separator}></View>
    );
  }
}
//                 <Card.Cover source={{ uri: 'https://picsum.photos/700' }}/>
var styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      marginTop: 5,
      marginBottom: 5,
    },
    cardContainer: {
      borderWidth: 3,
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
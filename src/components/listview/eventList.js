// @flow
import React, { Component } from "react";
import { View, Text, FlatList, Image } from "react-native";
import eventsMock from '../../../assets/mockdata/mockevents';
import styles from '../../../themes/listview.styles';

type Props = {
};

export class EventList extends Component<Props> {
  constructor(props: Props) {
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
  getImage(image: any) {
    if(image) {
    return (
      <Image style={styles.image} source={{uri: 'https://picsum.photos/200'}} />
    );
    } else {
      return (
        <View style={{width: '100%', height: 0}}></View>
      );
    }
  }
  renderSeparator() {
    return (
      <View style={styles.separator}></View>
    );
  }
}
// @flow
import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Card, Title, Paragraph } from 'react-native-paper';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import eventsMock from '../../../assets/mockdata/mockevents';

type Props = {
};

export class EventList extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      data: eventsMock,
    };
  }
// name, description, organization, creator

  render() {
    return (
      <View style={styles.container}>
        <FlatList
            data={this.state.data}
            keyExtractor={(item, index) => item.id}
            renderItem={({item}) => { 
            
            return (
              <Card>
                <Card.Content>
                  <Title>{item.name}</Title>
                  <Paragraph>{item.description.substr(0, 100)}...</Paragraph>
                  <Paragraph>{(item.organization ? item.organization : item.creator)}</Paragraph>
                </Card.Content>
              </Card>
            );}}
        />
      </View>
    );
  }
}
//                 <Card.Cover source={{ uri: 'https://picsum.photos/700' }}/>
var styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 5,
        padding: 0,
        width: '95%',
    },
    name: {
        color: '#ffffff',
    },
    description: {
        color: '#ffffff',
    },
});
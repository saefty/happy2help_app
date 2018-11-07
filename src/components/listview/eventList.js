// @flow
import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { Card, Title, Paragraph } from 'react-native-paper';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import eventsMock from '../../../assets/mockdata/mockevents';

type Props = {
};

class EventList extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      data = eventsMock,
    };
  }
// name, description, organization, creator

  render() {
    return (
      <View style={styles.container}>
        <FlatList
            data={this.state.data}
            renderItem={({event}) => { 
            
            return (
              <Card>
                <Card.Content>
                  <Title>{event.name}</Title>
                  <Paragraph>{event.description.substr(0, 20)}...</Paragraph>
                  <Paragraph>{(event.organization ? event.organization : event.creator)}</Paragraph>
                </Card.Content>
              </Card>
            );}}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 15,
        padding: 20,
        width: '95%',
    },
    name: {
        color: '#ffffff',
    },
    description: {
        color: '#ffffff',
    },
});

export default EventList;
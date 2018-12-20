// @flow
import { Component } from 'react';
import * as React from 'react';

import { View } from 'react-native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { GET_EVENTS } from './getEvents.query';

type Props = {
    pollInterval?: number,
    children: () => React.Node,
};

export class EventDataProvider extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Query query={GET_EVENTS} pollInterval={this.props.pollInterval}>
                    {({ loading, error, data }) => {
                        if (loading || error) return null;
                        return this.props.children(data.events);
                    }}
                </Query>
            </View>
        );
    }
}

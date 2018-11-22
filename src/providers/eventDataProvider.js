// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import gql from 'graphql-tag';
import { Query, graphql } from 'react-apollo';

const GET_EVENTS = gql`
    {
        events {
            id
            name
            description
            creator {
                username
            }
            location {
                latitude
                longitude
                name
            }
            organisation {
                name
                id
                description
            }
            jobSet {
                id
                name
                description
                totalPositions	
                participationSet {
                    id
                }
            }
        }
    }
`;

type Props = {
    pollInterval?: number,
    children: React.PropTypes.node,
    
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
                        if (loading) return null;
                        if (error) {
                            console.warn(`ApolloError! ${error.message}`);
                            return null;
                        }
                        return this.props.children(data.events);
                    }}
                </Query>
            </View>
        );
    }
}
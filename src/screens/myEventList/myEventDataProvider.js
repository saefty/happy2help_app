// @flow
import { Component } from 'react';
import { View } from 'react-native';
import gql from 'graphql-tag';
import { Query, graphql } from 'react-apollo';
import * as React from 'react';

const GET_EVENTS = gql`
    {
        user {
            id
            eventSet {
                id
                name
                description
                organisation {
                    id
                    name
                }
                jobSet {
                    id
                    name
                    description
                    totalPositions
                    participationSet {
                        id
                        state
                        user {
                            id
                        }
                    }
                }
            }
        }
    }
`;

type Props = {
    logOut: () => void,
    query: graphql.query,
    children: (user: any, refetch: () => void) => React.Node,
};

export class MyEventDataProvider extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Query query={GET_EVENTS}>
                    {({ loading, error, data, refetch }) => {
                        if (loading) return null;
                        if (error) {
                            return null;
                        }
                        return this.props.children(data.user, refetch);
                    }}
                </Query>
            </View>
        );
    }
}

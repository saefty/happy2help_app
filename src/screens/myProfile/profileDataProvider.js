// @flow
import { Component } from 'react';
import * as React from 'react';
import { View } from 'react-native';
import gql from 'graphql-tag';
import { Query, graphql } from 'react-apollo';

const GET_PROFILE = gql`
    {
        user {
            id
            username
            profile {
                location {
                    name
                }
                creditPoints
            }
            skills {
                id
                name
                approved
            }
        }
    }
`;

type Props = {
    children: () => React.Node,
};

export class ProfileDataProvider extends Component<Props> {
    render() {
        return (
            <View>
                <Query query={GET_PROFILE}>
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

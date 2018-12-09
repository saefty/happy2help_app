// @flow
import React, { Component } from 'react';
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
    t: i18n.t,
    logOut: () => void,
    query: graphql.query,
    children: React.PropTypes.node,
};

export class ProfileDataProvider extends Component<Props> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Query query={GET_PROFILE}>
                    {({ loading, error, data }) => {
                        if (loading) return null;
                        if (error) {
                            return null;
                        }
                        return this.props.children(data.user);
                    }}
                </Query>
            </View>
        );
    }
}

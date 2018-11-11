// @flow
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import gql from 'graphql-tag';
import { Query, graphql } from 'react-apollo';
import { ProfileView } from '../../components/profile/profile';

const GET_PROFILE = gql`
    {
        user {
            username
            profile {
                location {
                    name
                }
            }
        }
    }
`;

// const myView = probs => (
//     <Query query={GET_PROFILE}>
//         {({ loading, error, data }) => {
//             if (loading) return 'Loading...';
//             if (error) return `Error! ${error.message}`;

//             return <ProfileView username={data.user.username} {...probs} />;
//         }}
//     </Query>
// );

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
                        if (loading) return 'Loading...';
                        if (error) return `Error! ${error.message}`;
                        return (
                            this.props.children(data.user)
                        );
                    }}
                </Query>
            </View>
        );
    }
}

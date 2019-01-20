// @flow
import { Component } from 'react';
import * as React from 'react';
import { View, ActivityIndicator, Platform } from 'react-native';
import gql from 'graphql-tag';
import { Query, graphql } from 'react-apollo';
import { secondaryColor } from '../../../themes/colors';
import { BASE_JOBSET } from '../../fragments';

const GET_JOBS = gql`
    {
        user {
            id
            participationSet {
                id
                job {
                    ...BASE_JOBSET
                    currentUsersParticipation {
                        id
                        state
                    }
                    participationSet {
                        id
                        state
                    }
                    event {
                        id
                        start
                        name
                        creator {
                            id
                            username
                            image {
                                id
                                url
                            }
                        }
                        location {
                            id
                            name
                        }
                        organisation {
                            id
                            name
                            image {
                                id
                                url
                            }
                        }
                    }
                }
            }
        }
    }
    ${BASE_JOBSET}
`;

type Props = {
    children: (data: any, refetch: () => void) => React.Node,
};

export class MyJobsDataProvider extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <Query query={GET_JOBS}>
                {({ loading, error, data, refetch }) => {
                    if (!data || !data.user)
                        return (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size={Platform.select({ ios: 0, android: 45 })} color={secondaryColor} />
                            </View>
                        );
                    return this.props.children(data.user, refetch);
                }}
            </Query>
        );
    }
}

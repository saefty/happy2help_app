// @flow
import { Component } from 'react';
import * as React from 'react';
import { View } from 'react-native';
import gql from 'graphql-tag';
import { Query, graphql } from 'react-apollo';

const GET_JOBS = gql`
    {
        user {
            id
            participationSet {
                id
                job {
                    id
                    name
                    description
                    totalPositions
                    currentUsersParticipation {
                        id
                        state
                    }
                    requiresskillSet {
                        skill {
                            id
                            name
                        }
                    }
                    participationSet {
                        id
                        state
                    }
                    event {
                        start
                        id
                        name
                        description
                        creator {
                            username
                            image {
                                url
                            }
                        }
                        location {
                            latitude
                            longitude
                            name
                        }
                        organisation {
                            id
                            name
                            image {
                                url
                            }
                        }
                    }
                }
            }
        }
    }
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
                    if (loading || error) return null;
                    return this.props.children(data.user, refetch);
                }}
            </Query>
        );
    }
}

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
                        id
                        start
                        name
                        description
                        organisation {
                            id
                            name
                        }
                    }
                }
            }
        }
    }
`;

type Props = {
    children: (data: any) => React.Node,
};

export class MyJobsDataProvider extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Query query={GET_JOBS}>
                    {({ loading, error, data }) => {
                        if (loading || error) return null;

                        return this.props.children(data.user);
                    }}
                </Query>
            </View>
        );
    }
}

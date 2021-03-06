// @flow
import { Component } from 'react';
import { View } from 'react-native';
import gql from 'graphql-tag';
import { Query, graphql } from 'react-apollo';
import * as React from 'react';
import { MY_EVENTS } from './myEvents.query';

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
            <Query query={MY_EVENTS}>
                {({ loading, error, data, refetch }) => {
                    if (!data.user && (loading || error)) return null;

                    return this.props.children(data.user, refetch);
                }}
            </Query>
        );
    }
}

// @flow
import { Component } from 'react';
import { View } from 'react-native';
import { Query, graphql } from 'react-apollo';
import * as React from 'react';
import { ORGANISATION_EVENTS } from './organisationEvents.query';

type Props = {
    children: (organisation: any, refetch: () => void) => React.Node,
    id: number,
};

export class OrganisationEventDataProvider extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Query
                    query={ORGANISATION_EVENTS}
                    variables={{
                        id: this.props.id,
                    }}
                >
                    {({ loading, error, data, refetch }) => {
                        if (loading) return null;
                        if (error) {
                            return null;
                        }
                        return this.props.children(data.organisation, refetch);
                    }}
                </Query>
            </View>
        );
    }
}

// @flow
import { Component } from 'react';
import * as React from 'react';

import { View, ActivityIndicator } from 'react-native';
import { Query } from 'react-apollo';
import { GET_EVENTS } from './getEvents.query';
import { secondaryColor } from '../../themes/colors';

type Props = {
    pollInterval?: number,
    variables: any,
    children: (events: Array<any>, refetch: () => void) => React.Node,
};

export class EventDataProvider extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <Query query={GET_EVENTS} pollInterval={this.props.pollInterval} variables={this.props.variables}>
                {({ loading, error, data, refetch }) => {
                    if (!data.events && (loading || error)) return <ActivityIndicator size={150} color={secondaryColor} />;
                    return this.props.children(data.events, refetch);
                }}
            </Query>
        );
    }
}

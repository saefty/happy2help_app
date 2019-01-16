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
                    if (!data || (!data.events && (loading || error)))
                        return (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size={45} color={secondaryColor} />
                            </View>
                        );
                    return this.props.children(data.events, refetch);
                }}
            </Query>
        );
    }
}

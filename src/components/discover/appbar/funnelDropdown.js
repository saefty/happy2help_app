// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import { SortAccordion } from '../../event/eventlist/sort.events.accordion';

type Props = {
    funnelSettings: {
        open: boolean,
        sorting: string,
        descending: boolean,
        changeSort: (sorting: string) => any,
        changeDescending: (descending: boolean) => any,
    },
};
export class FunnelDropdown extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        if (this.props.funnelSettings.open === false) return <View />;
        else {
            return (
                <View>
                    <SortAccordion 
                    sorting={this.props.funnelSettings.sorting} 
                    descending={this.props.funnelSettings.descending}
                    changeSort={this.props.funnelSettings.changeSort}
                    changeDescending={this.props.funnelSettings.changeDescending}
                    />
                </View>
            );
        }
    }
}

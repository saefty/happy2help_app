// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import { SortOptions } from './sort.events.options';
import { FilterOptions } from './filter.events.options';
import { IconButton } from 'react-native-paper';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import { H2HTheme } from '../../../../themes/default.theme';

type Props = {
    open: boolean,
    updateQuery: (sorting: string, descending: boolean, filter: string) => void,
};

type State = {
    sorting: string,
    descending: boolean,
    filter: string,
};

export class FunnelDropdown extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            sorting: 'name',
            descending: false,
            filter: '',
        };
    }

    render() {
        if (this.props.open === false) return <View />;
        else {
            return (
                <View>
                    <SortOptions
                        sorting={this.state.sorting}
                        descending={this.state.descending}
                        changeSort={(sorting: string) => this.setState({ sorting: sorting })}
                        changeDescending={(descending: boolean) => this.setState({ descending: descending })}
                    />

                    <FilterOptions />

                    <IconButton
                        icon={() => <IconMat name="done" size={36} color={H2HTheme.colors.primary} />}
                        onPress={() => this.props.updateQuery(this.state.sorting, this.state.descending, this.state.filter)}
                        style={{
                            alignSelf: 'center',
                            right: 10,
                        }}
                    />
                </View>
            );
        }
    }
}

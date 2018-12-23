// @flow
import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { Searchbar, IconButton } from 'react-native-paper';
import { H2HTheme } from '../../../../themes/default.theme';

import IconMatCom from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import { withNavigation } from 'react-navigation';
import { DiscoverAppbarStyle } from './discoverAppbar.style';

type Props = {
    searchQuery: (query: string) => void,
};

type State = {
    search: string,
};
class _DiscoverAppbar extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            search: '',
        };
    }

    render() {
        return (
            <View style={DiscoverAppbarStyle.container}>
                <IconButton
                    icon={() => <IconMat name="menu" size={24} color={H2HTheme.colors.primary} />}
                    onPress={() => this.props.navigation.openDrawer()}
                    style={DiscoverAppbarStyle.menuButton}
                />
                <View style={DiscoverAppbarStyle.searchContainer}>
                    <IconMat name="search" size={24} color={H2HTheme.colors.primary} style={{ alignSelf: 'center' }} />
                    <TextInput
                        placeholder={'Events suchen'}
                        returnKeyType={'search'}
                        value={this.state.search}
                        onChangeText={t => this.setState({ search: t })}
                        onSubmitEditing={() => this.props.searchQuery(this.state.search)}
                        style={{ fontSize: 18, height: 40, top: 5, color: 'black' }}
                    />
                </View>
                <IconButton
                    icon={() => <IconMatCom name="filter" size={24} color={H2HTheme.colors.primary} />}
                    onPress={() => this.props.navigation.openDrawer()}
                    style={DiscoverAppbarStyle.filterButton}
                />
            </View>
        );
    }
}

export const DiscoverAppbar = withNavigation(_DiscoverAppbar);

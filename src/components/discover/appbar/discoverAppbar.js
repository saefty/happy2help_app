// @flow
import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { IconButton } from 'react-native-paper';
import { H2HTheme } from '../../../../themes/default.theme';
import { FunnelDropdown } from './funnel/funnelDropdown';
import IconMatCom from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import { withNavigation } from 'react-navigation';
import { DiscoverAppbarStyle } from './discoverAppbar.style';
import { primaryColor } from '../../../../themes/colors';
import moment from 'moment';

type Props = {
    searchQuery: (query: string) => void,
    openFunnel: () => void,
    funnelOpen: boolean,
    showSortOptions: boolean,
    updateQuery: (
        sorting: string,
        descending: boolean,
        filtering: {
            requiredSkills: Array<string>,
            showPrivate: boolean,
            time: {
                start: Date,
                end: Date,
            },
        }
    ) => void,
    oldState: {
        sorting: string,
        descending: boolean,
        requiredSkills: Array<string>,
        showPrivateEvents: boolean,
    },
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

    funnelIcon() {
        if (this.props.funnelOpen === true) return <IconMat name="clear" size={24} color={H2HTheme.colors.primary} />;
        return <IconMatCom name="filter" size={24} color={H2HTheme.colors.primary} />;
    }

    render() {
        return (
            <View>
                <View style={DiscoverAppbarStyle.container}>
                    <IconButton
                        icon={() => <IconMat name="menu" size={24} color={primaryColor} />}
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
                    <IconButton icon={() => this.funnelIcon()} onPress={this.props.openFunnel} style={DiscoverAppbarStyle.filterButton} />
                </View>
                <View>
                    {this.props.funnelOpen && (
                        <FunnelDropdown
                            oldState={this.props.oldState}
                            showSortOptions={this.props.showSortOptions}
                            open={this.props.funnelOpen}
                            updateQuery={this.props.updateQuery}
                            closeFunnel={this.props.openFunnel}
                        />
                    )}
                </View>
            </View>
        );
    }
}

export const DiscoverAppbar = withNavigation(_DiscoverAppbar);

// @flow
import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { Searchbar, IconButton } from 'react-native-paper';
import { H2HTheme } from '../../../themes/default.theme';


import IconMatCom from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import { withNavigation } from 'react-navigation';
import { DiscoverAppbarStyle } from './discoverAppbar.style';

type Props = {    
   
};

class _DiscoverAppbar extends Component<Props> {
       constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View
                style={DiscoverAppbarStyle.container}
            >
                <IconButton
                    icon={() => <IconMat name="menu" size={24} color={H2HTheme.colors.primary} />}
                    onPress={() => this.props.navigation.openDrawer()}
                    style={DiscoverAppbarStyle.menuButton}
                />
                <View style={DiscoverAppbarStyle.searchContainer}>
                    <IconMat name="search" size={24} color={H2HTheme.colors.primary} style={{ alignSelf: 'center' }} />
                    <TextInput placeholder={'Events suchen'} returnKeyType={'search'} style={{ fontSize: 18, height: 40, top: 5, color: 'black' }} />
                    {/* <Searchbar icon={null} style={DiscoverAppbarStyle.searchBar} /> */}
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

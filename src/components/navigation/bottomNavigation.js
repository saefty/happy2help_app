// @flow
import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { MyProfile } from '../../screens/myProfile/myprofile.screen';
import { Map } from '../map/map'


//const ProfileRoute = <ProfileView logOut={this.props.logOut} ></ProfileView>;

const MapRoute = () => <Map ></Map>;

const ListRoute = () => <Text>List</Text>;
const ChatRoute = () => <Text>Chat</Text>;



type Props = {
    t: i18n.t,
    logOut: () => void,
};

export class Navigation extends React.Component <Props> {
    state = {
        index: 0,
        routes: [
            { key: 'profile', title: 'Profile', icon: 'person' },
            { key: 'map', title: 'Map', icon: 'map' },
            { key: 'list', title: 'List', icon: 'list' },
            { key: 'chat', title: 'Chat', icon: 'chat-bubble' },
        ],
    };

    _handleIndexChange = index => this.setState({ index });

    _renderScene = BottomNavigation.SceneMap({
        profile: () => <MyProfile {...this.props} ></MyProfile>,
        map: MapRoute,
        list: ListRoute,
        chat: ChatRoute,
    });

    render() {
        return (
            <BottomNavigation
                navigationState={this.state}
                onIndexChange={this._handleIndexChange}
                renderScene={this._renderScene}
                labeled={false}
            />
        );
    }
}
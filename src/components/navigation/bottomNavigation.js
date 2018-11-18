// @flow
import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { MyProfile } from '../../screens/myProfile/myprofile.screen';
import { Map } from '../map/map'
import { withNamespaces, i18n } from 'react-i18next';
import { EventList } from '../listview/eventList';

//const ProfileRoute = <ProfileView logOut={this.props.logOut} ></ProfileView>;
const randomEvents = (amount: number) => {
    const events = [];
    for(let i = 0; i <= amount; i++){
        events.push({ 
            id: `${i}`,
            description: 'Some event description',
            name: 'Berliner Tafel e.V.',
            location: {
                name: 'gsdf',
                longitude: 13.404954 + (Math.random() -.5) * .05,
                latitude: 52.520008 + (Math.random()- .5) * .05
            }
        })
    }
    return events;
}
const MapRoute = () => <Map events={randomEvents(1500)}></Map>;

const ListRoute = () => <EventList></EventList>;
const ChatRoute = () => <Text>Chat</Text>;



type Props = {
    t: i18n.t,
    logOut: () => void,
};

type State = {
    index: number,
    routes: Array<any>,
}

class Navigation extends React.Component <Props, State> {
    state = {
        index: 1,
        routes: [
            { key: 'profile', title: this.props.t('profile'), icon: 'person' },
            { key: 'map', title: this.props.t('map'), icon: 'map' },
            { key: 'list', title: this.props.t('list'), icon: 'list' },
            { key: 'chat', title: this.props.t('chat'), icon: 'chat-bubble' },
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

export const I18nNavigation = withNamespaces(['Navigation'])(Navigation);
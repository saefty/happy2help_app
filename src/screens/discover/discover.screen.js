// @flow
import type { EventObject } from '../../models/event.model';

import React, { Component } from 'react';
import { View } from 'react-native';
import { Portal, Headline } from 'react-native-paper';
import { UserEventList } from '../../components/userEvents/userEventList';
import { UserJobList } from '../../components/userEvents/userJobList';
import { EventFAB } from '../../components/userEvents/eventFAB';
import styles from '../../components/userEvents/userEvents.styles';
import { Provider } from 'react-native-paper';
import { H2HTheme } from '../../../themes/default.theme';
import { withNamespaces, i18n } from 'react-i18next';

import { SegmentedControl } from '../../components/utils/SegmentedControl';
import { Map } from '../../components/map/map';
import { EventList } from './../../components/listview/eventList';
import { EventDataProvider } from '../../providers/eventDataProvider';
import { segmentStyle } from './segmented.style';

type Props = {
    t: i18n.t,
};

type State = {
    event?: EventObject,
    selectedIndex: number,
    userRegion: any,
};

class _DiscoverScreen extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            userRegion: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 1,
                longitudeDelta: 1,
            },
        };
    }

    getPosition = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    };

    async componentWillMount() {
        const position = await this.getPosition();
        this.setState({
            userRegion: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.15,
                longitudeDelta: 0.15,
            },
        });
    }

    openEventModal = (event: EventObject) => {
        this.props.navigation.navigate('DetailedEventView', {
            event: event,
        });
    };

    getStyleForSegmentControl = () => {
        if (this.state.selectedIndex === 1) return {};
        return segmentStyle.map;
    };

    setIndex = index => this.setState({ selectedIndex: index });

    render() {
        return (
            <Provider theme={H2HTheme}>
                <View style={[segmentStyle.list, this.getStyleForSegmentControl()]}>
                    <SegmentedControl values={['Map', 'List']} selectedIndex={this.state.selectedIndex} onTabPress={this.setIndex} />
                </View>
                <View>
                    <EventDataProvider pollInterval={undefined}>
                        {events => {
                            if (this.state.selectedIndex === 0) {
                                return (
                                    <Map
                                        events={events}
                                        onEventTouch={this.openEventModal}
                                        initialRegion={this.state.userRegion}
                                        setUserViewPoint={newregion => {
                                            this.setState({
                                                userRegion: newregion,
                                            });
                                        }}
                                    />
                                );
                            } else {
                                return <EventList onEventTouch={this.openEventModal} events={events} {...this.props} />;
                            }
                        }}
                    </EventDataProvider>
                </View>
            </Provider>
        );
    }
}
export const DiscoverScreen = withNamespaces(['Event'])(_DiscoverScreen);

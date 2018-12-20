// @flow
import type { EventObject } from '../../models/event.model';

import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Surface } from 'react-native-paper';
import { Provider } from 'react-native-paper';
import { H2HTheme } from '../../../themes/default.theme';
import { withNamespaces, i18n } from 'react-i18next';

import { DiscoverAppbar } from './../../components/discover/discoverAppbar';
import { SegmentedControl } from '../../components/utils/SegmentedControl';
import { Map } from '../../components/map/map';
import { EventList } from './../../components/listview/eventList';
import { EventDataProvider } from '../../providers/eventDataProvider';
import { segmentStyle } from './segmented.style';
import { SortAccordion } from '../../components/listview/sort.events.accordion';

type Props = {
    t: i18n.t,
};

type State = {
    event?: EventObject,
    userRegion: any,
    sorting: string,
    descending: boolean,
};

class _DiscoverScreen extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            userRegion: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 1,
                longitudeDelta: 1,
            },
            key: Math.random(),
            sorting: 'alphabetic',
            descending: false,
        };
    }

    getPosition = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    };

    async componentDidMount() {
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

    setIndex = index => this.setState({ selectedIndex: index });

    render() {
        return (
            <Provider theme={H2HTheme}>
                <Surface style={{ elevation: 6 }}>
                    <DiscoverAppbar />
                    <View style={[segmentStyle.list]}>
                        <SegmentedControl
                            values={['KARTE', 'LISTE']}
                            borderRadius={0}
                            tabsContainerStyle={segmentStyle.tabsContainerStyle}
                            tabStyle={segmentStyle.tabStyle}
                            activeTabStyle={segmentStyle.activeTabStyle}
                            tabTextStyle={segmentStyle.tabTextStyle}
                            activeTabTextStyle={segmentStyle.activeTabTextStyle}
                            selectedIndex={this.state.selectedIndex}
                            onTabPress={this.setIndex}
                        />
                    </View>
                </Surface>
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
                                return (
                                    <ScrollView>
                                        <SortAccordion
                                            sorting={this.state.sorting}
                                            descending={this.state.descending}
                                            changeSort={(sort: string) => {
                                                this.setState({
                                                    sorting: sort,
                                                });
                                            }}
                                            changeDescending={(desc: boolean) => {
                                                this.setState({
                                                    descending: desc,
                                                });
                                            }}
                                        />
                                        <EventList onEventTouch={this.openEventModal} events={events} {...this.props} />
                                    </ScrollView>
                                );
                            }
                        }}
                    </EventDataProvider>
                </View>
            </Provider>
        );
    }
}
export const DiscoverScreen = withNamespaces(['Event'])(_DiscoverScreen);

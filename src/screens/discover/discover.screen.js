// @flow
import type { EventObject } from '../../models/event.model';

import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Provider } from 'react-native-paper';
import { H2HTheme } from '../../../themes/default.theme';
import { withNamespaces, i18n } from 'react-i18next';

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
    selectedIndex: number,
    userRegion: any,
    sorting: string,
    descending: boolean,
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
            sorting: "alphabetic",
            descending: false,
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
        openEventModal = (event: EventObject) => {
            this.props.navigation.navigate('DetailedEventView', {
                event: event,
            });
        };
    }

    openEventModal = (event: EventObject) => {
        this.props.navigation.navigate('DetailedEventView', {
            event: event,
        });
    };

    getStyleForSegmentControl = () => {
        if (this.state.selectedIndex === 0) return segmentStyle.map;
        if (this.state.selectedIndex === 1) return segmentStyle.list;
        return {};
    };

    setIndex = index => this.setState({ selectedIndex: index });

    render() {
        return (
            <Provider theme={H2HTheme}>
                <View style={[segmentStyle.all, this.getStyleForSegmentControl()]}>
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
                                return (
                                    <ScrollView>
<<<<<<< HEAD
                                        <SortAccordion />
=======
                                        <SortAccordion 
                                        sorting={this.state.sorting} 
                                        descending={this.state.descending}
                                        changeSort={(sort: string) => {
                                            this.setState({
                                                sorting: sort,
                                            })
                                        }}
                                        changeDescending={(desc: boolean) => {
                                            this.setState({
                                                descending: desc,
                                            })
                                        }}/>
>>>>>>> list-sort-button
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

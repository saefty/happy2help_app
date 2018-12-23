// @flow
import type { EventObject } from '../../models/event.model';

import React, { Component } from 'react';
import { View, ScrollView, Platform, Animated, ActivityIndicator } from 'react-native';
import { Provider, Surface } from 'react-native-paper';
import { withNamespaces, i18n } from 'react-i18next';

import { DiscoverAppbar } from './../../components/discover/appbar/discoverAppbar';
import { SegmentedControl } from '../../components/utils/SegmentedControl';
import { Map } from '../../components/discover/map/map';
import { EventList } from './../../components/event/eventlist/eventList';
import { EventDataProvider } from '../../providers/eventDataProvider';
import { SortAccordion } from '../../components/event/eventlist/sort.events.accordion';

const APPBAR_SEG_HEIGHT = 130;
const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

type Props = {
    t: i18n.t,
};

type State = {
    event?: EventObject,
    userRegion: any,
    userLocation: any,
    sorting: string,
    descending: boolean,
    scrollAnim: Animated.Value,
    offsetAnim: Animated.Value,
    clampedScroll: any,
    selectedIndex: number,
};

class _DiscoverScreen extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        const scrollAnim = new Animated.Value(0);
        const offsetAnim = new Animated.Value(0);

        this.state = {
            scrollAnim: scrollAnim,
            offsetAnim: offsetAnim,
            selectedIndex: 1,
            clampedScroll: Animated.diffClamp(
                Animated.add(
                    scrollAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                        extrapolateLeft: 'clamp',
                        useNativeDriver: false,
                    }),
                    offsetAnim
                ),
                0,
                APPBAR_SEG_HEIGHT - STATUS_BAR_HEIGHT
            ),
            userRegion: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 1,
                longitudeDelta: 1,
            },
            userLocation: {
                latitude: 0,
                longitude: 0,
            },
            sorting: '',
            descending: false,
            searchQuery: '',
        };
    }

    _clampedScrollValue = 0;
    _offsetValue = 0;
    _scrollValue = 0;
    _scrollEndTimer = undefined;

    getPosition = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    };

    async componentDidMount() {
        // listeners for scroll values, relevant for half-hidden appbar
        this.state.scrollAnim.addListener(({ value }) => {
            const diff = value - this._scrollValue;
            this._scrollValue = value;
            this._clampedScrollValue = Math.min(Math.max(this._clampedScrollValue + diff, 0), APPBAR_SEG_HEIGHT - STATUS_BAR_HEIGHT);
        });
        this.state.offsetAnim.addListener(({ value }) => {
            this._offsetValue = value;
        });

        const position = await this.getPosition();
        this.setState({
            userRegion: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.15,
                longitudeDelta: 0.15,
            },
            userLocation: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            },
        });
    }

    componentWillUnmount() {
        this.state.scrollAnim.removeAllListeners();
        this.state.offsetAnim.removeAllListeners();
    }

    _onScrollEndDrag = () => {
        this._scrollEndTimer = setTimeout(this._onMomentumScrollEnd, 250);
    };

    _onMomentumScrollBegin = () => {
        clearTimeout(this._scrollEndTimer);
    };

    _onMomentumScrollEnd = () => {
        const toValue =
            this._scrollValue > APPBAR_SEG_HEIGHT && this._clampedScrollValue > (APPBAR_SEG_HEIGHT - STATUS_BAR_HEIGHT) / 2
                ? this._offsetValue + APPBAR_SEG_HEIGHT
                : this._offsetValue - APPBAR_SEG_HEIGHT;

        Animated.timing(this.state.offsetAnim, {
            toValue,
            duration: 350,
            useNativeDriver: false,
        }).start();
    };

    openEventModal = (event: EventObject) => {
        this.props.navigation.navigate('DetailedEventView', {
            event: event,
        });
    };

    setIndex = index => this.setState({ selectedIndex: index });

    renderMap = (events: any) => {
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
    };

    renderList = (events: any) => {
        return (
            <View style={{ flex: 1 }}>
                <AnimatedScrollView
                    scrollEventThrottle={1}
                    onMomentumScrollBegin={this._onMomentumScrollBegin}
                    onMomentumScrollEnd={this._onMomentumScrollEnd}
                    onScrollEndDrag={this._onScrollEndDrag}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }], {
                        useNativeDriver: false,
                    })}
                >
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
                </AnimatedScrollView>
            </View>
        );
    };

    searchQuery = (query: string) => {
        this.setState({ searchQuery: query });
    };

    get queryParams() {
        const params = {
            distanceTo: {
                latitude: this.state.userRegion.latitude,
                longitude: this.state.userRegion.longitude,
            },
            search: this.state.searchQuery,
            sorting: {},
        };
        if (this.state.sorting === 'distance') {
            params.sorting = {
                distance: {
                    latitude: this.state.userRegion.latitude,
                    longitude: this.state.userRegion.longitude,
                },
            };
        } else {
            params.sorting = {
                field: this.state.sorting,
                desc: this.state.descending,
            };
        }
        return params;
    }

    render() {
        const { clampedScroll } = this.state;

        const appbarTranslate = clampedScroll.interpolate({
            inputRange: [0, APPBAR_SEG_HEIGHT - STATUS_BAR_HEIGHT],
            outputRange: [0, -(APPBAR_SEG_HEIGHT - STATUS_BAR_HEIGHT)],
            extrapolate: 'clamp',
        });

        return (
            <View style={{ flex: 1 }}>
                <Animated.View
                    style={[
                        {
                            position: this.state.selectedIndex === 0 ? 'absolute' : 'absolute',
                            backgroundColor: `rgba(255,255,255,${this.state.selectedIndex === 0 ? 0.6 : 1})`,
                            elevation: 6,
                            zIndex: 666,
                            flex: 0,
                        },
                        { transform: [{ translateY: appbarTranslate }] },
                    ]}
                >
                    <View>
                        <DiscoverAppbar searchQuery={this.searchQuery} />
                        <SegmentedControl values={['KARTE', 'LISTE']} selectedIndex={this.state.selectedIndex} onTabPress={this.setIndex} />
                    </View>
                </Animated.View>
                <View style={{ flex: 1 }}>
                    <EventDataProvider variables={this.queryParams}>
                        {events => {
                            let screen;
                            if (this.state.selectedIndex === 0) {
                                screen = this.renderMap(events);
                            } else {
                                screen = this.renderList(events);
                            }
                            return <Animated.View style={{ flex: 1 }}>{screen}</Animated.View>;
                        }}
                    </EventDataProvider>
                </View>
            </View>
        );
    }
}
export const DiscoverScreen = withNamespaces(['Event'])(_DiscoverScreen);

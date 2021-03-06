// @flow
import type { EventObject } from '../../models/event.model';

import React, { Component } from 'react';
import { View, ScrollView, Platform, Animated, ActivityIndicator } from 'react-native';
import { Provider, Surface, Text } from 'react-native-paper';
import { withNamespaces, i18n } from 'react-i18next';
import type { SkillObject } from '../../models/skill.model';
import { DiscoverAppbar } from './../../components/discover/appbar/discoverAppbar';
import { SegmentedControl } from '../../components/utils/SegmentedControl';
import { Map } from '../../components/discover/map/map';
import { EventList } from './../../components/event/eventlist/eventList';
import { EventDataProvider } from '../../providers/eventDataProvider';
import { NavigationEvents, SafeAreaView } from 'react-navigation';
import { EditJobList } from '../../components/event/job/edit.job.list';

import moment from 'moment';

const APPBAR_SEG_HEIGHT = 120;
const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

type Props = {
    t: i18n.t,
};

type State = {
    event?: EventObject,
    userRegion: any,
    userLocation: any,
    funnelOpen: boolean,
    scrollAnim: Animated.Value,
    offsetAnim: Animated.Value,
    clampedScroll: any,
    selectedIndex: number,
    sorting: string,
    descending: boolean,
    requiredSkills: Array<SkillObject>,
    showPrivate: boolean,
    searchQuery: string,
    fromDate: Date,
    toDate: Date,
    mapBarVisible: boolean,
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
                        useNativeDriver: true,
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
            funnelOpen: false,
            sorting: 'name',
            descending: false,
            requiredSkills: [],
            showPrivate: true,
            searchQuery: '',
            fromDate: new Date(),
            toDate: moment()
                .add(1, 'year')
                .toDate(),
            mapBarVisible: true,
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

    setIndex = index => {
        if (index === this.state.selectedIndex) return;
        this.setState({ selectedIndex: index });
    };

    toogleMapTouch = () => {
        Animated.timing(this.state.offsetAnim, {
            toValue: this.state.mapBarVisible ? APPBAR_SEG_HEIGHT : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();

        this.setState({ mapBarVisible: !this.state.mapBarVisible });
    };

    renderMap = (events: any) => {
        return (
            <Map
                events={events}
                onEventTouch={this.openEventModal}
                onTouch={this.toogleMapTouch}
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
            <AnimatedScrollView
                scrollEventThrottle={1}
                onMomentumScrollBegin={this._onMomentumScrollBegin}
                onMomentumScrollEnd={this._onMomentumScrollEnd}
                onScrollEndDrag={this._onScrollEndDrag}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }], {
                    useNativeDriver: false,
                })}
            >
                <View style={{ height: APPBAR_SEG_HEIGHT - 20 }} />
                <EventList onEventTouch={this.openEventModal} events={events} {...this.props} />
                <View style={{ height: 60 }} />
            </AnimatedScrollView>
        );
    };

    searchQuery = (query: string) => {
        this.setState({ searchQuery: query });
    };

    get queryParams() {
        const params = {
            distanceTo: {
                latitude: this.state.userLocation.latitude,
                longitude: this.state.userLocation.longitude,
            },
            search: this.state.searchQuery,
            sorting: {},
            filtering: {},
        };

        params.filtering = {
            requiredSkills: this.state.requiredSkills.map(skill => skill.name),
            showPrivate: this.state.showPrivate,
            time: {
                start: moment(this.state.fromDate).format(),
                end: moment(this.state.toDate).format(),
            },
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

    updateQuery = (
        sorting: string,
        descending: boolean,
        filtering: {
            requiredSkills: Array<SkillObject>,
            showPrivate: boolean,
            time: {
                start: Date,
                end: Date,
            },
        }
    ) => {
        this.setState({
            sorting: sorting,
            descending: descending,
            requiredSkills: filtering.requiredSkills,
            showPrivate: filtering.showPrivate,
            fromDate: filtering.time.start,
            toDate: filtering.time.end,
        });
        this.setState({
            funnelOpen: false,
        });
    };

    render() {
        const { clampedScroll } = this.state;

        const appbarTranslate = !this.state.funnelOpen
            ? clampedScroll.interpolate({
                  inputRange: [0, APPBAR_SEG_HEIGHT - STATUS_BAR_HEIGHT],
                  outputRange: [0, -(APPBAR_SEG_HEIGHT - STATUS_BAR_HEIGHT)],
                  extrapolate: 'clamp',
              })
            : 0;

        return (
            <View style={{ flex: 1 }}>
                <Animated.View
                    style={[
                        {
                            position: 'absolute',
                            backgroundColor: `rgba(255,255,255,${this.state.selectedIndex === 0 ? 0.6 : 1})`,
                            elevation: 6,
                            zIndex: 666,
                            flex: 0,
                        },
                        { transform: [{ translateY: appbarTranslate }] },
                    ]}
                >
                    <SafeAreaView>
                        <DiscoverAppbar
                            searchQuery={this.searchQuery}
                            openFunnel={() => this.setState({ funnelOpen: !this.state.funnelOpen })}
                            funnelOpen={this.state.funnelOpen}
                            showSortOptions={this.state.selectedIndex === 1}
                            updateQuery={this.updateQuery}
                            currentQuery={{
                                sorting: this.state.sorting,
                                descending: this.state.descending,
                                requiredSkills: this.state.requiredSkills,
                                showPrivateEvents: this.state.showPrivate,
                                time: {
                                    start: this.state.fromDate,
                                    end: this.state.toDate,
                                },
                            }}
                        />
                        <SegmentedControl values={['KARTE', 'LISTE']} selectedIndex={this.state.selectedIndex} onTabPress={this.setIndex} />
                    </SafeAreaView>
                </Animated.View>
                <EventDataProvider variables={this.queryParams}>
                    {(events, refetch) => {
                        let component;
                        if (this.state.selectedIndex === 0) {
                            component = this.renderMap(events);
                        } else {
                            component = this.renderList(events);
                        }
                        return (
                            <View>
                                <NavigationEvents onWillFocus={refetch} />
                                {component}
                            </View>
                        );
                    }}
                </EventDataProvider>
            </View>
        );
    }
}
export const DiscoverScreen = withNamespaces(['Event'])(_DiscoverScreen);

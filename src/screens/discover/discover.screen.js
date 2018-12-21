// @flow
import type { EventObject } from '../../models/event.model';

import React, { Component } from 'react';
import { View, ScrollView, Platform, Animated } from 'react-native';
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

const APPBAR_SEG_HEIGHT = 130;
const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

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

        const scrollAnim = new Animated.Value(0);
        const offsetAnim = new Animated.Value(0);

        this.state = {
            scrollAnim: scrollAnim,
            offsetAnim: offsetAnim,
            clampedScroll: Animated.diffClamp(
                Animated.add(
                    scrollAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                        extrapolateLeft: 'clamp',
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
            sorting: 'alphabetic',
            descending: false,
        };
    }

    _clampedScrollValue = 0;
    _offsetValue = 0;
    _scrollValue = 0;

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
            useNativeDriver: true,
        }).start();
    };

    openEventModal = (event: EventObject) => {
        this.props.navigation.navigate('DetailedEventView', {
            event: event,
        });
    };

    setIndex = index => this.setState({ selectedIndex: index });

    render() {
        const { clampedScroll } = this.state;

        const appbarTranslate = clampedScroll.interpolate({
            inputRange: [0, APPBAR_SEG_HEIGHT - STATUS_BAR_HEIGHT],
            outputRange: [0, -(APPBAR_SEG_HEIGHT - STATUS_BAR_HEIGHT)],
            extrapolate: 'clamp',
        });

        return (
            <Provider theme={H2HTheme} style={{ flex: 1 }}>
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
                                    <AnimatedScrollView
                                        style={{ paddingTop: 110 }}
                                        scrollEventThrottle={1}
                                        onMomentumScrollBegin={this._onMomentumScrollBegin}
                                        onMomentumScrollEnd={this._onMomentumScrollEnd}
                                        onScrollEndDrag={this._onScrollEndDrag}
                                        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }], {
                                            useNativeDriver: true,
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
                                );
                            }
                        }}
                    </EventDataProvider>
                </View>
                <Animated.View style={[{ position: 'absolute' }, { transform: [{ translateY: appbarTranslate }] }]}>
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
                </Animated.View>
            </Provider>
        );
    }
}
export const DiscoverScreen = withNamespaces(['Event'])(_DiscoverScreen);

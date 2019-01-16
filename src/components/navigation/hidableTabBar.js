// @flow
import React, { Component } from 'react';
import { Animated, View } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import { createBottomTabNavigator } from 'react-navigation';
import color from 'color';
import { primaryColor } from '../../../themes/colors';

const TAB_BAR_OFFSET = 60;

class _HidableTabBar extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            offset: new Animated.Value(0),
            navOpacity: 1,
        };
    }

    UNSAFE_componentWillReceiveProps(props) {
        const oldState = this.props.navigation.state;
        const oldRoute = oldState.routes[oldState.index];
        const oldParams = oldRoute.params;
        const wasVisible = !oldParams || oldParams.visible;
        const oldAnimHeight = !oldParams || oldParams.animHeight;

        const newState = props.navigation.state;
        const newRoute = newState.routes[newState.index];
        const newParams = newRoute.params;
        const isVisible = !newParams || newParams.visible;
        const animHeight = !newParams || newParams.animHeight;

        if (!isVisible && animHeight) {
            const appbarTranslate = animHeight.interpolate({
                inputRange: [0, TAB_BAR_OFFSET],
                outputRange: [0, TAB_BAR_OFFSET],
                extrapolate: 'clamp',
            });
            this.setState({ offset: appbarTranslate });
            return;
        }

        if (!animHeight && oldAnimHeight) {
            this.state.offset = new Animated.Value(0);
        }

        if (animHeight) return;

        if (wasVisible && !isVisible) {
            Animated.timing(this.state.offset, { toValue: TAB_BAR_OFFSET, duration: 100, useNativeDriver: true }).start();
        } else if (isVisible && !wasVisible) {
            Animated.timing(this.state.offset, { toValue: 0, duration: 100, useNativeDriver: true }).start();
        }
    }

    _isVisible() {
        const { navigation, descriptors } = this.props;
        const { state } = navigation;
        const route = state.routes[state.index];
        const options = descriptors[route.key].options;
        return options.tabBarVisible;
    }

    _renderIcon = ({ route, focused, color }) => {
        return this.props.renderIcon({ route, focused, tintColor: color });
    };

    _setIndex = index => {
        this.props.navigation.dispatch(index);
        this.setState({ offset: new Animated.Value(0), navOpacity: 1 });
    };

    render() {
        const {
            // eslint-disable-next-line no-unused-vars
            descriptors,
            barStyle,
            ...rest
        } = this.props;

        return (
            <Animated.View
                style={[
                    styles.container,
                    {
                        transform: [
                            {
                                translateY: this.state.offset,
                            },
                        ],
                    },
                ]}
            >
                <BottomNavigation
                    navigationState={this.props.navigation.state}
                    {...rest}
                    style={{
                        backgroundColor: 'transparent',
                    }}
                    barStyle={{
                        backgroundColor: color(primaryColor)
                            .alpha(this.state.navOpacity)
                            .rgb()
                            .string(),
                    }}
                    renderIcon={this._renderIcon}
                    renderScene={() => <View />}
                    onIndexChange={this._setIndex}
                />
            </Animated.View>
        );
    }
}

const styles = {
    container: {
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
        elevation: 0,
    },
};

export const createHideableTabBar = (routeConfig: any, drawConfig: any) => {
    const newConfig = Object.assign({}, drawConfig, { tabBarComponent: _HidableTabBar });
    return createBottomTabNavigator(routeConfig, newConfig);
};

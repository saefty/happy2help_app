// @flow
import type { EventObject } from '../../models/event.model';
import React, { PureComponent } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { DefaultStyles } from '../../../config/style';
//import { i18n } from 'react-i18next';
import { EventMarker } from './eventMarker';
import ClusteredMapView from 'react-native-maps-super-cluster';
import { MapStyle as styles } from './map.style';
import { Sentry } from 'react-native-sentry';

type Props = {
    events?: Array<EventObject>,
    onEventTouch: (event: EventObject) => void,
    setUserViewPoint: (region: Region) => void,
    initialRegion: Region,
};

type State = {
    userCords: {
        latitude: number,
        longitude: number,
        follow: boolean,
    },
    paddingTop: number,
    userLocationWatchId: number,
};

const initialZoom = 0.05;

export class Map extends PureComponent<Props, State> {
    state = {
        userCords: {
            latitude: 0,
            longitude: 0,
            follow: true,
        },
        paddingTop: 1,
        userLocationWatchId: -1,
    };

    map: {
        current: ClusteredMapView,
    };

    constructor(props: Props) {
        super(props);
    }

    watchPosition = (position: any) => {
        if (this.state.userCords.latitude !== 0 && this.map.current) {
            this.map.current.animateToRegion(
                {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: initialZoom,
                    longitudeDelta: initialZoom,
                },
                500
            );
        }
        this.setState({
            userCords: position.coords,
        });
    };

    componentDidMount() {
        setTimeout(() => this.setState({ paddingTop: 0 }), 100);
        if (this.state.userLocationWatchId === -1) {
            const watchId = navigator.geolocation.watchPosition(this.watchPosition, undefined, {
                enableHighAccuracy: true,
                timeout: 5000,
            });
            this.setState({ userLocationWatchId: watchId });
        }
        navigator.geolocation.getCurrentPosition(this.watchPosition);
    }

    componentWillUnmount() {
        if (this.state.userLocationWatchId !== -1) {
            navigator.geolocation.clearWatch(this.state.userLocationWatchId);
            this.setState({ userLocationWatchId: -1 });
        }
    }

    renderCluster = (cluster: any, onPress: any) => {
        const pointCount = cluster.pointCount,
            coordinate = cluster.coordinate,
            clusterId = cluster.clusterId;
        return (
            <Marker tracksViewChanges={false} identifier={`cluster-${clusterId}`} key={clusterId} coordinate={coordinate} onPress={onPress}>
                <View style={styles.clusterStyle}>
                    <Text style={styles.clusterStyleText}>{pointCount}</Text>
                </View>
            </Marker>
        );
    };

    render() {
        return (
            <View style={[DefaultStyles.container, styles.mapContainer, { paddingTop: this.state.paddingTop }]}>
                <ClusteredMapView
                    ref={(r: ClusteredMapView) => {
                        this.map = r;
                    }}
                    accessible={true}
                    cache={true}
                    style={[styles.map]}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    showsPointsOfInterest={false}
                    toolbarEnabled={true}
                    showsBuildings={false}
                    showsIndoors={false}
                    data={this.props.events}
                    initialRegion={
                        this.props.initialRegion || {
                            latitude: this.state.userCords.latitude,
                            longitude: this.state.userCords.longitude,
                            latitudeDelta: initialZoom,
                            longitudeDelta: initialZoom,
                        }
                    }
                    onRegionChange={this.props.setUserViewPoint}
                    renderCluster={this.renderCluster}
                    renderMarker={event => (
                        <EventMarker onEventTouch={event => this.props.onEventTouch(event)} key={`event${event.id}`} tracksViewChanges={false} event={event} />
                    )}
                />
            </View>
        );
    }
}

// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import Qs from 'qs';
import Bottleneck from 'bottleneck';

export class GooglePlacesAutocomplete extends Component<any, any> {
    _isMounted = true;
    _results = [];
    _requests = [];
    limiter = new Bottleneck({
        maxConcurrent: 1,
        minTime: 333,
        reservoir: 100, // initial value
        reservoirRefreshAmount: 100,
        reservoirRefreshInterval: 60 * 1000, // must be divisible by 250
    });

    constructor(props: any) {
        super(props);
    }

    async componentDidMount() {
        await this.limiter.ready();
    }

    async componentWillUnmount() {
        await this.limiter.stop();
    }

    search = async (text: string) => {
        return this.limiter.schedule(async () => {
            return fetch(
                'https://maps.googleapis.com/maps/api/place/autocomplete/json?&input=' +
                    encodeURIComponent(text) +
                    '&' +
                    Qs.stringify(this.props.query)
            ).then(response => {
                return response.json();
            });
        });
    };

    fetchCoordinates = async (place_id: string) => {
        return this.limiter.schedule(async () => {
            return fetch(
                'https://maps.googleapis.com/maps/api/place/details/json?' +
                    Qs.stringify({
                        key: this.props.query.key,
                        placeid: place_id,
                        language: this.props.query.language,
                    })
            ).then(response => response.json());
        });
    };

    render() {
        return (
            <View>
                {this.props.children({
                    search: this.search,
                    fetchCoordinates: this.fetchCoordinates,
                })}
            </View>
        );
    }
}

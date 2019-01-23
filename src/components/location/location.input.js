// @flow
import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { GooglePlacesAutocomplete } from './GooglePlacesGeolocation';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';

type Props = {
    initialValue: any,
    error: boolean,
    label: string,
    onChangeValue: (newLocation: any) => void,
    onFocus: () => void,
};

type State = {
    text: string,
    predictions: Array<any>,
    details: any,
    selectedPlace: {},
};

export class GooglePlacesInput extends PureComponent<Props, State> {
    state = {
        text: '',
        predictions: [],
        details: {},
        selectedPlace: {},
    };

    constructor(props: Props) {
        super(props);
        const initialValue = this.props.initialValue || { formatted_address: '' };
        this.state = {
            text: initialValue.formatted_address,
            predictions: [],
            details: {},
            selectedPlace: initialValue,
        };
    }

    setResults = async ({ search }: any, text: string) => {
        this.setState({ text });
        const results = await search(text);
        this.setState({ predictions: results.predictions });
    };

    setSelectedPlace = (p: any, fetchedPlace: any) => {
        const newDetails = Object.assign({}, this.state.details);
        newDetails[p.place_id] = fetchedPlace.result;

        this.setState({
            details: newDetails,
            selectedPlace: fetchedPlace.result,
            text: p.description,
            predictions: [],
        });

        this.props.onChangeValue(this.state.selectedPlace);
    };

    render() {
        return (
            <GooglePlacesAutocomplete
                query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: 'AIzaSyCuH006amUn_-8pnXy4xnWorbbSfrY9a_Q',
                    language: 'de', // language of the results
                    types: 'address', // default: 'geocode'
                }}
            >
                {props => {
                    return (
                        <View style={styles.container}>
                            <TextInput
                                placeholder={this.props.label}
                                value={this.state.text}
                                error={this.props.error}
                                onChangeText={text => this.setResults(props, text)}
                                onFocus={() => this.props.onFocus && this.props.onFocus()}
                            />
                            <KeyboardAwareFlatList
                                data={this.state.predictions}
                                keyExtractor={item => {
                                    return item.id;
                                }}
                                style={styles.flatList}
                                renderItem={p => {
                                    p = p.item;
                                    return (
                                        <View>
                                            <Button
                                                key={p.id}
                                                onPress={async () => {
                                                    let details = {};
                                                    if (this.state.details[p.place_id]) {
                                                        details = this.state.details[p.place_id];
                                                    } else {
                                                        details = await props.fetchCoordinates(p.place_id);
                                                    }
                                                    this.setSelectedPlace(p, details);
                                                }}
                                            >
                                                {p.description}
                                            </Button>
                                        </View>
                                    );
                                }}
                            />
                        </View>
                    );
                }}
            </GooglePlacesAutocomplete>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    flatList: {
        //position: 'absolute',
        //top: 58,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        backgroundColor: 'white',
        width: '100%',
    },
});

// @flow
import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import MapView from 'react-native-maps';
import { DefaultStyles } from '../../../config/style';



type Props = {
    t: i18n.t,
};

export class Map extends Component<Props> {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={DefaultStyles.container}>
                <MapView
                    accessible={true}
                    style={styles.map}
                />

            </View>
        );
    }
}


var styles = StyleSheet.create({
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    logOut: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    }
});
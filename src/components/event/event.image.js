// @flow
import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';

type Props = {
    src?: string,
    grayscale?: boolean,
    resizeMode: string,
    style: StyleSheet,
};

export class EventImage extends Component<Props> {
    constructor(props) {
        super(props);
        if (this.props.grayscale === null) {
            this.props.grayscale === false;
        }
    }

    render() {
        const DEFAULT = this.props.grayscale
            ? require('../../../assets/images/header_gray.jpg')
            : require('../../../assets/images/header.jpg');
        return (
            <Image
                source={this.props.src !== '' ? { uri: this.props.src } : DEFAULT}
                style={this.props.style}
                resizeMode={this.props.resizeMode}
            />
        );
    }
}

/**
 *  @flow
 *  Renders image in header. Image is cropped to window width and a set height.
 */

import React, { Component } from 'react';
import { View, Dimensions, Image, ImageEditor, Platform, ImageStore } from 'react-native';

import { styles } from './viewOrganisation.style';

const { height, width } = Dimensions.get('window');

const cropData = {
    offset: { x: 0, y: 0 },
    size: { width: width, height: 140 },
};

type State = {
    path?: String,
};

export default class ImageHeader extends Component<any, State> {
    constructor() {
        super();
        this.state = {
            path: null,
        };
    }

    componentDidMount() {
        this.cropImage('https://picsum.photos/400');
    }

    // get cropped image ImageStore path
    async cropImage(path) {
        await ImageEditor.cropImage(path, cropData, crop => this.setState({ path: crop }), error => console.log('cropImage', error));
    }

    // ImageStore cache clearing
    componentWillUnmount() {
        if (Platform.OS === 'ios') ImageStore.removeImageForTag(this.state.path);
    }

    render() {
        let image;
        if (this.state.path) {
            image = <Image style={styles.headerImage} source={{ uri: this.state.path }} />;
        } else {
            image = null;
        }
        return <View>{image}</View>;
    }
}

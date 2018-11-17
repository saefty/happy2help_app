// @flow
import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { styles } from './profilePictureStyle'

type Props = {
    t: i18n.t,
    src: string,
};

export class ProfilePicture extends Component<Props> {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View>
                <Image
                    source={require('./../../../../../assets/images/profile/baseline_person_black_48.png')}
                    style={styles.profilePicture}
                />
            </View>
        );
    }
}



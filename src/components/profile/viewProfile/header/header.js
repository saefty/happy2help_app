// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { ProfilePicture } from './../../profilePicture/profilePicture';
import { styles } from './headerStyle';
import type { LocationObject } from './../../../../models/location.model';
import type { ImageObject } from './../../../../models/image.model';
import { withNamespaces, i18n } from 'react-i18next';

type Props = {
    t: i18n.t,
    img?: ImageObject,
    userName: string,
    location: LocationObject,
};
const maxLocationLength = 50;

export class _Header extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.pictureContainer}>
                    <View style={styles.background} />
                    <ProfilePicture style={styles.profilePicture} src={this.props.img ? this.props.img.url : ''} />
                </View>
                <Text style={styles.name}>{this.props.userName} </Text>
                <Text style={styles.location}>
                    {this.props.location
                        ? this.props.location.name.length <= maxLocationLength
                            ? this.props.location.name
                            : this.props.location.name.substr(0, maxLocationLength) + '..'
                        : this.props.t('noLocation')}
                </Text>
            </View>
        );
    }
}

export const Header = withNamespaces(['User'])(_Header);

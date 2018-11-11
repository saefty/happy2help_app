// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { ProfilePicture } from './profilePicture/profilePicture'
import { styles } from './headerStyle';

type Props = {
    t: i18n.t,
};

export class Header extends Component<Props> {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View
                style={{
                    height: 150,
                }}
            >
                <View style={styles.colouredBlock} />
                <View style={styles.headerTextContainer}>
                    <ProfilePicture />
                    <View style={{ margin: 10 }}>
                        <Text style={styles.userName}>Ron_weasley </Text>
                        <Text style={{ fontSize: 15 }}>
                            Berlin, Deutschland{' '}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

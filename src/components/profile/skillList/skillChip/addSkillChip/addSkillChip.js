// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Chip } from 'react-native-paper';
import { styles } from '../skillChipStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';


type Props = {
    t: i18n.t,
    onPress: () => mixed,
};

export class AddSkillChip extends Component<Props> {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View>
                <Chip style={styles.chip} onPress={this.props.onPress}>
                    <Icon name="add" />
                </Chip>
            </View>
        );
    }
}

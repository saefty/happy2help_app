// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Chip } from 'react-native-paper';
import { styles } from './skillChipStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';


type Props = {
    t: i18n.t,
};

export class AddSkillChip extends Component<Props> {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View>
                <Chip style={styles.chip}>
                    <Icon name="add" />
                </Chip>
            </View>
        );
    }
}

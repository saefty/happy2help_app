// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Chip } from 'react-native-paper';
import { styles } from './skillChipStyle'
import type { SkillObject } from './../../../../models/skill.model'

type Props = {
    t: i18n.t,
    skillObject: SkillObject,
    onClose?: () => mixed,
   
   
};

export class SkillChip extends Component<Props> {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View>
                <Chip style={styles.chip} icon={this.props.skillObject.approved ? "check-circle" : null} onClose={ this.props.onClose} >
                    <Text style={styles.text}>{this.props.skillObject.text}</Text>
                </Chip>               
            </View>
        );
    }
}

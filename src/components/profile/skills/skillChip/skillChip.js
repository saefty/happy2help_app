// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Chip } from 'react-native-paper';
import { styles } from './skillChipStyle';
import type { SkillObject } from './../../../../models/skill.model';

type Props = {
    t: i18n.t,
    skillObject: SkillObject,
    deleteChip?: skill => mixed,
};

export class SkillChip extends Component<Props> {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View>
                <Chip
                    style={styles.chip}
                    icon={this.props.skillObject.approved ? 'check-circle' : null}
                    onClose={this.props.deleteChip ? () => this.props.deleteChip(this.props.skillObject) : null}
                >
                    <Text style={styles.text}>{this.props.skillObject.name}</Text>
                </Chip>
            </View>
        );
    }
}

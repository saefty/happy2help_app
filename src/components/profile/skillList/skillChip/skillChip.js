// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Chip } from 'react-native-paper';
import { styles } from './skillChipStyle';
import type { SkillObject } from './../../../../models/skill.model';

type Props = {
    skillObject: SkillObject,
    deleteChip?: (skill: SkillObject) => mixed,
};

export class SkillChip extends Component<Props> {
    constructor(props: Props) {
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
                    {this.props.skillObject.name}
                </Chip>
            </View>
        );
    }
}

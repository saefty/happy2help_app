// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Title } from 'react-native-paper';

import { SkillChip } from './skillChip/skillChip';
import { styles } from './skillListStyle';
import { SkillObject } from '../../../models/skill.model';
import { withNamespaces, i18n } from 'react-i18next';

type Props = {
    t: i18n.t,
    skillObjects: SkillObject[],
};

class SkillListComponent extends Component<Props> {
    constructor(props) {
        super(props);
    }
    createSkills = () => {
        return this.props.skillObjects.map((skillObject) => <SkillChip key={skillObject.id} skillObject={skillObject} />)
    };

    render() {
        return (
            <View style={styles.container}>
                <Title style={styles.title}>{this.props.t('skills')}</Title>
                <View style={styles.chipBox}>{this.createSkills()}</View>
            </View>
        );
    }
}

export const SkillList = withNamespaces(['User'])(SkillListComponent);
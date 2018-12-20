// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Title } from 'react-native-paper';

import { SkillChip } from './skillChip/skillChip';
import type { SkillObject } from './../../../models/skill.model';
import { AddSkillDialog } from './addSkillDialog';
import { styles } from './skillListStyle';
import { withNamespaces, i18n } from 'react-i18next';

type Props = {
    t: i18n.t,
    skillObjects: SkillObject[],
    addSkill?: (skill: SkillObject) => mixed,
    deleteSkill?: (skill: SkillObject) => mixed,
};

class SkillListComponent extends Component<Props> {
    constructor(props) {
        super(props);
       
    }

    render() {
        let Render_Skills = this.props.skillObjects.map(skill => (
            <SkillChip key={skill.id} skillObject={skill} deleteChip={this.props.deleteSkill ? this.props.deleteSkill : null} />
        ));

        return (
            <View style={styles.container}>
                <View style={styles.chipBox}>
                    {Render_Skills}
                    {this.props.addSkill ? <AddSkillDialog addSkill={this.props.addSkill} /> : null}
                </View>
            </View>
        );
    }
}

export const SkillList = withNamespaces(['User'])(SkillListComponent);
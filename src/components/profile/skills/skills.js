// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Title } from 'react-native-paper';

import { SkillChip } from './skillChip/skillChip';
import { styles } from './skillsStyle';
import type { SkillObject } from './../../../models/skill.model';
import { AddSkillDialog } from './addSkillDialog';
type Props = {
    t: i18n.t,
    skillObjects: SkillObject[],
    addSkill?: (skill: SkillObject) => mixed,
    deleteSkill?: (skill: SkillObject) => mixed,
};



export class Skills extends Component<Props> {
    constructor(props) {
        super(props);
       
    }


    render() {
        let Render_Skills = this.props.skillObjects.map(skill => (
            <SkillChip key={skill.id} skillObject={skill} deleteChip={this.props.deleteSkill ? this.props.deleteSkill : null} />
        ));

        return (
            <View style={styles.container}>
                <Title style={styles.title}>Skills</Title>
                <View style={styles.chipBox}>
                    {Render_Skills}
                    {this.props.addSkill ? <AddSkillDialog addSkill={this.props.addSkill} /> : null}
                </View>
            </View>
        );
    }
}

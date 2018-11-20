// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Title, Chip, Button } from 'react-native-paper';

import { SkillChip } from './skillChip/skillChip';
import { styles } from './skillsStyle';
import { styles as chipStyles } from './skillChip/skillChipStyle';
import type { SkillObject } from './../../../models/skill.model';
import { AddSkillChip } from './skillChip/addSkillChip/addSkillChip';
import { AddSkillDialog } from './skillChip/addSkillChip/addSkillDialog';
type Props = {
    t: i18n.t,
    skillObjects: SkillObject[],
    editable?: bool,
    updateSkills?: () => mixed,
};

export class Skills extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            skillArray: props.skillObjects,
        };
    }    

    addSkill = skill => {
        let skills = this.state.skillArray;
        skills.push(skill);
        this.setState({ skillArray: skills });
        this.props.updateSkills(skills); //propagate changes to editProfile Component
    };

    deleteSkill = skillToDelete => {
        let skills = this.state.skillArray;
        skills = skills.filter(skill => skill.id != skillToDelete.id)
        this.setState({ skillArray: skills });
        this.props.updateSkills(skills); //propagate changes to editProfile Component
    };



    

    render() {

        let Render_Skills = this.state.skillArray.map(skill => (
            <SkillChip key={skill.id} skillObject={skill} deleteChip={this.props.editable ? this.deleteSkill : null} />
        ));

        return (
            <View style={styles.container}>
                <Title style={styles.title}>Skills</Title>
                <View style={styles.chipBox}>
                    {Render_Skills}
                    {this.props.editable ? <AddSkillDialog addSkill={this.addSkill} /> : null}
                </View>
            </View>
        );
    }
}

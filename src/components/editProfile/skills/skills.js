// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Title, Chip } from 'react-native-paper';

import { SkillChip } from './skillChip/skillChip';
import { styles } from './skillsStyle';
import { styles as chipStyles } from './skillChip/skillChipStyle';
import { SkillObject } from './../../../models/skill.model';
import { AddSkillChip } from './skillChip/addSkillChip';
type Props = {
    t: i18n.t,
    skillObjects: SkillObject[],
};

export class Skills extends Component<Props> {
    constructor(props) {
        super(props);
    }
    createSkills = () => {
        //creating for each given skill a skillchip
        return this.props.skillObjects.map(skillObject => <SkillChip key={skillObject.id} skillObject={skillObject} onClose={() => console.log('Closed')} />);
    };

    render() {
        return (
            <View style={styles.container}>
                <Title style={styles.title}>Skills</Title>
                <View style={styles.chipBox}>
                    {this.createSkills()}
                    <AddSkillChip />
                </View>
            </View>
        );
    }
}

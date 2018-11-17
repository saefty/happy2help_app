// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Title } from 'react-native-paper';

import { SkillChip } from './skillChip/skillChip';
import { styles } from './skillsStyle';
import { SkillObject } from './../../../models/skill.model';

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
        return this.props.skillObjects.map((skillObject) => <SkillChip key={skillObject.id} skillObject={skillObject} />)
        
        // let skills = [];
        // this.props.skillObjects.forEach(skillObject => {
        //     skills.push(<SkillChip skillObject={skillObject} />);
        // });
        // return skills;
    };

    render() {
        return (
            <View style={styles.container}>
                <Title style={styles.title}>Skills</Title>
                <View style={styles.chipBox}>{this.createSkills()}</View>
            </View>
        );
    }
}

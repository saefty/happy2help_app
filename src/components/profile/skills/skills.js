// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Title } from 'react-native-paper';

import { SkillChip } from './skillChip/skillChip';
import { styles } from './skillsStyle';

type SkillObject  = {
    text: string,
    approved: boolean,
}

type Props = {
    t: i18n.t,
    skillObjects: SkillObject[],
};



export class Skills extends Component<Props> {
    constructor(props) {
        super(props);
    }
    createSkills = () => {
        let skills = [];
        this.props.skillObjects.forEach((skillObject) => {
            skills.push(<SkillChip text={skillObject.text} approved={skillObject.approved} />)
        });
        return skills;
    };

    render() {
        return (
            <View style={{ margin: 10 }}>
                <Title style={{ margin: 5 }}>Skills</Title>
                <View style={styles.chipBox}>
                    {this.createSkills()}
                </View>
            </View>
        );
    }
}

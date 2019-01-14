// @flow
import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { SkillList } from '../../skillList/skillList';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import { Title } from 'react-native-paper';
import { styles } from './mySkills.style';
import type { SkillObject } from '../../../../models/skill.model';
import { H2HTheme } from '../../../../../themes/default.theme';

type Props = {
    skills?: Array<SkillObject>,
    title: string,
};

export class MySkills extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <IconMat name="build" size={20} color={H2HTheme.colors.primary} />
                    <Title style={styles.title}>{this.props.title}</Title>
                </View>
                <ScrollView style={styles.scroll}>
                    <SkillList skillObjects={this.props.skills} />
                </ScrollView>
            </View>
        );
    }
}

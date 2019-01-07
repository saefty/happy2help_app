// @flow
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { Paragraph } from 'react-native-paper';
import type { SkillObject } from '../../../../../models/skill.model';
import { SkillList } from '../../../../profile/skillList/skillList';
import { withNamespaces, i18n } from 'react-i18next';

type Props = {
    t: i18n.t,
    style: any,
    skills: Array<SkillObject>,
    delSkill: (skill: SkillObject) => void,
};

class _HorizontalSkillList extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        if (this.props.skills.length === 0) {
            return (
                <View style={[this.props.style, { alignItems: 'center', justifyContent: 'center' }]}>
                    <Paragraph style={{ fontSize: 10 }}>{this.props.t('noSkills')}</Paragraph>
                </View>
            );
        } else
            return (
                <ScrollView horizontal={true} style={this.props.style} contentContainerStyle={{ alignItems: 'center' }}>
                    <SkillList skillObjects={this.props.skills} deleteSkill={this.props.delSkill} />
                </ScrollView>
            );
    }
}

export const HorizontalSkillList = withNamespaces(['Sort'])(_HorizontalSkillList);

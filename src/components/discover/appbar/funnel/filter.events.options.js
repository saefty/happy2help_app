// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Title, Switch, Paragraph } from 'react-native-paper';
import styles from './filter.styles';
import { withNamespaces, i18n } from 'react-i18next';
import type { SkillObject } from '../../../../models/skill.model';
import { HorizontalSkillList } from './funnelElements/horizontalSkillList';
import { AddSkillDialog } from '../../../profile/skillList/addSkillDialog';

type Props = {
    t: i18n.t,
    requiredSkills: Array<SkillObject>,
    addSkill: (skill: SkillObject) => void,
    delSkill: (skill: SkillObject) => void,
    showPrivateEvents: boolean,
    handleSwitch: () => void,
};

class _FilterOptions extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    get title(): string {
        return this.props.t('filter');
    }

    render() {
        return (
            <View style={styles.filterContainer}>
                <Title style={styles.title}>{this.title}</Title>

                <View style={styles.container}>
                    <View style={styles.left}>
                        <Paragraph style={styles.smallText}>{this.props.t('showPrivateEvents')}</Paragraph>
                    </View>
                    <View style={styles.right}>
                        <Switch value={this.props.showPrivateEvents} onValueChange={this.props.handleSwitch} />
                    </View>
                </View>

                <View style={styles.container}>
                    <View style={styles.left}>
                        <Paragraph style={styles.smallText}>{this.props.t('skills')}</Paragraph>
                    </View>
                    <View style={styles.right}>
                        <AddSkillDialog addSkill={this.props.addSkill} />
                    </View>
                </View>

                <HorizontalSkillList
                    style={styles.scroll}
                    skills={this.props.requiredSkills}
                    delSkill={this.props.delSkill}
                />
                <View>
                    <Paragraph style={styles.smallText}>{this.props.t('datePick')}</Paragraph>
                    <View style={styles.datePickerContainer}>
                        <Paragraph style={styles.datePicker}>DATEPICKER 1</Paragraph>
                        <Paragraph style={styles.datePicker}>DATEPICKER 2</Paragraph>
                    </View>
                </View>
            </View>
        );
    }
}

export const FilterOptions = withNamespaces(['Sort'])(_FilterOptions);

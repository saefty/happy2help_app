// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Title, Switch, Paragraph, Divider } from 'react-native-paper';
import styles from './filter.styles';
import { withNamespaces, i18n } from 'react-i18next';
import type { SkillObject } from '../../../../models/skill.model';
import { HorizontalSkillList } from './funnelElements/horizontalSkillList';
import { AddSkillDialog } from '../../../profile/skillList/addSkillDialog';
import DateRangeButtons from './../../../event/dates/DateRangeButtons';

type Props = {
    t: i18n.t,
    requiredSkills: Array<SkillObject>,
    addSkill: (skill: SkillObject) => void,
    delSkill: (skill: SkillObject) => void,
    showPrivateEvents: boolean,
    handleSwitch: () => void,
    fromDate: date,
    toDate: date,
    updateFromDate: (date: date) => void,
    updateToDate: (date: date) => void,
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

                <View style={styles.spacedContainer}>
                    <Paragraph style={{ marginTop: 6, marginLeft: 10, marginBottom: 12 }}>{this.props.t('hidePrivateEvents')}</Paragraph>
                    <Switch style={{ marginRight: 20 }} value={!this.props.showPrivateEvents} onValueChange={this.props.handleSwitch} />
                </View>
                <Divider style={styles.divider} />
                <View style={styles.spacedContainer}>
                    <Paragraph style={{ marginTop: 12, marginLeft: 10, marginBottom: 12 }}>{this.props.t('skills')}</Paragraph>
                    <View style={{ marginRight: 20 }}>
                        <AddSkillDialog addSkill={this.props.addSkill} />
                    </View>
                </View>
                <HorizontalSkillList style={styles.scroll} skills={this.props.requiredSkills} delSkill={this.props.delSkill} />
                <Divider style={styles.divider} />
                <View>
                    <Paragraph style={{ marginTop: 12, marginLeft: 10 }}>{'Nach Zeitraum filtern'}</Paragraph>
                    <DateRangeButtons
                        startDate={this.props.fromDate}
                        endDate={this.props.toDate}
                        updateStart={this.props.updateFromDate}
                        updateEnd={this.props.updateToDate}
                        containerStyle={{ marginTop: 10 }}
                        hideLabels={true}
                    />              
                </View>
            </View>
        );
    }
}

export const FilterOptions = withNamespaces(['Sort'])(_FilterOptions);

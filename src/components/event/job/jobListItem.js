// @flow
import type { Job } from '../../../models/job.model';
import type { Participation } from '../../../models/participation.model';

import React, { Component } from 'react';
import { Text, Paragraph, Subheading, Divider } from 'react-native-paper';
import { View } from 'react-native';
import { JobParticipationButton } from './jobParticipationButton';
import { participationTypes } from '../../../models/participation.model';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { SkillList } from './../../profile/skillList/skillList';

import { styles } from './jobListItem.style';
import { withNamespaces, i18n } from 'react-i18next';

type Props = {
    job: Job,
    createParticipation: (job: Job, participation: Participation) => any,
    updateParticipation: (job: Job, participation: Participation) => any,
    t: i18n.t,
};

class _JobListItem extends Component<Props> {
    renderIcon = () => {
        const { job } = this.props;
        const icon = job.totalPositions <= this.jobParticipationCount() ? 'check' : 'work';
        return <Icon name={icon} size={25} />;
    };

    getMockSkills = () => {
        return [
            {
                id: 1,
                name: 'Führerschein',
            },
            {
                id: 2,
                name: 'Hygiene Karte',
            },
        ];
    };

    jobParticipationCount = () => {
        const { job } = this.props;
        return job.participationSet.filter(x => x.state !== participationTypes.Accepted).length;
    };

    totalPositions = () => {
        const { job } = this.props;
        if (job.totalPositions === null) {
            return <IconEntypo name="infinity" />;
        } else {
            return <Text>{job.totalPositions}</Text>;
        }
    };

    renderPositionsText = () => {
        const { job } = this.props;
        if (job.totalPositions !== null && job.totalPositions <= this.jobParticipationCount()) return;
        return (
            <View>
                <View style={(styles.row, styles.positions)}>
                    <Text style={styles.boldText}>{this.props.t('positions')}: </Text>
                    <Text>
                        {this.jobParticipationCount()}/{this.totalPositions()}
                    </Text>
                </View>
                <View style={styles.button}>
                    <JobParticipationButton
                        participation={job.currentUsersParticipation}
                        apply={async (participation: Participation) => this.props.createParticipation(job, participation)}
                        cancel={async (participation: Participation) => this.props.updateParticipation(job, participation)}
                    />
                </View>
            </View>
        );
    };

    renderSkills = () => {
        let skillSet = this.props.job.requiresskillSet;
        if (skillSet === undefined || skillSet.length == 0) {
            return;
        }
        let skills = skillSet.map(skill => skill.skill);
        return (
            <View style={styles.skillContainer}>
                <Text style={styles.boldText}>Benötigte Fähigkeiten:</Text>
                <SkillList skillObjects={skills} />
            </View>
        );
    };

    render() {
        const { job } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    {this.renderIcon()}
                    <Subheading style={styles.heading}>{job.name}</Subheading>
                </View>
                <Paragraph style={styles.row}>
                    <Text style={styles.boldText}>{this.props.t('description')}</Text>
                    {job.description}
                </Paragraph>
                {this.renderSkills()}
                <View>{this.renderPositionsText()}</View>
                <Divider style={styles.divider} />
            </View>
        );
    }
}

export const JobListItem = withNamespaces(['Job'])(_JobListItem);

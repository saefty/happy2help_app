// @flow
import type { Job } from '../../../models/job.model';
import type { Participation } from '../../../models/participation.model';

import React, { Component } from 'react';
import { Text, Paragraph, Subheading } from 'react-native-paper';
import { View } from 'react-native';
import { JobParticipationButton } from './jobParticipationButton';
import { participationTypes } from '../../../models/participation.model';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { SkillList } from './../../profile/skillList/skillList';
import { ParticipationState } from './../../userJobs/participationState/participationState';

import { styles } from './jobListItem.style';
import { withNamespaces, i18n } from 'react-i18next';

type Props = {
    job: Job,
    createParticipation: (job: Job, participation: Participation) => any,
    updateParticipation: (job: Job, participation: Participation) => any,
    t: i18n.t,
    startDate: Date,
};

class _JobListItem extends Component<Props> {
    isFull = () => {
        const job = this.props.job;
        if (job.totalPositions === null) return false;
        return job.totalPositions <= this.jobParticipationCount();
    };

    jobParticipationCount = () => {
        const job = this.props.job;
        return job.participationSet.filter(x => x.state === participationTypes.Accepted).length;
    };

    totalPositions = () => {
        const job = this.props.job;
        if (job.totalPositions === null) {
            return <IconEntypo name="infinity" />;
        } else {
            return <Text>{job.totalPositions}</Text>;
        }
    };

    renderPositionsText = () => {
        return (
            <View style={(styles.row, styles.positions)}>
                <Text style={styles.boldText}>{this.props.t('positions')}: </Text>
                <Text>
                    {this.jobParticipationCount()}/{this.totalPositions()}
                </Text>
            </View>
        );
    };

    renderJobParticipationButton = () => {
        const job = this.props.job;
        const currentUsersParticipation = job.currentUsersParticipation;
        //if event is over don't show
        if (new Date() > new Date(this.props.startDate)) return;
        //if user participated or got declined don't show
        if (
            currentUsersParticipation !== null &&
            (currentUsersParticipation.state == participationTypes.Declined ||
                currentUsersParticipation.state == participationTypes.Participated)
        ) {
            return;
        }
        return (
            <View style={styles.button}>
                <JobParticipationButton
                    participation={job.currentUsersParticipation}
                    apply={async (participation: Participation) => this.props.createParticipation(job, participation)}
                    cancel={async (participation: Participation) => this.props.updateParticipation(job, participation)}
                />
            </View>
        );
    };

    renderSkills = () => {
        const skillSet = this.props.job.requiresskillSet;
        if (skillSet === undefined || skillSet.length == 0) {
            return;
        }
        if (this.jobParticipationCount() == 0) return; //if there are no openpositions
        let skills = skillSet.map(skill => skill.skill);
        return (
            <View style={styles.skillContainer}>
                <Text style={styles.boldText}>Benötigte Fähigkeiten:</Text>
                <SkillList skillObjects={skills} />
            </View>
        );
    };

    renderParticipationState = () => {
        const currentUsersParticipation = this.props.job.currentUsersParticipation;
        if (!currentUsersParticipation) return;
        if (currentUsersParticipation.state == participationTypes.Canceled) return; //show nothing if user canceled
        return <ParticipationState style={{ marginTop: 10 }} participationState={currentUsersParticipation.state} />;
    };

    render() {
        const job = this.props.job;
        //if there are no openpositions and the user did not already applied dont show job details
        if (
            job.totalPositions !== null &&
            this.isFull() &&
            (job.currentUsersParticipation === null || job.currentUsersParticipation.state == participationTypes.Canceled)
        ) {
            return (
                <View style={styles.container}>
                    <View style={styles.row}>
                        <Subheading style={[styles.heading, { color: 'grey' }]}>{job.name} - voll</Subheading>
                    </View>
                    <Paragraph style={styles.row}>
                        <Text style={styles.boldText}>{this.props.t('description')}</Text>
                        {job.description}
                    </Paragraph>
                    {this.renderSkills()}
                    <View>{this.renderPositionsText()}</View>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.row}>
                        <Subheading style={styles.heading}>{job.name}</Subheading>
                    </View>
                    <Paragraph style={styles.row}>
                        <Text style={styles.boldText}>{this.props.t('description')}</Text>
                        {job.description}
                    </Paragraph>
                    {this.renderSkills()}
                    <View>{this.renderPositionsText()}</View>
                    {this.renderJobParticipationButton()}
                    {this.renderParticipationState()}
                </View>
            );
        }
    }
}

export const JobListItem = withNamespaces(['Job'])(_JobListItem);

// @flow
import type { Job } from '../../../models/job.model'
import type { Participation } from '../../../models/participation.model'

import React, { Component } from 'react';
import { Text, Paragraph, Subheading, Divider } from 'react-native-paper';
import { View } from 'react-native';
import { JobParticipationButton } from './jobParticipationButton';
import { participationTypes } from '../../../models/participation.model';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { styles } from './jobListItem.style';
import { withNamespaces, i18n } from 'react-i18next';

type Props = {
    job: Job,
    createParticipation: (job: Job, participation: Participation) => any,
    updateParticipation: (job: Job, participation: Participation) => any,
    t: i18n.t
}

class _JobListItem extends Component<Props> {

    renderIcon = () => {
        const { job } = this.props;
        const icon = job.totalPositions <= this.jobParticipationCount() ? 'check' : 'work'
        return <Icon name={icon} size={35} />;
    }

    jobParticipationCount = () => {
        const { job } = this.props;
        return job.participationSet.filter(x => x.state === participationTypes.Accepted).length
    }

    renderPositionsText = () => {
        const { job } = this.props;
        if(job.totalPositions <= this.jobParticipationCount()) return;
        return (
            <View>
                <View style={styles.row}>
                    <Text>{this.props.t('positions')}: {job.totalPositions}/{this.jobParticipationCount(job)}</Text>
                </View>
                <View style={styles.row}>
                    <JobParticipationButton
                        participation={job.currentUsersParticipation}
                        apply={ async (participation: Participation) => this.props.createParticipation(job, participation)}
                        cancel={ async (participation: Participation) => this.props.updateParticipation(job, participation)}                    
                    />
                </View>
            </View>
        );
    }

    render() {
        const { job } = this.props;
        return (
        <View style={styles.container}>
            <View style={styles.row}>
                {this.renderIcon()}
                <Subheading style={styles.heading}>{job.name}</Subheading>
            </View>
            <Paragraph style={styles.row}>
                {this.props.t('description')}
                {job.description}
            </Paragraph>
            <View>
                {this.renderPositionsText()}
            </View>
            <Divider />
        </View>
      )
    }
}

export const JobListItem = withNamespaces(['Job'])(_JobListItem); 
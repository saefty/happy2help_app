// @flow
import type { Job } from '../../models/job.model';
import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Divider, Button } from 'react-native-paper';
import { JobListItem } from '../../event/job/jobListItem';
import { styles } from './userParticipation.style';
import { SlimDate } from '../../utils/date/slimDate';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
    job: Job,
    createParticipation: graphql.mutate,
    updateParticipation: graphql.mutate,
};

class _UserParticipation extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    getSrc = () => {
        const event = this.props.job.event;
        if (event.organisation) {
            if (event.organisation.image) {
                return {uri: event.organisation.image.url};
            } else {
                return require('./../../../../assets/images/profile/profile_mult.png');
            }
        }
        if (event.creator.image) {
            return {uri: event.creator.image.url};
        } else {
            return require('./../../../../assets/images/profile/baseline_person_black_48.png');
        }
    };

    getApprovedIcon = () => {
        if (this.props.job.event.organisation) {
            return <Icon style={{ position: 'absolute', top: 0, right: 0 }} name="check-circle" size={20} color="green" />;
        }
    };

    render() {
        return (
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <SlimDate date={new Date(this.props.job.event.start)} />
                        <Button
                            uppercase={false}
                            style={{ fontSize: 20 }}
                            onPress={() =>
                                this.props.navigation.navigate('DetailedEventView', {
                                    event: this.props.job.event,
                                })
                            }
                        >
                            {this.props.job.event.name}
                        </Button>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={this.getSrc()} style={styles.creatorPicture} />
                        {this.getApprovedIcon()}
                    </View>
                </View>

                <Divider style={styles.divider} />
                <JobListItem
                    job={this.props.job}
                    updateParticipation={this.props.updateParticipation}
                    createParticipation={this.props.createParticipation}
                    startDate={this.props.job.event.start}
                />
            </View>
        );
    }
}

export const UserParticipation = withNavigation(_UserParticipation);

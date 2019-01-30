// @flow
import React, { Component } from 'react';
import { View, ScrollView, ActivityIndicator, Platform } from 'react-native';
import ProfileView from '../../../components/profile/viewProfile/viewProfile';
import { Appbar } from 'react-native-paper';
import { styles } from './viewMyProfile.screen.style';
import { CreditPoints } from '../../../components/profile/viewProfile/creditPoints/creditPoints';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { BASE_USER } from '../../../fragments';
import { secondaryColor } from '../../../../themes/colors';

type Props = {
    userId: number,
};

export class ViewParticipantScreen extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <Query
                query={gql`
                    query findParticipant($participantId: ID!) {
                        findParticipant(userId: $participantId) {
                            ...BASE_USER
                        }
                    }
                    ${BASE_USER}
                `}
                variables={{
                    participantId: this.props.userId,
                }}
            >
                {({ data }) => {
                    const appBar = (
                        <Appbar.Header style={styles.appbar}>
                            <Appbar.BackAction icon="cancel" onPress={() => this.props.navigation.goBack()} />
                            <Appbar.Content title="" />
                        </Appbar.Header>
                    );

                    if (!data || !data.findParticipant) {
                        return (
                            <View style={{ flex: 1 }}>
                                {appBar}
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <ActivityIndicator size={Platform.select({ ios: 0, android: 45 })} color={secondaryColor} />
                                </View>
                            </View>
                        );
                    }

                    const user = data.findParticipant;
                    return (
                        <View style={styles.container}>
                            {appBar}
                            <ScrollView style={styles.profileViewContainer}>
                                <ProfileView user={user} {...this.props} />
                            </ScrollView>
                            <CreditPoints creditPoints={user.profile.creditPoints} />
                        </View>
                    );
                }}
            </Query>
        );
    }
}

// @flow
import React, { Component } from 'react';

import { View, ActivityIndicator } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import gql from 'graphql-tag';
import { withApollo, Query } from 'react-apollo';
import { Appbar } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import ProfileView from '../../../components/profile/viewProfile/viewProfile';
import { withNavigation, NavigationActions } from 'react-navigation';
import { H2HTheme } from '../../../../themes/default.theme';
import { showMessage } from 'react-native-flash-message';
import { JobCheckInDeclineButton } from '../../../components/event/job/jobCheckInDeclineButton';
import { withNamespaces } from 'react-i18next';
import { PARTICIPATION_LIST_QUERY } from './participationList.screen';
import { primaryColor, neutralColors } from '../../../../themes/colors';
import { participationTypes } from '../../../models/participation.model';

const VERIFY_QUERY = gql`
    query qrCheckToken($token: String!) {
        qrCheckToken(token: $token) {
            id
            username
            profile {
                location {
                    name
                }
                creditPoints
            }
            image {
                id
                url
            }
            skills {
                id
                name
            }
        }
    }
`;

export class ScanScreen_ extends Component<any, any> {
    state = {
        isRender: true,
        u: undefined,
    };

    scrollView: ScrollView = React.createRef();

    componentDidMount() {
        this.props.navigation.addListener('willFocus', () => {
            this.setState({ isRender: true });
        });
        this.props.navigation.addListener('willBlur', () => {
            this.setState({ isRender: false });
        });
    }

    onSuccess = async (e: { data: string }, event: any) => {
        const rsp = await this.props.client.query({
            query: VERIFY_QUERY,
            fetchPolicy: 'no-cache',
            variables: { token: e.data },
        });
        const user = rsp.data.qrCheckToken;

        if (rsp.errors) {
            showMessage({
                message: 'QR Code is invalid',
                type: 'danger',
                icon: 'auto',
            });
            return;
        }
        if (!this._participationForUser(event, user)) {
            showMessage({
                message: 'User is not accepted for this event.',
                type: 'danger',
                icon: 'auto',
            });
            return;
        }

        await this.setState({ u: user }, () => {});
        await this.forceUpdate(() => {});
        setTimeout(() => {
            this.scrollView.scrollToEnd({ animated: true });
        }, 150);
    };

    checkInParticipation = async (mutate: gql.mutate, data: any) => {
        await mutate({
            variables: {
                participationId: this._participationForUser(data).id,
                state: 1,
            },
        });

        this.setState({ u: undefined });
        showMessage({
            message: this.props.t('checkedIn'),
            type: 'success',
            icon: 'auto',
        });
    };

    decline = async (mutate: gql.mutate, data: any) => {
        await mutate({
            variables: {
                participationId: this._participationForUser(data).id,
                state: 3,
            },
        });

        this.setState({ u: undefined });
        showMessage({
            message: this.props.t('declined'),
            type: 'danger',
            icon: 'auto',
        });
    };

    _participationForUser = (event: any, user?: any) => {
        const curUser = user || this.state.u;
        const participations = [].concat.apply([], event.jobSet.map(job => job.participationSet));

        const participation = participations.filter(p => p.user.id === curUser.id)[0];
        if (!participation) return;
        if (participation.state !== participationTypes.Canceled) return participation;
    };

    topContent = (data: any) => {
        if (!data || !this.state.u) return;
        const p = this._participationForUser(data);
        if (!p) return;
        return (
            this.state.u && (
                <JobCheckInDeclineButton
                    participation={p}
                    decline={mutate => this.decline(mutate, data)}
                    checkin={mutate => this.checkInParticipation(mutate, data)}
                />
            )
        );
    };

    bottomContent = () => {
        return (
            this.state.u && (
                <View
                    style={{
                        backgroundColor: neutralColors.surface,
                    }}
                >
                    <ProfileView user={this.state.u} />
                </View>
            )
        );
    };

    render() {
        if (!this.state.isRender) return null;
        return (
            <View style={{ flex: 1 }}>
                <Appbar.Header style={{ elevation: 0 }}>
                    <Appbar.BackAction onPress={() => this.props.navigation.dispatch(NavigationActions.back())} />
                    <Appbar.Content title={this.props.screenProps.event.name + " - Check-in"} />
                </Appbar.Header>
                <Query query={PARTICIPATION_LIST_QUERY} variables={{ id: this.props.screenProps.event.id }}>
                    {({ error, loading, data }) => {
                        if (error || loading) return null;
                        return (
                            <ScrollView ref={ref => (this.scrollView = ref)}>
                                <View>
                                    <QRCodeScanner
                                        reactivateTimeout={1000}
                                        showMarker={true}
                                        onRead={qr => {
                                            this.onSuccess(qr, data.event);
                                        }}
                                        reactivate={true}
                                        topContent={this.topContent(data.event)}
                                        topViewStyle={{
                                            top: 350,
                                            zIndex: 10,
                                        }}
                                        bottomViewStyle={{
                                            top: 10,
                                        }}
                                        bottomContent={this.bottomContent()}
                                    />
                                </View>
                            </ScrollView>
                        );
                    }}
                </Query>
            </View>
        );
    }
}

export const ParticipationCheckInScreen = withNavigation(withApollo(withNamespaces(['FlashMessages'])(ScanScreen_)));

// @flow
import React, { Component } from 'react';

import { View } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
import { Appbar } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import ProfileView from '../../../components/profile/viewProfile/viewProfile';
import { withNavigation, NavigationActions } from 'react-navigation';
import { H2HTheme } from '../../../../themes/default.theme';
import { showMessage } from 'react-native-flash-message';
import { JobCheckInDeclineButton } from '../../../components/event/job/jobCheckInDeclineButton';
import { withNamespaces } from 'react-i18next';

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
            skills {
                id
                name
                approved
            }
        }
    }
`;

export class ScanScreen_ extends Component<any, any> {
    state = {
        isRender: true,
        u: undefined,
        event: undefined,
    };
    constructor(props: any) {
        super(props);
        // We need to set the event as a state since the navigation will never pass the updated prop to this screen.

        this.state = {
            isRender: true,
            u: undefined,
            event: this.props.screenProps.event,
        };
    }
    scrollView: ScrollView = React.createRef();

    componentDidMount() {
        this.props.navigation.addListener('willFocus', () => {
            this.setState({ isRender: true });
        });
        this.props.navigation.addListener('willBlur', () => {
            this.setState({ isRender: false });
        });
    }

    onSuccess = async (e: { data: string }) => {
        const rsp = await this.props.client.query({
            query: VERIFY_QUERY,
            variables: { token: e.data },
        });
        await this.setState({ u: rsp.data.qrCheckToken }, () => {});
        await this.forceUpdate(() => {});
        setTimeout(() => {
            this.scrollView.scrollToEnd({ animated: true });
        }, 150);
    };

    get participationForUser() {
        const participations = [].concat.apply([], this.state.event.jobSet.map(job => job.participationSet));

        return participations.filter(p => p.user.id === this.state.u.id)[0];
    }

    async newEvent() {
        return (await this.props.screenProps.refetch()).data.user.eventSet.filter(e => e.id === this.state.event.id)[0];
    }

    checkInParticipation = async (mutate: gql.mutate) => {
        await mutate({
            variables: {
                participationId: this.participationForUser.id,
                state: 1,
            },
        });

        const newEvent = await this.newEvent();

        this.setState({ u: undefined, event: newEvent });
        showMessage({
            message: this.props.t('checkedIn'),
            type: 'success',
            icon: 'auto',
        });
    };

    decline = async (mutate: gql.mutate) => {
        await mutate({
            variables: {
                participationId: this.participationForUser.id,
                state: 3,
            },
        });

        const newEvent = await this.newEvent();

        this.setState({ u: undefined, event: newEvent });
        showMessage({
            message: this.props.t('declined'),
            type: 'danger',
            icon: 'auto',
        });
    };

    get topContent() {
        return (
            this.state.u && (
                <JobCheckInDeclineButton
                    participation={this.participationForUser}
                    decline={mutate => this.decline(mutate)}
                    checkin={mutate => this.checkInParticipation(mutate)}
                />
            )
        );
    }

    get bottomContent() {
        return (
            this.state.u && (
                <View
                    style={{
                        backgroundColor: H2HTheme.colors.surface,
                    }}
                >
                    <ProfileView user={this.state.u} />
                </View>
            )
        );
    }

    render() {
        if (!this.state.isRender) return null;
        return (
            <View style={{ flex: 1 }}>
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => this.props.navigation.dispatch(NavigationActions.back())} />
                </Appbar.Header>
                <ScrollView ref={ref => (this.scrollView = ref)}>
                    <View>
                        <QRCodeScanner
                            reactivateTimeout={1000}
                            showMarker={true}
                            onRead={this.onSuccess}
                            reactivate={true}
                            topContent={this.topContent}
                            topViewStyle={{
                                top: 350,
                                zIndex: 10,
                            }}
                            bottomViewStyle={{
                                top: 10,
                            }}
                            bottomContent={this.bottomContent}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export const ParticipationCheckInScreen = withNavigation(withApollo(withNamespaces(['FlashMessages'])(ScanScreen_)));

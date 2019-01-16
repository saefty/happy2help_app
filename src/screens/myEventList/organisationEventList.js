// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Portal, Headline, Appbar, IconButton } from 'react-native-paper';
import { UserEventList } from '../../components/userEvents/userEventList';
import { Provider as PaperProvider, FAB } from 'react-native-paper';
import type { EventObject } from '../../models/event.model';
import { H2HTheme } from '../../../themes/default.theme';
import { withNamespaces, i18n } from 'react-i18next';
import { NavigationEvents } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { OrganisationEventDataProvider } from './organisationEventDataProvider';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';

type Props = {
    t: i18n.t,
};

type State = {
    orgaId?: number,
};

class _OrganisationEventList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            orgaId: undefined,
        };
    }
    componentDidMount() {
        this.refresh();
    }

    openEventModal = (event: EventObject) => {
        this.props.navigation.navigate('DetailedEventView', {
            event: event,
        });
    };

    onEventEdit = (event: EventObject) => {
        this.props.navigation.navigate('EditEvent', {
            event: event,
        });
    };

    onEventCheckIn = (event: EventObject, refetch: () => void) => {
        this.props.navigation.navigate('CheckIn', {
            screenProps: { event, refetch },
        });
    };

    onEventApplications = (event: EventObject, refetch: () => void) => {
        this.props.navigation.navigate('Applications', {
            screenProps: { event, refetch },
        });
    };

    getORGA = async () => {
        const result = await this.props.client.query({
            query: gql`
                query {
                    ORGANISATION_ID @client
                }
            `,
            fetchPolicy: 'cache-only',
        });
        return result.data.ORGANISATION_ID;
    };

    refresh = async () => {
        const id = await this.getORGA();
        this.setState({ orgaId: id });
    };

    render() {
        const orgaId = this.state.orgaId;
        if (!orgaId) return <View />;
        return (
            <OrganisationEventDataProvider id={orgaId}>
                {(organisation, refetch) => {
                    <NavigationEvents onWillFocus={refetch} />;
                    return (
                        <PaperProvider theme={H2HTheme}>
                            <NavigationEvents onWillFocus={() => this.refresh()} />
                            <Appbar.Header>
                                <IconButton
                                    icon={() => <IconMat name="menu" size={24} color={'#fff'} />}
                                    onPress={() => this.props.navigation.openDrawer()}
                                    style={{
                                        alignSelf: 'center',
                                        left: 4,
                                    }}
                                />
                                <Appbar.Content title={organisation.name + " Events"} />
                            </Appbar.Header>
                            <KeyboardAwareScrollView>
                                <View>
                                    <Headline>{}</Headline>
                                    <UserEventList
                                        events={organisation.eventSet}
                                        onEventTouch={this.openEventModal}
                                        onEventEdit={this.onEventEdit}
                                        onEventCheckIn={event => {
                                            this.onEventCheckIn(event, refetch);
                                        }}
                                        onEventApplications={event => {
                                            this.onEventApplications(event, refetch);
                                        }}
                                    />
                                    <Portal>
                                        <FAB
                                            icon="add"
                                            style={{ position: 'absolute', bottom: 0, right: 0, margin: 20 }}
                                            onPress={() =>
                                                this.props.navigation.navigate('EditEvent', {
                                                    orgaId: orgaId,
                                                })
                                            }
                                        />
                                    </Portal>
                                </View>
                            </KeyboardAwareScrollView>
                        </PaperProvider>
                    );
                }}
            </OrganisationEventDataProvider>
        );
    }
}

export const OrganisationEventList = withApollo(withNamespaces(['Event'])(_OrganisationEventList));

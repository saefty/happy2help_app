// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Portal, Headline, Appbar, IconButton } from 'react-native-paper';
import { UserEventList } from '../../components/userEvents/userEventList';
import { EventFAB } from '../../components/userEvents/eventFAB';
import { Provider as PaperProvider } from 'react-native-paper';
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
        this.props.navigation.navigate('Edit', {
            event: event,
        });
    };

    onEventParticipation = (event: EventObject, refetch: () => void) => {
        this.props.navigation.navigate('Participations', {
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
                    <Appbar.Content title={this.props.t('myEvents')} />
                </Appbar.Header>
                <KeyboardAwareScrollView>
                    <OrganisationEventDataProvider id={orgaId}>
                        {(organisation, refetch) => {
                            return (
                                <View>
                                    <Headline>{}</Headline>
                                    <UserEventList
                                        events={organisation.eventSet}
                                        onEventTouch={this.openEventModal}
                                        onEventEdit={this.onEventEdit}
                                        onEventParticipation={event => {
                                            this.onEventParticipation(event, refetch);
                                        }}
                                    />
                                    <Portal>
                                        <EventFAB addEvent={() => this.props.navigation.navigate('EditEvent')} />
                                    </Portal>
                                </View>
                            );
                        }}
                    </OrganisationEventDataProvider>
                </KeyboardAwareScrollView>
            </PaperProvider>
        );
    }
}

export const OrganisationEventList = withApollo(withNamespaces(['Event'])(_OrganisationEventList));

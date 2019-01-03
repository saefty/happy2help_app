// @flow
import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';
import { UserParticipationsList } from '../../components/userParticipations/participationsList/userParticipationList';
import { MyJobsDataProvider } from './myJobsProvider';
import { Provider } from 'react-native-paper';
import type { EventObject } from '../../models/event.model';
import { H2HTheme } from '../../../themes/default.theme';
import { withNamespaces, i18n } from 'react-i18next';
import { participationTypes } from '../../models/participation.model';
import { withNavigation } from 'react-navigation';
import { styles } from './userParticipationsScreen.styles';

import { NavigationEvents } from 'react-navigation';

type Props = {
    t: i18n.t,
};

type State = {
    event?: EventObject,
    visible: boolean,
    selectedIndex: number,
};

class _MyParticipations extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    openEventModal = (event: EventObject) => {
        this.props.navigation.navigate('DetailedEventView', {
            event: event,
        });
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Appbar.Header style={{ backgroundColor: 'white' }}>
                    <Appbar.Action color={H2HTheme.colors.primary} icon="menu" onPress={() => this.props.navigation.openDrawer()} />
                    <Appbar.Content title={this.props.t('myJobs')} />
                </Appbar.Header>
                <ScrollView style={styles.scrollView}>
                    <MyJobsDataProvider>
                        {(user, refetch) => {
                            return (
                                <View>
                                    <NavigationEvents onWillFocus={refetch} />
                                    <UserParticipationsList
                                        openEventDetails={this.openEventModal}
                                        participationSet={user.participationSet.filter(x => x.state !== participationTypes.Canceled)}
                                    />
                                </View>
                            );
                        }}
                    </MyJobsDataProvider>
                </ScrollView>
            </View>
        );
    }
}

export const MyParticipations = withNamespaces(['Event'])(withNavigation(_MyParticipations));

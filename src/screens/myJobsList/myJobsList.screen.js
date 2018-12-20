// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { UserJobList } from '../../components/userJobs/userJobList';
import { MyJobsDataProvider } from './myJobsProvider';
import { Provider } from 'react-native-paper';
import type { EventObject } from '../../models/event.model';
import { H2HTheme } from '../../../themes/default.theme';
import { withNamespaces, i18n } from 'react-i18next';
import { participationTypes } from '../../models/participation.model';
import { withNavigation } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type Props = {
    t: i18n.t,
};

type State = {
    event?: EventObject,
    visible: boolean,
    selectedIndex: number,
};

class _MyJobList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    openEventModal = (event: EventObject) => {
        this.props.navigation.navigate('DetailedEventView', {
            event: event,
        });
    };

    // This component is wrapped in its own provider as the FAB Button in this screen would cause issues
    // Look at https://github.com/callstack/react-native-paper/issues/420
    render() {
        return (
            <Provider theme={H2HTheme}>
                <Appbar.Header style={{ backgroundColor: 'white' }}>
                    <Appbar.Action color={H2HTheme.colors.primary} icon="menu" onPress={() => this.props.navigation.openDrawer()} />
                    <Appbar.Content title={this.props.t('myJobs')} />
                </Appbar.Header>
                <KeyboardAwareScrollView>
                    <MyJobsDataProvider>
                        {user => {
                            return (
                                <View>                                   
                                    <UserJobList
                                        openEventDetails={this.openEventModal}
                                        participationSet={user.participationSet.filter(x => x.state !== participationTypes.Canceled)}
                                    />
                                </View>
                            );
                        }}
                    </MyJobsDataProvider>
                </KeyboardAwareScrollView>
            </Provider>
        );
    }
}

export const MyJobList = withNamespaces(['Event'])(withNavigation(_MyJobList));

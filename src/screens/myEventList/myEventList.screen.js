// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Portal, Headline } from 'react-native-paper';
import { UserEventList } from '../../components/userEvents/userEventList';
import { UserJobList } from '../../components/userEvents/userJobList';
import { MyEventDataProvider } from './myEventDataProvider';
import { EventFAB } from '../../components/userEvents/eventFAB';
import styles from '../../components/userEvents/userEvents.styles';
import { Provider } from 'react-native-paper';
import type { EventObject } from '../../models/event.model';
import { H2HTheme } from '../../../themes/default.theme';
import { EventDetailModal } from '../../components/event/eventDetailModal';
import { withNamespaces, i18n } from 'react-i18next';
import { participationTypes } from '../../models/participation.model';
import { SegmentedControl } from '../../components/utils/SegmentedControl';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type Props = {
    t: i18n.t,
};

type State = {
    event?: EventObject,
    selectedIndex: number,
};
class MyEventListComponent extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            selectedIndex: 0,
        };
    }

    openEventModal = (event: EventObject) => {
        this.props.navigation.navigate('DetailedEventView', {
            event: event,
        });
    };

    setIndex = index => this.setState({ selectedIndex: index });

    // This component is wrapped in its own provider as the FAB Button in this screen would cause issues
    // Look at https://github.com/callstack/react-native-paper/issues/420
    render() {
        return (
            <Provider theme={H2HTheme}>
                <View
                    style={{
                        width: '50%',
                        alignSelf: 'center',
                        marginTop: 20,
                    }}
                >
                    <SegmentedControl values={['Jobs', 'Events']} selectedIndex={this.state.selectedIndex} onTabPress={this.setIndex} />
                </View>
                <KeyboardAwareScrollView>
                    <MyEventDataProvider>
                        {user => {
                            if (this.state.selectedIndex === 1) {
                                return (
                                    <View>
                                        <Headline>{this.props.t('myEvents')}</Headline>
                                        <UserEventList events={user.eventSet} onEventTouch={this.openEventModal} />
                                        <Portal>
                                            <EventFAB addEvent={() => this.props.navigation.navigate('Edit')} />
                                        </Portal>
                                    </View>
                                );
                            } else {
                                return (
                                    <View>
                                        <Headline>{this.props.t('myJobs')}</Headline>
                                        <UserJobList participationSet={user.participationSet.filter(x => x.state !== participationTypes.Canceled)} />
                                    </View>
                                );
                            }
                        }}
                    </MyEventDataProvider>
                </KeyboardAwareScrollView>
            </Provider>
        );
    }
}
export const MyEventList = withNamespaces(['Event'])(MyEventListComponent);

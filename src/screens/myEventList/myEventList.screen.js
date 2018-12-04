// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Portal, Headline } from 'react-native-paper'
import { UserEventList } from '../../components/userEvents/userEventList';
import { UserJobList } from '../../components/userEvents/userJobList';
import { MyEventDataProvider } from './myEventDataProvider';
import { EventFAB } from '../../components/userEvents/eventFAB';
import styles from '../../components/userEvents/userEvents.styles';
import { Provider } from 'react-native-paper'
import type { EventObject } from '../../models/event.model';
import { H2HTheme } from '../../../themes/default.theme';
import { EventDetailModal } from '../../components/event/eventDetailModal';
import { withNamespaces, i18n } from 'react-i18next';


type Props = {
    t: i18n.t,
};

type State = {
    event?: EventObject,
    visible: boolean,
}
class MyEventListComponent extends Component<Props, State> {
    
    constructor(props: Props) {
        super(props);
    }

    state = {
        event: undefined,
        visible: false,
    }

    openEventModal = (event: EventObject) => {
        this.setState({event: event, visible: true });
    }

    hideModal = () => {
        this.setState({ visible: false })
    }

    // This component is wrapped in its own provider as the FAB Button in this screen would cause issues
    // Look at https://github.com/callstack/react-native-paper/issues/420
    render() {
        return (
        <Provider theme={H2HTheme}>
            <View>
                <Portal>
                    <EventDetailModal visible={this.state.visible} onDismiss={this.hideModal} event={this.state.event}></EventDetailModal>
                </Portal>
                <MyEventDataProvider>
                    {
                    user => 
                        <View style={styles.eventScreen}>
                            
                            <View style={styles.list}>
                                <Headline>{this.props.t("myEvents")}</Headline>
                                <UserEventList 
                                    events={user.eventSet} 
                                    onEventTouch={this.openEventModal}/>
                            </View>

                            <View style={styles.list}>
                                <Headline>{this.props.t("myJobs")}</Headline>
                                <UserJobList
                                    participationSet={user.participationSet} />
                            </View>
                            
                            <EventFAB
                            addEvent={() => {}}/>
                        </View>
                    }
                </MyEventDataProvider>
            </View>
        </Provider>

        );
    }
}
export const MyEventList = withNamespaces(['Event'])(MyEventListComponent);
// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { UserEventList } from '../../components/userEvents/userEventList';
import { UserJobList } from '../../components/userEvents/userJobList';
import { MyEventDataProvider } from './myEventDataProvider';
import { EventFAB } from '../../components/userEvents/eventFAB';
import styles from '../../components/userEvents/userEvents.styles';
import { Header } from '../../components/userEvents/header';

type Props = {
};

export class MyEventList extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View>
                <MyEventDataProvider>
                    {
                    user => 
                        <View style={styles.eventScreen}>
                            
                            <View style={styles.list}>
                                <Header text={'My Events'}/>
                                <UserEventList 
                                events={user.eventSet} />
                            </View>

                            <View style={styles.list}>
                                <Header text={'My Jobs'}/>
                                <UserJobList
                                participationSet={user.participationSet} />
                            </View>
                            
                            <EventFAB />
                        </View>
                    }
                </MyEventDataProvider>
            </View>
        );
    }
}

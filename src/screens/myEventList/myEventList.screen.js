// @flow
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { UserEventList } from '../../components/userEvents/userEventList';
import { MyEventDataProvider } from './myEventDataProvider';

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
                        // user => <Text>{JSON.stringify(user.participationSet)}</Text>
                        user => <UserEventList events={user.eventSet} participationSet={user.participationSet} {...this.props}/>
                    }
                </MyEventDataProvider>
            </View>
        );
    }
}

// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { UserEventList } from '../../components/userEvents/userEventList';
import { MyEventDataProvider } from './myEventDataProvider';
import { Provider } from 'react-native-paper'
import { H2HTheme } from '../../../themes/default.theme';


type Props = {
};

export class MyEventList extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    // This component is wrapped in its own provider as the FAB Button in this screen would cause issues
    // Look at https://github.com/callstack/react-native-paper/issues/420
    render() {
        return (
        <Provider theme={H2HTheme}>
            <View>
                <MyEventDataProvider>
                    {
                    user => <UserEventList events={user.eventSet} participationSet={user.participationSet} {...this.props}/>
                    }
                </MyEventDataProvider>
            </View>
        </Provider>

        );
    }
}

// @flow
import React, { Component } from "react";
import { FAB, Portal } from 'react-native-paper';

type Props = {
    addEvent: () => void,
};

type State = {
    open: boolean,
};

export class EventFAB extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    render() {
        return (
            <Portal>
                <FAB.Group
                open={this.state.open}
                icon={this.state.open ? 'today' : 'add'}
                style={{
                    top: 5
                }}
                actions={[
                    { icon: 'add', onPress: this.props.addEvent },
                    { icon: 'star', label: 'Star', onPress: () => console.log('Pressed star')},
                    { icon: 'email', label: 'Email', onPress: () => console.log('Pressed email') },
                    { icon: 'notifications', label: 'Remind', onPress: () => console.log('Pressed notifications') },
                ]}
                onStateChange={({ open }) => this.setState({ open })}
                onPress={() => {
                    if (this.state.open) {
                    // do something if the speed dial is open
                    }
                }}
                />
            </Portal>
        );
    }
              
}
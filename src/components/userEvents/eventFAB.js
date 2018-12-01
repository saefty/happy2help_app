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
        let buttonIcon = this.state.open ? 'highlight-off' : 'add';
        return (
            <FAB.Group
              open={this.state.open}
              icon={buttonIcon}
              style={{top: 5, position: 'absolute'}}
              actions={this.actions}
              onStateChange={({ open }) => this.setState({ open })}
            />
        );
    }
    get actions() {
        return [
            { icon: 'add', onPress: this.props.addEvent },
            { icon: 'help', label: 'info', onPress: this.info},
        ];
    }
    info() {
        console.log("Pressed info");
    }         
}
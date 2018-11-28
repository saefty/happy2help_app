// @flow
import React, { Component } from "react";
import { Text } from 'react-native';
import type { EventObject } from '../../models/event.model';

type Props = {
};

export class EventFAB extends Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render() {    
        
        return (
            <Text>TestFAB</Text>
        );   
    }
}
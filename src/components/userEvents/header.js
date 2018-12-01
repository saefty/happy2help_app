// @flow
import React, { Component } from "react";
import { View, Text } from 'react-native';
import headerStyles from './header.style';

type Props = {
    text: string,
};

export class Header extends Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render() {    
        return (
            <View style={headerStyles.container}>
                <Text style={headerStyles.text}>{this.props.text}</Text>
            </View>
        );   
    }

}
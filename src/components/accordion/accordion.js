/* @flow */

import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { List } from 'react-native-paper';

type Props = {
    title: string,
    icon: string,
    expansion: boolean,
    children: React.PropTypes.node,
};

type State = {
    expanded: boolean,
};

export default class Accordion extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            expanded: this.props.expansion,
        };
    }

    _handlePress = () =>
        this.setState({
            expanded: !this.state.expanded,
        });

    render() {
        let indentation = 28;
        return (
            <List.Accordion
                expanded={this.state.expanded}
                onPress={this._handlePress}
                title={<Text style={{ fontWeight: 'bold', fontSize: 18 }}>{this.props.title}</Text>}
                left={props => <List.Icon {...props} icon={this.props.icon} />}
            >
                <View style={{ paddingLeft: indentation }}>{this.props.children}</View>
            </List.Accordion>
        );
    }
}

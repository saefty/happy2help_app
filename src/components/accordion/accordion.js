/* @flow */

import { Component } from 'react';
import * as React from 'react';
import { Text, View } from 'react-native';
import { List } from 'react-native-paper';

type Props = {
    title: string,
    icon: string,
    expansion: boolean,
    children: (() => React.Node) | React.Node,
    padding?: number,
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
        let indentation = this.props.padding ? this.props.padding : 28;
        return (
            <List.Accordion
                expanded={this.state.expanded}
                onPress={this._handlePress}
                title={<Text style={{ fontWeight: 'bold', fontSize: 18 }}>{this.props.title}</Text>}
                left={props => <List.Icon {...props} icon={this.props.icon} />}
            >
                <View style={{ paddingLeft: indentation, paddingRight: indentation }}>{this.props.children}</View>
            </List.Accordion>
        );
    }
}

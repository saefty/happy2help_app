// @flow
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput as TextInputRNP } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
    t: i18n.t,
    src?: string,
    iconName: string,
    label: string,
    value?: string,
};

export class TextInput extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = { text: props.value ? props.value : '' };
    }
    render() {
        return (
            <View style={{ height: 50, margin: 10 }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ alignContent: 'center', width: 35, margin: 10, alignItems: 'center' }}>
                        <Icon name={this.props.iconName} size={32} />
                    </View>
                    <View style={{ height: 30, width: '80%' }}>
                        <TextInputRNP label={this.props.label}  
                        placeholder={this.props.value}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text} />
                    </View>
                </View>
            </View>
        );
    }
}

// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Chip } from 'react-native-paper';
import { styles } from './skillChipStyle'

type Props = {
    t: i18n.t,
    text: string,
    approved: boolean,
   
};

export class SkillChip extends Component<Props> {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View>
                <Chip style={styles.chip} icon={this.props.approved ? "check-circle" : null}>
                    <Text style={styles.text}>{this.props.text}</Text>
                </Chip>               
            </View>
        );
    }
}

// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import { List, RadioButton, Text, Button } from 'react-native-paper';
import styles from './accordion.styles';

type Props = {};
type State = {
    sorting: string,
    order: string,
};

const desc = 'descending';
const asc = 'ascending';

export class SortAccordion extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            sorting: 'alphabetic',
            order: desc,
        };
    }

    render() {
        return (
            <List.Section>
                <List.Accordion title={this.state.sorting + ' (' + this.state.order + ')'}>
                    <List.Item style={styles.item} title={'alphabetic'} onPress={() => this.setState(() => ({ sorting: 'alphabetic' }))} />
                    <List.Item style={styles.item} title={'by Date'} onPress={() => this.setState(() => ({ sorting: 'by Date' }))} />
                    <View style={styles.radioContainer}>
                        <View style={styles.radioButton}>
                            <RadioButton
                                value={desc}
                                status={this.state.order === desc ? 'checked' : 'unchecked'}
                                onPress={() => this.setState({ order: desc })}
                            />
                            <Text>{desc}</Text>
                        </View>
                        <View style={styles.radioButton}>
                            <RadioButton
                                value={asc}
                                status={this.state.order === asc ? 'checked' : 'unchecked'}
                                onPress={() => this.setState({ order: asc })}
                            />
                            <Text>{asc}</Text>
                        </View>
                        <Button mode="outlined" onPress={() => {}}>
                            GO
                        </Button>
                    </View>
                </List.Accordion>
            </List.Section>
        );
    }
}

// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import { List, RadioButton, Text, Button } from 'react-native-paper';

type Props = {};
type State = {
    sorting: string,
    order: string,
};

export class SortAccordion extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            sorting: 'alphabetic',
            order: 'descending',
        };
    }

    render() {
        return (
            <List.Section>
                <List.Accordion title={this.state.sorting + ' (' + this.state.order + ')'}>
                    <List.Item style={{marginLeft: 10}} title={'alphabetic'} onPress={() => this.setState(() => ({ sorting: 'alphabetic' }))} />
                    <List.Item style={{marginLeft: 10}} title={'by Date'} onPress={() => this.setState(() => ({ sorting: 'by Date' }))} />
                    <View style={{ flexDirection: 'row', justifyContent: "space-around" }}>
                        <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
                            <RadioButton
                                value="decending"
                                status={this.state.order === 'descending' ? 'checked' : 'unchecked'}
                                onPress={() => this.setState({ order: 'descending' })}
                            />
                            <Text>descending</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
                            <RadioButton
                                value="ascending"
                                status={this.state.order === 'ascending' ? 'checked' : 'unchecked'}
                                onPress={() => this.setState({ order: 'ascending' })}
                            />
                            <Text>ascending</Text>
                        </View>
                        <Button mode="outlined" onPress={() => {}}>GO</Button>
                    </View>
                </List.Accordion>
            </List.Section>
        );
    }
}

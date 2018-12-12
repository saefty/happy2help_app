// @flow

import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { List, RadioButton, Text } from 'react-native-paper';
import styles from './accordion.styles';
import { withNamespaces, i18n } from 'react-i18next';

type Props = {
    t: i18n.t,
    sorting: string,
    descending: boolean,
    changeSort: (sorting: string) => any,
    changeDescending: (descending: boolean) => any,
};

class SortAccordionComponent extends PureComponent<Props> {
    constructor(props: Props) {
        super(props);
    }

    get title(): string {
        let title = this.props.t(this.props.sorting) + ' (';
        title += this.props.descending === true ? this.props.t('descending') : this.props.t('ascending');
        title += ')';
        return title;
    }
    get desc() : string {
        return this.props.descending ? 'checked' : 'unchecked';
    }

    get asc() : string {
        return this.props.descending ? 'unchecked' : 'checked';
    }

    render() {
        return (
            <List.Section>
                <List.Accordion title={this.title}>
                    <List.Item
                        style={styles.item}
                        title={this.props.t('alphabetic')}
                        onPress={() => this.props.changeSort('alphabetic')}
                    />
                    <List.Item
                        style={styles.item}
                        title={this.props.t('byDate')}
                        onPress={() => this.props.changeSort('byDate')}
                    />

                    <View style={styles.radioContainer}>
                        <View style={styles.radioButton}>
                            <RadioButton
                                value={this.props.t('ascending')}
                                status={this.asc}
                                onPress={() => this.props.changeDescending(false)}
                            />
                            <Text>{this.props.t('ascending')}</Text>
                        </View>
                        <View style={styles.radioButton}>
                            <RadioButton
                                value={this.props.t('descending')}
                                status={this.desc}
                                onPress={() => this.props.changeDescending(true)}
                            />
                            <Text>{this.props.t('descending')}</Text>
                        </View>
                    </View>
                </List.Accordion>
            </List.Section>
        );
    }
}

export const SortAccordion = withNamespaces(['Sort'])(SortAccordionComponent);

// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import { Title, Switch, Paragraph, Divider } from 'react-native-paper';
import styles from './filter.styles';
import { withNamespaces, i18n } from 'react-i18next';
import { SkillList } from '../../profile/skillList/skillList';
import type { SkillObject } from '../../../models/skill.model';

type Props = {
    t: i18n.t,
    showPrivateEvents: boolean,
    handleSwitch: () => void,
};

type State = {
    skills: Array<SkillObject>,
};

class _FilterOptions extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            skills: [],
        };
    }

    get title(): string {
        return this.props.t('filter');
    }

    get switchInfo(): string {
        return this.props.t(this.props.showPrivateEvents === true ? 'on' : 'off');
    }
    render() {
        return (
            <View style={styles.filterContainer}>
                <View style={styles.titleContainer}>
                    <Title style={styles.title}>{this.title}</Title>
                </View>
                <View style={styles.switchContainer}>
                    <View style={styles.switchTextContainer}>
                        <Paragraph style={styles.switchText}>
                            {this.props.t('showPrivateEvents')} {this.switchInfo}
                        </Paragraph>
                    </View>
                    <Switch value={this.props.showPrivateEvents} onValueChange={this.props.handleSwitch} />
                </View>

                <Divider />

                <View style={styles.skillListContainer}>
                    <Paragraph style={styles.skillTitle}>{this.props.t('skills')}</Paragraph>
                    <SkillList
                        skillObjects={this.state.skills}
                        editable={true}
                        addSkill={(skill: SkillObject) =>
                            this.setState({
                                skills: this.state.skills.concat(skill),
                            })
                        }
                        deleteSkill={(skillToDelete: SkillObject) =>
                            this.setState({
                                skills: this.state.skills.filter(s => s.id != skillToDelete.id),
                            })
                        }
                    />
                </View>

                <Divider />

                
            </View>
        );
    }
}

export const FilterOptions = withNamespaces(['Sort'])(_FilterOptions);

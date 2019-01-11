// @flow

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SortOptions } from './sort.events.options';
import { FilterOptions } from './filter.events.options';
import { IconButton } from 'react-native-paper';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import { H2HTheme } from '../../../../../themes/default.theme';
import type { SkillObject } from '../../../../models/skill.model';
import moment from 'moment';

type Props = {
    open: boolean,
    updateQuery: (sorting: string, descending: boolean, filtering: { requiredSkills: Array<string>, showPrivate: boolean }) => void,
    showSortOptions: boolean,
    oldState: {
        sorting: string,
        descending: boolean,
        requiredSkills: Array<string>,
        showPrivateEvents: boolean,
    },
};

type State = {
    sorting: string,
    descending: boolean,
    requiredSkills: Array<SkillObject>,
    showPrivateEvents: boolean,
    fromDate: date,
    toDate: date,
};

export class FunnelDropdown extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            sorting: 'name',
            descending: false,
            requiredSkills: [],
            showPrivateEvents: true,
        };
    }
    hasNotChanged(): boolean {
        return (
            this.state.descending === this.props.oldState.descending &&
            this.state.sorting === this.props.oldState.sorting &&
            this.state.showPrivateEvents === this.props.oldState.showPrivateEvents &&
            this.state.requiredSkills.map(s => s.name).filter(s => this.props.oldState.requiredSkills.includes(s)).length ===
                this.state.requiredSkills.map(s => s.name).length &&
            this.props.oldState.requiredSkills.filter(s => this.state.requiredSkills.map(s => s.name).includes(s)).length ===
                this.props.oldState.requiredSkills.length
        );
    }
    update = () => {
        let filtering = {
            requiredSkills: this.state.requiredSkills.map(skill => skill.name),
            showPrivate: this.state.showPrivateEvents,
        };
        this.props.updateQuery(this.state.sorting, this.state.descending, filtering);
    };
    renderSortOptions() {
        if (this.props.showSortOptions === true)
            return (
                <SortOptions
                    sorting={this.state.sorting}
                    descending={this.state.descending}
                    changeSort={(sorting: string) => this.setState({ sorting: sorting })}
                    changeDescending={(descending: boolean) => this.setState({ descending: descending })}
                />
            );
        return <View />;
    }
    renderAcceptButton() {
        return (
            <IconButton
                icon={() => <IconMat name="done" size={36} color={H2HTheme.colors.primary} />}
                disabled={this.hasNotChanged()}
                onPress={this.update}
                style={{
                    // alignSelf: 'center',
                    right: 0,
                }}
            />
        );
    }
    render() {
        if (this.props.open === false) return <View />;
        else {
            return (
                <View>
                    <FilterOptions
                        requiredSkills={this.state.requiredSkills}
                        showPrivateEvents={this.state.showPrivateEvents}
                        addSkill={(skill: SkillObject) =>
                            this.setState({
                                requiredSkills: this.state.requiredSkills.concat(skill),
                            })
                        }
                        delSkill={(skill: SkillObject) =>
                            this.setState({
                                requiredSkills: this.state.requiredSkills.filter(s => s.id != skill.id),
                            })
                        }
                        handleSwitch={() => this.setState({ showPrivateEvents: !this.state.showPrivateEvents })}
                        fromDate={new Date()}
                        toDate={moment().add(1, 'years').toDate()}
                    />
                    {this.renderSortOptions()}
                    {this.renderAcceptButton()}
                </View>
            );
        }
    }
}

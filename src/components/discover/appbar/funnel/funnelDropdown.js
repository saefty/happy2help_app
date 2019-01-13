// @flow

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SortOptions } from './sort.events.options';
import { FilterOptions } from './filter.events.options';
import { IconButton } from 'react-native-paper';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import { H2HTheme } from '../../../../../themes/default.theme';
import type { SkillObject } from '../../../../models/skill.model';

type Props = {
    updateQuery: (
        sorting: string,
        descending: boolean,
        filtering: {
            requiredSkills: Array<string>,
            showPrivate: boolean,
            time: {
                start: Date,
                end: Date,
            },
        }
    ) => void,
    showSortOptions: boolean,
    oldState: {
        sorting: string,
        descending: boolean,
        requiredSkills: Array<string>,
        showPrivateEvents: boolean,
        fromDate: Date,
        toDate: Date,
    },
};

type State = {
    sorting: string,
    descending: boolean,
    requiredSkills: Array<SkillObject>,
    showPrivateEvents: boolean,
    fromDate: Date,
    toDate: Date,
};

export class FunnelDropdown extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            sorting: props.oldState.sorting,
            descending: props.oldState.descending,
            requiredSkills: props.oldState.requiredSkills,
            showPrivateEvents: props.oldState.showPrivateEvents,
            fromDate: props.oldState.fromDate,
            toDate: props.oldState.toDate,
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
                this.props.oldState.requiredSkills.length &&
            this.state.fromDate === this.props.oldState.fromDate &&
            this.state.toDate === this.props.oldState.toDate
        );
    }

    update = () => {
        let filtering = {
            requiredSkills: this.state.requiredSkills.map(skill => skill.name),
            showPrivate: this.state.showPrivateEvents,
            time: {
                start: this.state.fromDate,
                end: this.state.toDate,
            },
        };
        this.props.updateQuery(this.state.sorting, this.state.descending, filtering);
    };

    updateFromDate = (fromDate: Date) => {
        this.setState({ fromDate: fromDate });
    };

    updateToDate = (toDate: Date) => {
        this.setState({ toDate: toDate });
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
                    alignSelf: 'flex-end',
                    marginRight: 30,
                }}
            />
        );
    }

    render() {
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
                    fromDate={this.state.fromDate}
                    toDate={this.state.toDate}
                    updateFromDate={this.updateFromDate}
                    updateToDate={this.updateToDate}
                />
                {this.renderSortOptions()}
                {this.renderAcceptButton()}
            </View>
        );
    }
}

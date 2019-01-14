// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
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
            requiredSkills: Array<SkillObject>,
            showPrivate: boolean,
            time: {
                start: Date,
                end: Date,
            },
        }
    ) => void,
    showSortOptions: boolean,
    currentQuery: {
        sorting: string,
        descending: boolean,
        requiredSkills: Array<SkillObject>,
        showPrivateEvents: boolean,
        time: {
            start: Date,
            end: Date,
        },
    },
};

type State = {
    sorting: string,
    descending: boolean,
    requiredSkills: Array<SkillObject>,
    showPrivateEvents: boolean,
    time: {
        start: Date,
        end: Date,
    },
};

export class FunnelDropdown extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            sorting: props.currentQuery.sorting,
            descending: props.currentQuery.descending,
            requiredSkills: props.currentQuery.requiredSkills,
            showPrivateEvents: props.currentQuery.showPrivateEvents,
            time: props.currentQuery.time,
        };
    }

    hasNotChanged = () => {
        return (
            this.state.descending === this.props.currentQuery.descending &&
            this.state.sorting === this.props.currentQuery.sorting &&
            this.state.showPrivateEvents === this.props.currentQuery.showPrivateEvents &&
            this.state.requiredSkills.map(s => s.name).filter(s => this.props.currentQuery.requiredSkills.includes(s)).length ===
                this.state.requiredSkills.map(s => s.name).length &&
            this.props.currentQuery.requiredSkills.filter(s => this.state.requiredSkills.map(s => s.name).includes(s)).length ===
                this.props.currentQuery.requiredSkills.length &&
            this.state.time.start === this.props.currentQuery.time.start &&
            this.state.time.end === this.props.currentQuery.time.end
        );
    };

    update = () => {
        let filtering = {
            requiredSkills: this.state.requiredSkills,
            showPrivate: this.state.showPrivateEvents,
            time: this.state.time,
        };
        this.props.updateQuery(this.state.sorting, this.state.descending, filtering);
    };

    updateFromDate = (fromDate: Date) => {
        this.setState({ time: { start: fromDate, end: this.state.time.end } });
    };

    updateToDate = (toDate: Date) => {
        this.setState({ time: { start: this.state.time.start, end: toDate } });
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
                    togglePrivateEventsFilter={() => this.setState({ showPrivateEvents: !this.state.showPrivateEvents })}
                    fromDate={this.state.time.start}
                    toDate={this.state.time.end}
                    updateFromDate={this.updateFromDate}
                    updateToDate={this.updateToDate}
                />
                {this.renderSortOptions()}
                {this.renderAcceptButton()}
            </View>
        );
    }
}

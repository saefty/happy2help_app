// @flow
import type { Job } from '../../../models/job.model';
import type { Event } from '../../../models/event.model';
import type { SkillObject } from '../../../models/skill.model';

import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { Card, Text, TextInput, HelperText, Button, IconButton } from 'react-native-paper';
import { compose, graphql } from 'react-apollo';
import { styles } from './edit.job.style';
import { Formik, ErrorMessage } from 'formik';
import { i18n } from 'i18next';
import { withNamespaces } from 'react-i18next';
import { SkillList } from '../../profile/skillList/skillList';
import { clone } from '../../../helpers/clone';
import { JobListItem } from './jobListItem';
import uuid from 'uuid/v4';
import TextInputMask from 'react-native-text-input-mask';
import { primaryColor, neutralColors } from '../../../../themes/colors';
import { EditJob } from './edit.job';
import { FAB } from 'react-native-paper';

type Props = {
    jobs: Array<Job>,
    saveNew: (job: Job) => void,
    update: (job: Job) => void,
    delete: (job: Job) => void,
};
type State = {
    showNewCard: boolean,
};

class _EditJobList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            showNewCard: false,
        };
    }

    renderJob = ({ item }) => {
        return <EditJob key={item.id} job={item} save={this.update} delete={this.delete} />;
    };

    saveNew = values => {
        this.props.saveNew(values);
        this.setState({ showNewCard: false });
    };

    update = values => {
        this.props.update(values);
    };

    delete = values => {
        this.props.delete(values);
    };

    renderNewItem = () => {
        let item;
        if (!this.state.showNewCard) {
            item = (
                <View style={{ alignItems: 'center' }}>
                    <FAB
                        icon="add"
                        style={{
                            elevation: 0,
                        }}
                        onPress={() =>
                            this.setState({
                                showNewCard: true,
                            })
                        }
                    />
                    <Text
                        style={{
                            color: neutralColors.medium,
                        }}
                    >
                        Add a new job
                    </Text>
                </View>
            );
        } else {
            item = <EditJob job={{}} save={this.saveNew} initWithEditMode={true} />;
        }
        return item;
    };

    render() {
        return (
            <View>
                <FlatList data={this.props.jobs} keyExtractor={job => job.id} renderItem={this.renderJob} />
                {this.renderNewItem()}
            </View>
        );
    }
}

export const EditJobList = withNamespaces(['Event', 'errors'])(_EditJobList);

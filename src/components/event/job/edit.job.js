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
import { primaryColor } from '../../../../themes/colors';

type Props = {
    job: Job,
    t: i18n.t,
    initWithEditMode?: boolean,
    delete?: () => void,
    save: () => void,
    cancel?: () => void,
};

class _EditJob extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    onSubmit = async (values, actions) => {
        actions.setFieldValue('editing', !values.editing);
        await this.props.save(values);
        actions.setSubmitting(false);
    };

    getInitialFormValues = () => {
        return {
            ...this.props.job,
            editing: this.props.initWithEditMode,
        };
    };

    _renderForm = (errors, handleChange, handleSubmit, isSubmitting, values, setFieldValue) => {
        return (
            <View style={styles.container}>
                <TextInput onChangeText={handleChange('name')} value={values.name} label={this.props.t('name')} error={errors.name} />
                <HelperText type="error" visible={errors.name}>
                    <ErrorMessage name="name" />
                </HelperText>
                <TextInput
                    onChangeText={handleChange('description')}
                    value={values.description}
                    label={this.props.t('description')}
                    error={errors.description}
                />
                <HelperText type="error" visible={errors.name}>
                    <ErrorMessage name="name" />
                </HelperText>
                <SkillList
                    skillObjects={values.requiresskillSet ? values.requiresskillSet.map(x => x.skill) : []}
                    editable={true}
                    addSkill={(skill: SkillObject) => {
                        let skills = clone(values.requiresskillSet || []);

                        skills.push({
                            skill: {
                                ...skill,
                                id: uuid(),
                            },
                        });
                        setFieldValue('requiresskillSet', skills);
                    }}
                    deleteSkill={(skillToDelete: SkillObject) => {
                        let skills = clone(values.requiresskillSet);
                        skills = skills.filter(tmp => tmp.skill.id !== skillToDelete.id);
                        setFieldValue('requiresskillSet', skills);
                    }}
                />
                <TextInput
                    onChangeText={handleChange('totalPositions')}
                    value={values.totalPositions}
                    label={this.props.t('totalPositions')}
                    error={errors.totalPositions}
                    autoCorrect={false}
                    keyboardType="number-pad"
                    render={props => <TextInputMask {...props} autoCorrect={false} mask="[999]" />}
                />
                <HelperText type="error" visible={errors.totalPositions}>
                    <ErrorMessage name="totalPositions" />
                </HelperText>
            </View>
        );
    };

    _renderActionButtons = (values, setFieldValue, handleSubmit, resetForm) => {
        const formButtons = !values.editing ? (
            <IconButton
                color={primaryColor}
                icon="edit"
                onPress={() => {
                    setFieldValue('editing', !values.editing);
                }}
            />
        ) : (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                {this.props.delete && (
                    <IconButton
                        color={primaryColor}
                        icon="delete"
                        onPress={() => {
                            this.props.delete && this.props.delete(values);
                        }}
                    />
                )}
                <IconButton
                    color={primaryColor}
                    icon="cancel"
                    onPress={() => {
                        setFieldValue('editing', !values.editing);
                        resetForm();
                        this.props.cancel && this.props.cancel();
                    }}
                />
                <IconButton
                    color={primaryColor}
                    icon="done"
                    onPress={() => {
                        handleSubmit();
                    }}
                />
            </View>
        );
        return formButtons;
    };

    render() {
        return (
            <View>
                <Formik onSubmit={this.onSubmit} initialValues={this.getInitialFormValues()}>
                    {({ errors, handleChange, handleSubmit, isSubmitting, values, setFieldValue, resetForm }) => {
                        const formButtons = this._renderActionButtons(values, setFieldValue, handleSubmit, resetForm);
                        const formState = !values.editing ? (
                            <JobListItem job={values} />
                        ) : (
                            this._renderForm(errors, handleChange, handleSubmit, isSubmitting, values, setFieldValue)
                        );

                        return (
                            <View>
                                <Card style={{ margin: 10 }}>
                                    <Card.Content>
                                        <View>
                                            <View style={{ alignItems: 'flex-end' }}>{formButtons}</View>

                                            {formState}
                                        </View>
                                    </Card.Content>
                                </Card>
                            </View>
                        );
                    }}
                </Formik>
            </View>
        );
    }
}

export const EditJob = withNamespaces(['Event', 'errors'])(_EditJob);
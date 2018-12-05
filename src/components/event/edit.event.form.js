// @flow
import type EventObject from '../../models/event.model';
import React, { Component } from 'react';
import { View, StyleSheet, TextInput as NativeTextInput } from 'react-native';
import { Button, Text, TextInput, HelperText, Subheading, Headline, Appbar } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { withNamespaces } from 'react-i18next';
import { GooglePlacesInput } from '../location/location.input';
import { styles } from './edit.event.style';

type Props = {
    event?: EventObject,
    t: i18n.t,
}

type State = {
    validationSchema: Yup.Schema,
}

class _EditEventForm extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const EventSchema = Yup.object().shape({
            eventName: Yup.string()
                .min(5, this.props.t('errors:toShort'))
                .required(this.props.t('errors:required')),
            description: Yup.string()
                .min(5, this.props.t('errors:toShort'))
                .required(this.props.t('errors:required')),
            location: Yup.object().required(this.props.t('errors:required')),
        });
        this.state = { validationSchema: EventSchema, address: '' };
    }

    onSubmit = (values, actions) => {
        console.log(values)
        actions.setSubmitting(false);
    }

    getInitialFormValues = () => {
        return this.props.event || {}
    }

    render() {
        return (
            <KeyboardAwareScrollView>
                <Appbar.Header style={styles.appbar}>
                    <Appbar.Action icon="close" onPress={() => this.props.navigation.goBack()} />
                    <Appbar.Content title={this.props.t(!this.props.event ? 'createTitle' : 'editTitle')} />
                    <Appbar.Action icon="check"/>
                </Appbar.Header>
                <View style={styles.container}>
                    <Formik validationSchema={this.state.validationSchema} onSubmit={this.onSubmit} initialValues={this.getInitialFormValues()}>
                        {({ errors, handleChange, handleSubmit, isSubmitting, values, setFieldValue }) => (
                            <View>
                                <TextInput
                                    onChangeText={handleChange('eventName')}
                                    value={values.eventName}
                                    label={this.props.t('eventName')}
                                    error={errors.eventName}
                                />
                                <HelperText type="error" visible={errors.eventName}>
                                    <ErrorMessage name="eventName" />
                                </HelperText>
                                <TextInput
                                    onChangeText={handleChange('description')}
                                    multiline={true}
                                    numberOfLines={10}
                                    value={values.description}
                                    label={this.props.t('description')}
                                    error={errors.description}
                                />
                                <HelperText type="error" visible={errors.description}>
                                    <ErrorMessage name="description" />
                                </HelperText>
                                <GooglePlacesInput
                                    onChangeValue={v => {
                                        setFieldValue('location', v)
                                        handleChange('location')
                                    }}
                                    initialValue={values.location}
                                    label={this.props.t('locationSearch')}
                                    error={errors.location}
                                />
                                <HelperText type="error" visible={errors.location}>
                                    <ErrorMessage name="location" />
                                </HelperText>
                                <Button
                                    mode="contained"
                                    dark={false}
                                    icon='create'
                                    disabled={isSubmitting}
                                    onPress={handleSubmit}
                                    style={styles.button}
                                >
                                    {this.props.t('create')}
                                </Button>

                            </View>
                        )}
                    </Formik>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

export const EditEventForm = withNamespaces(['Event', 'errors'])(_EditEventForm);

// @flow
import type { EventObject } from '../../models/event.model';
import React, { Component } from 'react';
import { View, StyleSheet, TextInput as NativeTextInput } from 'react-native';
import { Button, Text, TextInput, HelperText, Subheading, Headline, Appbar } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { withNamespaces, i18n } from 'react-i18next';
import { GooglePlacesInput } from '../location/location.input';
import { styles } from './edit.event.style';
import { graphql, compose } from 'react-apollo';
import { mutations } from './edit.event.mutations';

type Props = {
    event?: EventObject,
    t: i18n.t,
    updateEventMutation: graphql.mutate,
    createEventMutation: graphql.mutate,
};

type State = {
    validationSchema: Yup.Schema,
};

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
        this.state = { validationSchema: EventSchema };
    }

    create = event => {
        return this.props.createEventMutation({
            variables: {
                name: event.name,
                description: event.description,
                locationLon: event.location.long,
                locationLat: event.location.lat,
                locationName: event.location.name,
                start: event.start,
                end: event.end,
            },
        });
    };

    update = event => {
        return this.props.updateEventMutation({
            variables: {
                id: this.props.event.id,
                name: event.name || this.props.event.name,
                description: event.description || this.props.event.description,
                locationLon: event.location.long || this.props.event.location.longitude,
                locationLat: event.location.lat || this.props.event.location.latitude,
                locationName: event.location.name || this.props.event.location.name,
                start: event.start,
                end: event.end,
            },
        });
    };

    onSubmit = async (values, actions) => {
        actions.setSubmitting(true);
        const { start, end } = this.getStartEnd();
        const EVENT = {
            name: values.eventName,
            description: values.description,
            location: {
                name: values.location.formatted_address,
                lat: values.location.geometry.location.lat,
                long: values.location.geometry.location.lng,
            },
            start,
            end,
        };

        if (!this.props.event) {
            await this.create(EVENT);
        } else {
            await this.update(EVENT);
        }
        actions.setSubmitting(false);
        console.log(values);
        return;
    };

    getStartEnd() {
        let start = '2019-11-30T11:40:21+00:00';
        let end = '2020-11-30T11:40:21+00:00';
        return { start, end };
    }

    getInitialFormValues = () => {
        return this.props.event || {};
    };

    render() {
        return (
            <KeyboardAwareScrollView>
                <Formik validationSchema={this.state.validationSchema} onSubmit={this.onSubmit} initialValues={this.getInitialFormValues()}>
                    {({ errors, handleChange, handleSubmit, isSubmitting, values, setFieldValue }) => (
                        <View>
                            <Appbar.Header style={styles.container}>
                                <Appbar.Action icon="close" onPress={() => this.props.navigation.goBack()} />
                                <Appbar.Content title={this.props.t(!this.props.event ? 'createTitle' : 'editTitle')} />
                                <Appbar.Action icon="check" onPress={handleSubmit} disabled={isSubmitting} />
                            </Appbar.Header>
                            <View style={styles.container}>
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
                                        setFieldValue('location', v);
                                        handleChange('location');
                                    }}
                                    initialValue={values.location}
                                    label={this.props.t('locationSearch')}
                                    error={errors.location}
                                />
                                <HelperText type="error" visible={errors.location}>
                                    <ErrorMessage name="location" />
                                </HelperText>
                            </View>
                        </View>
                    )}
                </Formik>
            </KeyboardAwareScrollView>
        );
    }
}

export const EditEventFormNamespaced = compose(
    graphql(mutations.CREATE_EVENT, { name: 'createEventMutation' }),
    graphql(mutations.UPDATE_EVENT, { name: 'updateEventMutation' })
)(withNamespaces(['Event', 'errors'])(_EditEventForm));
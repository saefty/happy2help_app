// @flow
import type { EventObject } from '../../models/event.model';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, TextInput as NativeTextInput, ScrollView, TouchableOpacity } from 'react-native';
import { TextInput, HelperText, Headline, Appbar, Text } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { showMessage } from 'react-native-flash-message';
import { withNamespaces, i18n } from 'react-i18next';
import { GooglePlacesInput } from '../location/location.input';
import { styles } from './edit.event.style';
import { graphql, compose, Query } from 'react-apollo';
import { mutations } from './edit.event.mutations';
import { EventImage } from './event.image';
import { ImagePicker } from '../image/imagePicker';
import { Picker } from '../image/pickerOptions';
import { uploadMutations } from '../image/upload.mutations';
import { ReactNativeFile } from 'apollo-upload-client';
import { GET_EVENTS } from '../../providers/getEvents.query';
import { EditJobList } from './job/edit.job.list';
import { clone } from '../../helpers/clone';
import DateRangeButtons from './dates/DateRangeButtons';
import uuid from 'uuid/v4';
import moment from 'moment';
import { EVENT_DETAIL_QUERY } from './event.detail.query';

type Props = {
    eventId?: Number,
    orgaId?: ID,
    t: i18n.t,
    updateEventMutation: graphql.mutate,
    createEventMutation: graphql.mutate,
    uploadImageMutation: graphql.mutate,
    deleteImageMutation: graphql.mutate,
};

type State = {
    validationSchema: Yup.Schema,
    modalVisible: boolean,
};

class _EditEventForm extends Component<Props, State> {
    scrollView: ScrollView;
    constructor(props: Props) {
        super(props);

        const EventSchema = Yup.object().shape({
            name: Yup.string()
                .min(5, this.props.t('errors:toShort'))
                .required(this.props.t('errors:required')),
            description: Yup.string()
                .min(5, this.props.t('errors:toShort'))
                .required(this.props.t('errors:required')),
            location: Yup.object().required(this.props.t('errors:required')),
            start: Yup.date()
                .min(new Date(), this.props.t('errors:beforePresent'))
                .required(this.props.t('errors:required')),
            end: Yup.date()
                .min(Yup.ref('start'), this.props.t('errors:beforeStart'))
                .required(this.props.t('errors:required')),
        });

        this.state = {
            validationSchema: EventSchema,
            modalVisible: false,
        };
    }

    showModal = () => this.setState({ modalVisible: true });
    hideModal = () => this.setState({ modalVisible: false });

    takeImage = setFieldValue => {
        return async () => {
            let img = await Picker.eventCamera();
            setFieldValue('pickedImage', img);
            this.hideModal();
        };
    };

    pickImage = setFieldValue => {
        return async () => {
            let img = await Picker.eventGallery();
            setFieldValue('pickedImage', img);
            this.hideModal();
        };
    };

    removePickedImage = setFieldValue => {
        return () => {
            setFieldValue('pickedImage', '');
            this.hideModal();
        };
    };

    saveImage = async (id, pickedImage) => {
        let fileImg = new ReactNativeFile({
            uri: pickedImage,
            name: id + '.jpg',
            type: 'image/jpg',
        });
        await this.props.uploadImageMutation({ variables: { image: fileImg, eventId: id } });
        await Picker.clean();
    };

    deleteImage = async values => {
        if (values && values.image) {
            await this.props.deleteImageMutation({ variables: { imageId: values.image.id } });
        }
    };

    create = event => {
        let variables = {
            name: event.name,
            description: event.description,
            locationLon: event.location.long,
            locationLat: event.location.lat,
            locationName: event.location.name,
            start: event.start,
            end: event.end,
        };
        if (this.props.orgaId) {
            variables.organisationId = this.props.orgaId;
        }
        return this.props.createEventMutation({
            variables: variables,
        });
    };

    update = event => {
        return this.props.updateEventMutation({
            variables: {
                eventId: event.eventId,
                name: event.name || this.props.event.name,
                description: event.description || this.props.event.description,
                start: event.start,
                end: event.end,
                jobs: event.jobs,
            },
        });
    };

    onSubmit = async (values, actions) => {
        actions.setSubmitting(true);
        let EVENT = {
            eventId: values.id,
            name: values.name,
            description: values.description,
            start: moment(values.start).format(),
            end: moment(values.end).format(),
            jobs: values.jobSet
                .map(x => ({
                    id: x.id,
                    name: x.name,
                    description: x.description,
                    totalPositions: x.totalPositions,
                    requiredSkills: x.requiresskillSet.map(x => x.name),
                }))
                .map(x => {
                    let newJob = clone(x);
                    if (isNaN(parseInt(newJob.id))) {
                        newJob.id = null;
                    }
                    return newJob;
                }),
        };

        let successMessage = 'creationSuccess';
        let created;

        if (!values.id) {
            (EVENT.location = {
                name: values.location.formatted_address,
                lat: values.location.geometry.location.lat,
                long: values.location.geometry.location.lng,
            }),
                (created = await this.create(EVENT));
            if (values.pickedImage !== '') {
                await this.saveImage(created.data.createEvent.id, values.pickedImage);
            }
        } else {
            await this.update(EVENT);
            if (values.pickedImage !== '') {
                await this.saveImage(values.id, values.pickedImage);
            } else if (values.image) {
                await this.deleteImage(values);
            }
            successMessage = 'editSuccess';
        }

        actions.setSubmitting(false);
        this.props.navigation.goBack();
        showMessage({
            message: this.props.t(successMessage) + values.name,
            type: 'success',
            icon: 'auto',
        });
        return;
    };

    getInitialFormValues = (event: EventObject) => {
        return {
            ...event,
            pickedImage: (event.image && event.image.url) || '',
        };
    };

    getDateErrorMessage = errors => {
        if (errors.start) return errors.start;
        if (errors.end) return errors.end;
        return undefined;
    };

    getEvent = children => {
        if (this.props.event && this.props.event.id) {
            return (
                <Query query={EVENT_DETAIL_QUERY} variables={{ id: this.props.event.id }}>
                    {children}
                </Query>
            );
        } else {
            return children({ data: { event: {} } });
        }
    };
    
    renderImagePicker = (values) => {
        if (this.props.orgaId || (values && values.organisation)) {
            return (
                <View>
                    <ImagePicker
                        visible={this.state.modalVisible}
                        hideModal={this.hideModal}
                        takeImage={this.takeImage(setFieldValue)}
                        pickImage={this.pickImage(setFieldValue)}
                        deleteImage={this.removePickedImage(setFieldValue)}
                    />
                    <View style={styles.imgContainer}>
                        <EventImage src={values.pickedImage} style={styles.eventImage} grayscale={true} resizeMode={'cover'} />
                        <TouchableOpacity style={styles.imgButton} onPress={this.showModal}>
                            <Icon name={'photo-camera'} size={30} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
            );
        } else {
            return <View />;
        }
    }

    render() {
        return this.getEvent(({ data }) => {
            console.log(data);
            if (!data || !data.event) return <View />;
            return (
                <Formik
                    validationSchema={this.state.validationSchema}
                    onSubmit={this.onSubmit}
                    initialValues={this.getInitialFormValues(data.event)}
                >
                    {({ errors, handleChange, handleSubmit, isSubmitting, values, setFieldValue }) => (
                        <View style={{ flex: 1 }}>
                            <Appbar.Header>
                                <Appbar.Action icon="close" onPress={() => this.props.navigation.goBack()} />
                                <Appbar.Content title={this.props.t(!data.event.id ? 'createTitle' : 'editTitle')} />
                                <Appbar.Action icon="check" onPress={handleSubmit} disabled={isSubmitting} />
                            </Appbar.Header>
                            <KeyboardAwareScrollView ref={(ref: ScrollView) => (this.scrollView = ref)}>
                                {this.renderImagePicker()}
                                <View style={styles.container}>
                                    <DateRangeButtons
                                        startDate={new Date(values.start)}
                                        endDate={new Date(values.end)}
                                        updateStart={(newStartDate: Date) => {
                                            //if new start ist after end, end is the old diff plus the new start
                                            if (newStartDate > values.end) {
                                                const diff = moment(values.start).diff(values.end);
                                                const newEndDate = moment(newStartDate)
                                                    .add(diff)
                                                    .toDate();
                                                setFieldValue('end', newEndDate);
                                            }
                                            setFieldValue('start', newStartDate);
                                        }}
                                        updateEnd={(newEndDate: Date) => {
                                            setFieldValue('end', newEndDate);
                                        }}
                                        errorMessage={this.getDateErrorMessage(errors)}
                                    />

                                    <TextInput
                                        onChangeText={handleChange('name')}
                                        value={values.name}
                                        label={this.props.t('name')}
                                        error={errors.name}
                                    />
                                    <HelperText type="error" visible={errors.name}>
                                        {errors.name}
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
                                        {errors.description}
                                    </HelperText>
                                    <GooglePlacesInput
                                        onTextChange={() => {
                                            this.scrollView.scrollToEnd();
                                        }}
                                        onChangeValue={v => {
                                            setFieldValue('location', v);
                                            handleChange('location');
                                        }}
                                        initialValue={{ formatted_address: values.location ? values.location.name : undefined }}
                                        label={this.props.t('locationSearch')}
                                        error={errors.location}
                                    />
                                    <HelperText type="error" visible={errors.location}>
                                        {errors.location}
                                    </HelperText>
                                    <Headline>Jobs</Headline>
                                    <EditJobList
                                        jobs={values.jobSet || []}
                                        saveNew={job => {
                                            let jobs = clone(values.jobSet || []);
                                            job.id = uuid();
                                            jobs.push(job);
                                            setFieldValue('jobSet', jobs);
                                            handleChange('jobSet');
                                        }}
                                        update={updateJob => {
                                            let jobs = clone(values.jobSet);
                                            jobs = jobs.map(job => (job.id === updateJob.id ? updateJob : job));
                                            setFieldValue('jobSet', jobs);
                                        }}
                                        delete={jobToDelete => {
                                            let jobs = clone(values.jobSet);
                                            jobs = jobs.filter(job => job.id != jobToDelete.id);
                                            setFieldValue('jobSet', jobs);
                                        }}
                                    />
                                </View>
                            </KeyboardAwareScrollView>
                        </View>
                    )}
                </Formik>
            );
        });
    }
}

export const EditEventFormNamespaced = compose(
    graphql(mutations.CREATE_EVENT, { name: 'createEventMutation' }),
    graphql(mutations.UPDATE_EVENT, { name: 'updateEventMutation' }),
    graphql(uploadMutations.UPLOAD_EVENT_IMG, {
        name: 'uploadImageMutation',
    }),
    graphql(uploadMutations.DELETE_IMG, {
        name: 'deleteImageMutation',
    })
)(withNamespaces(['Event', 'errors'])(withMappedNavigationProps()(_EditEventForm)));

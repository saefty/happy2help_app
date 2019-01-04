// @flow
import type { EventObject } from '../../models/event.model';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, TextInput as NativeTextInput, ScrollView, TouchableOpacity } from 'react-native';
import { TextInput, HelperText, Headline, Appbar } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { showMessage } from 'react-native-flash-message';
import { withNamespaces, i18n } from 'react-i18next';
import { GooglePlacesInput } from '../location/location.input';
import { styles } from './edit.event.style';
import { graphql, compose } from 'react-apollo';
import { mutations } from './edit.event.mutations';
import { EventImage } from './event.image';
import { ImagePicker } from '../image/imagePicker';
import { Picker } from '../image/pickerOptions';
import { uploadMutations } from '../image/upload.mutations';
import { ReactNativeFile } from 'apollo-upload-client';
import { GET_EVENTS } from '../../providers/getEvents.query';
import { EditJobList } from './job/edit.job.list';
import { clone } from '../../helpers/clone';
import StartEndDateButtons from './dates/StartEndDateButtons';
import uuid from 'uuid/v4';

type Props = {
    event?: EventObject,
    orgaId?: ID,
    t: i18n.t,
    updateEventMutation: graphql.mutate,
    createEventMutation: graphql.mutate,
    uploadImageMutation: graphql.mutate,
    deleteImageMutation: graphql.mutate,
};

type State = {
    validationSchema: Yup.Schema,
    pickedImage: string,
    modalVisible: boolean,
};

class _EditEventForm extends Component<Props, State> {
    scrollView: ScrollView;
    constructor(props: Props) {
        super(props);

        let initialImg = '';
        if (this.props.event) {
            initialImg = this.props.event.image ? this.props.event.image.url : '';
        }

        const EventSchema = Yup.object().shape({
            name: Yup.string()
                .min(5, this.props.t('errors:toShort'))
                .required(this.props.t('errors:required')),
            description: Yup.string()
                .min(5, this.props.t('errors:toShort'))
                .required(this.props.t('errors:required')),
            location: Yup.object().required(this.props.t('errors:required')),
        });

        this.state = {
            validationSchema: EventSchema,
            pickedImage: initialImg,
            modalVisible: false,
        };
    }

    showModal = () => this.setState({ modalVisible: true });
    hideModal = () => this.setState({ modalVisible: false });

    takeImage = async () => {
        let img = await Picker.eventCamera();
        this.setState({ pickedImage: img });
        this.hideModal();
    };

    pickImage = async () => {
        let img = await Picker.eventGallery();
        this.setState({ pickedImage: img });
        this.hideModal();
    };

    saveImage = async id => {
        let fileImg = new ReactNativeFile({
            uri: this.state.pickedImage,
            name: id + '.jpg',
            type: 'image/jpg',
        });
        await this.props.uploadImageMutation({ variables: { image: fileImg, eventId: id } });
        await Picker.clean();
    };

    deleteImage = () => {
        if (this.props.event && this.props.event.image) {
            this.props.deleteImageMutation({ variables: { imageId: this.props.event.image.id } });
            showMessage({
                message: this.props.t('Image:deleteSuccess'),
                type: 'success',
                icon: 'auto',
            });
        }
        this.setState({ pickedImage: '' });
        this.hideModal();
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
                eventId: this.props.event.id,
                name: event.name || this.props.event.name,
                description: event.description || this.props.event.description,
                start: event.start,
                end: event.end,
            },
        });
    };

    onSubmit = async (values, actions) => {
        actions.setSubmitting(true);
        const { start, end } = this.getStartEnd();
        let EVENT = {
            name: values.name,
            description: values.description,
            start,
            end,
        };

        let successMessage = 'creationSuccess';
        let created;

        if (!this.props.event) {
            (EVENT.location = {
                name: values.location.formatted_address,
                lat: values.location.geometry.location.lat,
                long: values.location.geometry.location.lng,
            }),
                (created = await this.create(EVENT));
            if (this.state.pickedImage !== '') {
                await this.saveImage(created.data.createEvent.id);
            }
        } else {
            await this.update(EVENT);
            if (this.state.pickedImage !== '') {
                await this.saveImage(values.id);
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
            <KeyboardAwareScrollView ref={(ref: ScrollView) => (this.scrollView = ref)}>
                <Formik validationSchema={this.state.validationSchema} onSubmit={this.onSubmit} initialValues={this.getInitialFormValues()}>
                    {({ errors, handleChange, handleSubmit, isSubmitting, values, setFieldValue }) => (
                        <View>
                            <Appbar.Header>
                                <Appbar.Action icon="close" onPress={() => this.props.navigation.goBack()} />
                                <Appbar.Content title={this.props.t(!this.props.event ? 'createTitle' : 'editTitle')} />
                                <Appbar.Action icon="check" onPress={handleSubmit} disabled={isSubmitting} />
                            </Appbar.Header>

                            <ImagePicker
                                visible={this.state.modalVisible}
                                hideModal={this.hideModal}
                                takeImage={this.takeImage}
                                pickImage={this.pickImage}
                                deleteImage={this.deleteImage}
                            />

                            <View style={styles.imgContainer}>
                                <EventImage src={this.state.pickedImage} style={styles.eventImage} grayscale={true} resizeMode={'cover'} />
                                <TouchableOpacity style={styles.imgButton} onPress={this.showModal}>
                                    <Icon name={'photo-camera'} size={30} color="#fff" />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.container}>
                                <StartEndDateButtons />
                                <TextInput
                                    onChangeText={handleChange('name')}
                                    value={values.name}
                                    label={this.props.t('name')}
                                    error={errors.name}
                                />
                                <HelperText type="error" visible={errors.name}>
                                    <ErrorMessage name="name" />
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
                                    <ErrorMessage name="location" />
                                </HelperText>
                                <Headline>Jobs</Headline>
                                <EditJobList
                                    jobs={values.jobs || []}
                                    saveNew={job => {
                                        let jobs = clone(values.jobs || []);
                                        job.id = uuid();
                                        jobs.push(job);
                                        setFieldValue('jobs', jobs);
                                        handleChange('jobs');
                                    }}
                                    update={updateJob => {
                                        let jobs = clone(values.jobs);
                                        jobs = jobs.map(job => (job.id === updateJob.id ? updateJob : job));
                                        setFieldValue('jobs', jobs);
                                    }}
                                    delete={jobToDelete => {
                                        let jobs = clone(values.jobs);
                                        jobs = jobs.filter(job => job.id != jobToDelete.id);
                                        setFieldValue('jobs', jobs);
                                    }}
                                />
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
    graphql(mutations.UPDATE_EVENT, { name: 'updateEventMutation' }),
    graphql(uploadMutations.UPLOAD_EVENT_IMG, {
        name: 'uploadImageMutation',
    }),
    graphql(uploadMutations.DELETE_IMG, {
        name: 'deleteImageMutation',
    })
)(withNamespaces(['Event', 'errors'])(withMappedNavigationProps()(_EditEventForm)));

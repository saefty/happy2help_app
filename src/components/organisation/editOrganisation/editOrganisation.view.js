/* @flow */

import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, TouchableOpacity } from 'react-native';
import { TextInput, HelperText, Subheading, Headline, Appbar } from 'react-native-paper';
import { Formik, ErrorMessage } from 'formik';
import { withNamespaces, i18n } from 'react-i18next';
import { graphql, compose } from 'react-apollo';
import * as Yup from 'yup';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { ReactNativeFile } from 'apollo-upload-client';

import type { OrganisationObject } from '../../../models/organisation.model';
import { H2HTheme } from './../../../../themes/default.theme';
import { styles } from './editOrganisation.style';
import { mutations } from './editOrganisation.mutations.js';
import OrganisationProfilePicture from '../organisationProfilePicture';
import gql from 'graphql-tag';
import { USER_ORGAS_QUERY } from '../../navigation/drawer/drawer.screen';
import { OrganisationProfilePicture } from '../organisationProfilePicture';
import { Picker } from '../../image/pickerOptions';
import { uploadMutations } from '../../image/upload.mutations';
import { ImagePicker } from '../../image/imagePicker';

type Props = {
    organisation?: OrganisationObject,
    t: i18n.t,
    updateOrganisationMutation: graphql.mutate,
    createOrganisationMutation: graphql.mutate,
    uploadImageMutation: graphql.mutate,
    deleteImageMutation: graphql.mutate,
    close: () => void,
};

type State = {
    validationSchema: Yup.Schema,
    pickedImage: String,
    modalVisible: boolean,
};

class _EditOrganisationView extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        let initialImg = '';
        if (this.props.organisation) {
            initialImg = this.props.organisation.image ? this.props.organisation.image.url : '';
        }

        const OrganisationSchema = Yup.object().shape({
            organisationName: Yup.string()
                .min(5, this.props.t('errors:toShort'))
                .required(this.props.t('errors:required')),
            organisationDescription: Yup.string()
                .min(5, this.props.t('errors:toShort'))
                .required(this.props.t('errors:required')),
        });
        this.state = {
            validationSchema: OrganisationSchema,
            pickedImage: initialImg,
            modalVisible: false,
        };
    }

    showModal = () => this.setState({ modalVisible: true });
    hideModal = () => this.setState({ modalVisible: false });

    takeImage = async () => {
        let img = await Picker.userCamera();
        this.setState({ pickedImage: img });
        this.hideModal();
    };

    pickImage = async () => {
        let img = await Picker.userGallery();
        this.setState({ pickedImage: img });
        this.hideModal();
    };

    saveImage = async id => {
        let fileImg = new ReactNativeFile({
            uri: this.state.pickedImage,
            name: id + '.jpg',
            type: 'image/jpg',
        });
        await this.props.uploadImageMutation({ variables: { image: fileImg, organisationId: id } });
        await Picker.clean();
    };

    deleteImage = () => {
        if (this.props.organisation && this.props.organisation.image) {
            this.props.deleteImageMutation({ variables: { imageId: this.props.organisation.image.id } });
            showMessage({
                message: this.props.t('Image:deleteSuccess'),
                type: 'success',
                icon: 'auto',
            });
        }
        this.setState({ pickedImage: '' });
        this.hideModal();
    };

    create = organisation => {
        return this.props.createOrganisationMutation({
            variables: {
                name: organisation.name,
                description: organisation.description,
            },
        });
    };

    onSubmit = async (values, actions) => {
        actions.setSubmitting(true);
        const ORGANISATION = {
            name: values.organisationName,
            description: values.organisationDescription,
        };

        let created = await this.create(ORGANISATION);
        if (this.state.pickedImage !== '') {
            await this.saveImage(created.data.createOrganisation.id);
        }

        actions.setSubmitting(false);
        this.props.close();
        showMessage({
            message: this.props.t('creationSuccess') + values.organisationName,
            type: 'success',
            icon: 'auto',
        });
        return;
    };

    get initialValues() {
        if (!this.props.organisation) return {};
        const { organisation } = this.props;
        return {
            organisationName: organisation.name,
            organisationDescription: organisation.description,
        };
    }

    render() {
        return (
            <View>
                <Formik validationSchema={this.state.validationSchema} onSubmit={this.onSubmit} initialValues={this.initialValues}>
                    {({ errors, handleChange, handleSubmit, isSubmitting, values }) => (
                        <View>
                            <View style={{ elevation: 0 }}>
                                <Appbar.Header>
                                    <Appbar.Action
                                        icon="close"
                                        onPress={() => {
                                            this.props.close();
                                        }}
                                    />
                                    <Appbar.Content title={this.props.t('new')} subtitle={this.props.t('creationSubtitle')} />
                                    <Appbar.Action icon="check" onPress={handleSubmit} disabled={isSubmitting} />
                                </Appbar.Header>
                            </View>
                            
                            <ImagePicker
                                visible={this.state.modalVisible}
                                hideModal={this.hideModal}
                                takeImage={this.takeImage}
                                pickImage={this.pickImage}
                                deleteImage={this.deleteImage}
                            />

                            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                <View style={{ flex: 1 }} />
                                <OrganisationProfilePicture style={styles.editPicture} src={this.state.pickedImage} />
                                <View style={{ flex: 1, paddingBottom: 35 }}>
                                    <TouchableOpacity style={styles.circularButton} onPress={this.showModal}>
                                        <Icon name={'photo-camera'} size={30} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    onChangeText={handleChange('organisationName')}
                                    value={values.organisationName}
                                    error={errors.organisationName}
                                    label={this.props.t('name')}
                                />
                                <HelperText type="error" visible={errors.organisationName}>
                                    <ErrorMessage name="organisationName" />
                                </HelperText>

                                <TextInput
                                    multiline={true}
                                    numberOfLines={10}
                                    label={this.props.t('description')}
                                    onChangeText={handleChange('organisationDescription')}
                                    value={values.organisationDescription}
                                    error={errors.organisationDescription}
                                />
                            </View>
                        </View>
                    )}
                </Formik>
            </View>
        );
    }
}

export const EditOrganisationView = compose(
    graphql(mutations.CREATE_ORGANISATION, {
        name: 'createOrganisationMutation',
        refetchQueries: [
            {
                query: USER_ORGAS_QUERY,
            },
        ],
    }),
    graphql(mutations.UPDATE_ORGANISATION, {
        name: 'updateOrganisationMutation',
        refetchQueries: [
            {
                query: USER_ORGAS_QUERY,
            },
        ],
    }),
    graphql(mutations.CREATE_ORGANISATION, { name: 'createOrganisationMutation' }),
    graphql(mutations.UPDATE_ORGANISATION, { name: 'updateOrganisationMutation' }),
    graphql(uploadMutations.UPLOAD_ORGA_IMG, {
        name: 'uploadImageMutation',
    }),
    graphql(uploadMutations.DELETE_IMG, {
        name: 'deleteImageMutation',
    })
)(withNamespaces(['Organisation', 'errors'])(_EditOrganisationView));

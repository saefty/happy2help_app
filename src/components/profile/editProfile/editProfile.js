// @flow
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '../../image/pickerOptions';
import { View, TouchableOpacity } from 'react-native';
import { ReactNativeFile } from 'apollo-upload-client';
import { Appbar, Title } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { withNamespaces, i18n } from 'react-i18next';
import { graphql, compose } from 'react-apollo';
import { withNavigation } from 'react-navigation';
import { Formik } from 'formik';
import { GooglePlacesInput } from '../../location/location.input';
import { showMessage } from 'react-native-flash-message';

import { clone } from './../../../helpers/clone';
import { styles } from './editProfileStyle';
import { ProfilePicture } from '../profilePicture/profilePicture';
import { ImagePicker } from '../../image/imagePicker';
import { SkillList } from '../skillList/skillList';
import type { UserObject } from './../../../models/user.model';
import type { SkillObject } from './../../../models/skill.model';
import { mutations } from './editProfileMutations';
import { uploadMutations } from '../../image/upload.mutations';
import { GET_PROFILE } from '../../../screens/myProfile/getProfile.mutation';

type Props = {
    t: i18n.t,
    logOut: () => void,
    user: UserObject, //the old userobject
    createLocationMutation: graphql.mutate,
    updateUserLocationMutation: graphql.mutate,
    createSkillMutation: graphql.mutate,
    deleteSkillMutation: graphql.mutate,
    uploadImageMutation: graphql.mutate,
    deleteImageMutation: graphql.mutate,
};

type State = {
    pickedImage: string,
    modalVisible: boolean,
};

class EditProfileComponent extends Component<Props, State> {
    constructor(props) {
        super(props);

        let initialImg = this.props.user.image ? this.props.user.image.url : '';

        this.state = {
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

    removePickedImage = () => {
        this.setState({ pickedImage: '' });
        this.hideModal();
    }

    //functions to save changes in the db:

    saveLocationInDb = async location => {
        let response = await this.props.createLocationMutation({
            variables: { longitude: location.longitude, latitude: location.latitude, name: location.name },
        });
        this.props.updateUserLocationMutation({ variables: { locationId: response.data.createLocation.id } });
    };

    createSkillsInDb = skills => {
        for (const skill of skills) {
            this.props.createSkillMutation({ variables: { name: skill.name } });
        }
    };

    deleteSkillsInDb = skillsToDeleteIds => {
        for (const skillId of skillsToDeleteIds) {
            this.props.deleteSkillMutation({ variables: { skillId: skillId } });
        }
    };

    saveImage = async () => {
        let fileImg = new ReactNativeFile({
            uri: this.state.pickedImage,
            name: this.props.user.username + '.jpg',
            type: 'image/jpg',
        });
        await this.props.uploadImageMutation({ variables: { image: fileImg } });
        await Picker.clean();
    };

    deleteImage = async () => {
        if (this.props.user.image) {
            await this.props.deleteImageMutation({ variables: { imageId: this.props.user.image.id } });
        }
    };

    saveChanges = async values => {
        const oldLocation = this.props.user.profile.location;
        const newLocation = values.location;
        if ((!oldLocation && newLocation) || (newLocation && oldLocation.name != newLocation.name)) {
            this.saveLocationInDb(newLocation);
        }

        const oldSkills = this.props.user.skills;
        const newSkills = values.skills;

        const oldSkillIds = oldSkills.map(skill => skill.id);
        const newSkillIds = newSkills.map(skill => skill.id);

        const skillsToCreate = newSkills.filter(skill => !oldSkillIds.includes(skill.id));
        const skillsToDeleteIds = oldSkills.filter(skill => !newSkillIds.includes(skill.id)).map(skill => skill.id);

        this.deleteSkillsInDb(skillsToDeleteIds);
        this.createSkillsInDb(skillsToCreate);

        if (this.state.pickedImage !== '') {
            await this.saveImage();
        } else {
            await this.deleteImage();
        }

        showMessage({
            message: this.props.t('editSuccess'),
            type: 'success',
            icon: 'auto',
        });
    };

    onSubmit = async (values, actions) => {
        await this.saveChanges(values);
        this.props.navigation.state.params.close();
        this.props.navigation.goBack();
    };

    onClose = () => {
        this.props.navigation.state.params.close();
        this.props.navigation.goBack();
    };

    get initialValues() {
        return {
            location: this.props.user.profile.location ? this.props.user.profile.location : undefined,
            skills: clone(this.props.user.skills),
        };
    }

    render() {
        return (
            <KeyboardAwareScrollView>
                <Formik initialValues={this.initialValues} onSubmit={this.onSubmit}>
                    {({ errors, handleChange, handleSubmit, isSubmitting, values, setFieldValue }) => (
                        <View>
                            <Appbar.Header style={styles.appbar}>
                                <Appbar.Action icon="close" onPress={this.onClose} />
                                <Appbar.Content title={this.props.t('editProfile')} />
                                <Appbar.Action icon="check" onPress={handleSubmit} />
                            </Appbar.Header>

                            <ImagePicker
                                visible={this.state.modalVisible}
                                hideModal={this.hideModal}
                                takeImage={this.takeImage}
                                pickImage={this.pickImage}
                                deleteImage={this.removePickedImage}
                            />

                            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                <View style={{ flex: 1 }} />
                                <ProfilePicture
                                    style={styles.profilePicture}
                                    src={this.state.pickedImage}
                                />
                                <View style={{ flex: 1, paddingBottom: 35, marginRight: 20 }}>
                                    <TouchableOpacity style={styles.circularButton} onPress={this.showModal}>
                                        <Icon name={'photo-camera'} size={30} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <GooglePlacesInput
                                onChangeValue={v => {
                                    setFieldValue('location', {
                                        name: v.formatted_address,
                                        longitude: v.geometry.location.lng,
                                        latitude: v.geometry.location.lat,
                                    });
                                    handleChange('location');
                                }}
                                initialValue={{ formatted_address: values.location ? values.location.name : '' }}
                                label={this.props.t('locationSearch')}
                                error={errors.location}
                            />
                            <Title style={styles.title}>{this.props.t('skills')}</Title>
                            <SkillList
                                skillObjects={values.skills}
                                editable={true}
                                addSkill={(skill: SkillObject) => {
                                    let skills = clone(values.skills);
                                    skills.push(skill);
                                    setFieldValue('skills', skills);
                                }}
                                deleteSkill={(skillToDelete: SkillObject) => {
                                    let skills = clone(values.skills);
                                    skills = skills.filter(skill => skill.id != skillToDelete.id);
                                    setFieldValue('skills', skills);
                                }}
                                scrollable={false}
                            />
                        </View>
                    )}
                </Formik>
            </KeyboardAwareScrollView>
        );
    }
}

export const EditProfile = compose(
    graphql(mutations.CREATE_LOCATION, { name: 'createLocationMutation' }),
    graphql(mutations.UPDATE_USER_LOCATION, { name: 'updateUserLocationMutation' }),
    graphql(mutations.CREATE_SKILL, { name: 'createSkillMutation' }),
    graphql(mutations.DELETE_SKILL, { name: 'deleteSkillMutation' }),
    graphql(uploadMutations.UPLOAD_USER_IMG, {
        name: 'uploadImageMutation',
        options: () => ({
            refetchQueries: [{ query: GET_PROFILE }],
        }),
    }),
    graphql(uploadMutations.DELETE_IMG, {
        name: 'deleteImageMutation',
        options: () => ({
            refetchQueries: [{ query: GET_PROFILE }],
        }),
    })
)(withNavigation(withNamespaces(['User'])(EditProfileComponent)));

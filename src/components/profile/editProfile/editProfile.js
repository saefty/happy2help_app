// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
// import { TextInput } from '../../utils/TextinputWithIcon/textInput';
import { styles } from './editProfileStyle';
import { Appbar, Title } from 'react-native-paper';
import { ProfilePicture } from '../profilePicture/profilePicture';
import { SkillList } from '../skillList/skillList';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import type { UserObject } from './../../../models/user.model';
import type { SkillObject } from './../../../models/skill.model';
import { withNamespaces, i18n } from 'react-i18next';
import { clone } from './../../../helpers/clone';

import { mutations } from './editProfileMutations';

import { graphql, compose } from 'react-apollo';
import { withNavigation } from 'react-navigation';
import { Formik } from 'formik';
import { GooglePlacesInput } from '../../location/location.input';

type Props = {
    t: i18n.t,
    logOut: () => void,
    user: UserObject, //the old userobject
    createLocationMutation: graphql.mutate,
    updateUserLocationMutation: graphql.mutate,
    createSkillMutation: graphql.mutate,
    deleteSkillMutation: graphql.mutate,
};

type State = {
    user: UserObject,
};

class EditProfileComponent extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = { user: clone(props.user) };
    }

    addSkill = (skill: SkillObject) => {
        let user = this.state.user;
        user.skills.push(skill);
        this.setState({ user: user });
    };

    deleteSkill = (skillToDelete: SkillObject) => {
        let user = this.state.user;
        user.skills = user.skills.filter(skill => skill.id != skillToDelete.id);
        this.setState({ user: user });
    };

    updateLocationName = locationname => {
        let user = this.state.user;
        user.profile.location.name = locationname;
        this.setState({ user: user });
    };

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

                            <View style={{ alignItems: 'center' }}>
                                <ProfilePicture style={styles.profilePicture} {...this.props} />
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
    graphql(mutations.DELETE_SKILL, { name: 'deleteSkillMutation' })
)(withNavigation(withNamespaces(['User'])(EditProfileComponent)));

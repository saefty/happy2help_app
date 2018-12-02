// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { TextInput } from '../../utils/TextinputWithIcon/textInput';
import { styles } from './editProfileStyle';
import { Appbar } from 'react-native-paper';
import { ProfilePicture } from '../profilePicture/profilePicture';
import { SkillList } from '../skillList/skillList';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import type { UserObject } from './../../../models/user.model';
import type { SkillObject } from './../../../models/skill.model';
import { withNamespaces, i18n } from 'react-i18next';
import { clone } from './../../../helpers/clone';

import { mutations } from './editProfileMutations';

import { graphql, Mutation, compose } from 'react-apollo';
import { withNavigation } from 'react-navigation';


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

    saveLocationInDb = async (locationName) => {
        let response = await this.props.createLocationMutation({ variables: { longitude: 123.123, latitude: 123.123, name: locationName } });
        this.props.updateUserLocationMutation({ variables: { locationId: response.data.createLocation.location.id } });
    };

    createSkillsInDb = (skills) => {
        for (const skill of skills) {
            this.props.createSkillMutation({ variables: { name: skill.name } });
        }
    };

    deleteSkillsInDb = (skillsToDeleteIds) => {
        for (const skillId of skillsToDeleteIds) {
            this.props.deleteSkillMutation({ variables: { skillId: skillId } });
        }
    };

    saveChanges = async () => {
        const oldLocation = this.props.user.profile.location;
        const newLocation = this.state.user.profile.location;
        if (!oldLocation || oldLocation.name != newLocation.name) {
            this.saveLocationInDb(newLocation.name);
        }

        const oldSkills = this.props.user.skills;
        const newSkills = this.state.user.skills;

        const oldSkillIds = oldSkills.map(skill => skill.id);
        const newSkillIds = newSkills.map(skill => skill.id);

        const skillsToCreate = newSkills.filter(skill => !oldSkillIds.includes(skill.id));
        const skillsToDeleteIds = oldSkills.filter(skill => !newSkillIds.includes(skill.id)).map(skill => skill.id);

        this.deleteSkillsInDb(skillsToDeleteIds);
        this.createSkillsInDb(skillsToCreate);
    };

    render() {
        return (
            <KeyboardAwareScrollView>
                <Appbar.Header style={styles.appbar}>
                    <Appbar.Action icon="close" onPress={() => {this.props.navigation.goBack()}} />
                    <Appbar.Content title={this.props.t('editProfile')} />
                    <Appbar.Action
                        icon="check"
                        onPress={async () => {
                            await this.saveChanges();
                            this.props.navigation.goBack();
                        }}
                    />
                </Appbar.Header>

                <View style={{ alignItems: 'center' }}>
                    <ProfilePicture style={styles.profilePicture} {...this.props} />
                </View>
                <TextInput
                    iconName="place"
                    label="Location"
                    value={this.props.user.profile.location ? this.props.user.profile.location.name : ''}
                    update={this.updateLocationName}
                />
                <SkillList skillObjects={this.state.user.skills} editable={true} addSkill={this.addSkill} deleteSkill={this.deleteSkill} />
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

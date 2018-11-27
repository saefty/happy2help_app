// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { TextInput } from './TextinputWithIcon/textInput';
import { styles } from './editProfileStyle';
import { Appbar } from 'react-native-paper';
import { ProfilePicture } from '../profilePicture/profilePicture';
import { SkillList } from '../skillList/skillList';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import type { UserObject } from './../../../models/user.model';
import type { SkillObject } from './../../../models/skill.model';
import { withNamespaces, i18n } from 'react-i18next';

import gql from 'graphql-tag';
import { graphql, Mutation } from 'react-apollo';

const CREATE_LOCATION = gql`
    mutation createLocation($longitude: Float!, $latitude: Float!, $name: String!) {
        createLocation(latitude: $longitude, longitude: $latitude, name: $name) {
            location {
                id
            }
        }
    }
`;

const UPDATE_USER_LOCATION = gql`
    mutation updateUserLocation($locationId: Int!) {
        updateUser(locationId: $locationId) {
            user {
                username
            }
        }
    }
`;

const CREATE_SKILL = gql`
    mutation createSkill($name: String!) {
        createSkill(name: $name) {
            skill {
                id
            }
        }
    }
`;

const DELETE_SKILL = gql`
    mutation deleteSkill($skillId: ID!) {
        deleteSkill(skillId: $skillId) {
            skill {
                id
            }
        }
    }
`;

type Props = {
    t: i18n.t,
    logOut: () => void,
    user: UserObject, //the old userobject
};

type State = {
    user: UserObject,
};

class EditProfileComponent extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(JSON.stringify(props.user)), //the new userobject
        };
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

    saveUser = async (createLocationMutation, updateUserLocationMutation, createSkillMutation, deleteSkillMutation) => {
        if (!this.props.user.profile.location || this.props.user.profile.location.name != this.state.user.profile.location.name) {
            let response = await createLocationMutation({ variables: { longitude: 123.123, latitude: 123.123, name: this.state.user.profile.location.name } });
            updateUserLocationMutation({ variables: { locationId: response.data.createLocation.location.id } });
        }
        //create new skills
        this.state.user.skills.forEach(skill => {
            if (skill.unsaved) {
                createSkillMutation({ variables: { name: skill.name } });
            }
        });
        //delete skills
        if (this.props.user.skills) {
            this.props.user.skills.forEach(skill => {
                //if a skill misses which has been in props
                if (!this.state.user.skills.find(stateSkill => stateSkill.id == skill.id)) {
                    deleteSkillMutation({variables: { skillId: skill.id}})
                }
            });
        }

        // TODO navigate to viewProfile Screen
    };

    render() {
        return (
            <KeyboardAwareScrollView>
                <Appbar.Header style={styles.appbar}>
                    <Appbar.Action icon="close" />
                    <Appbar.Content title={this.props.t('editProfile')} />

                    <Mutation mutation={CREATE_LOCATION}>
                        {createLocationMutation => (
                            <Mutation mutation={UPDATE_USER_LOCATION}>
                                {updateUserLocationMutation => (
                                    <Mutation mutation={CREATE_SKILL}>
                                        {createSkillMutation => (
                                            <Mutation mutation={DELETE_SKILL}>
                                                {deleteSkillMutation => (
                                                    <Appbar.Action
                                                        icon="check"
                                                        onPress={() => {
                                                            this.saveUser(
                                                                createLocationMutation,
                                                                updateUserLocationMutation,
                                                                createSkillMutation,
                                                                deleteSkillMutation
                                                            );
                                                        }}
                                                    />
                                                )}
                                            </Mutation>
                                        )}
                                    </Mutation>
                                )}
                            </Mutation>
                        )}
                    </Mutation>
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

export const EditProfile = withNamespaces(['User'])(EditProfileComponent);

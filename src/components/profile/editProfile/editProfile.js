// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { TextInput } from './TextinputWithIcon/textInput';
import { styles } from './editProfileStyle';
import { Appbar } from 'react-native-paper';
import { ProfilePicture } from '../profilePicture/profilePicture';
import { Skills } from '../skills/skills';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import type { UserObject } from './../../../models/user.model';
import type { SkillObject } from './../../../models/skill.model';
import { withNamespaces, i18n } from 'react-i18next';

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
        console.log(props.user);       
        this.state = {
            user: props.user, //the new userobect
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

    updateUsername = username => {
        let user = this.state.user;
        user.username = username;
        this.setState({ user: user });
    };

    updateLocationName = locationname => {
        let user = this.state.user;
        user.profile.location.name = locationname;
        this.setState({ user: user });
    };

    saveUser = () => {
        console.log(this.state.user);
        if (this.props.user.username != this.state.user.username) {
            //do update Username Mutation
        }

        if (!this.props.user.profile.location || this.props.user.profile.location.name != this.states.user.profile.location.name) {
            //do update User Location Mutation
        }
        //delete skills
        if (this.props.user.skills) {
            this.props.user.skills.forEach(skill => {
                //if a skill misses which has been in props
                if (!this.state.user.skills.find(stateSkill => stateSkill.id == skill.id)) {
                    //do delete Skill Mutation
                }
            });
        }
        //create new skills
        this.state.user.skills.forEach(skill => {
            if (skill.unsaved) {
                //do create new Skill Mutation
            }
        });
        // TODO navigate to viewProfile Screen
    };

    render() {       
        return (
            <KeyboardAwareScrollView>
                <Appbar.Header style={styles.appbar}>
                    <Appbar.Action icon="close" onPress={console.log('close')} />

                    <Appbar.Content title={this.props.t('editProfile')} />

                    <Appbar.Action icon="check" onPress={this.saveUser} />
                    <Appbar.Action icon="more-vert" onPress={console.log('presses')} />
                </Appbar.Header>

                <View style={{ alignItems: 'center' }}>
                    <ProfilePicture style={styles.profilePicture} {...this.props} />
                </View>

                <TextInput iconName="person" label="Username" value={this.props.user.username} />
                <TextInput iconName="place" label="Location" value={this.props.user.profile.location ? this.props.user.profile.location.name : ''} />

                <Skills skillObjects={this.state.user.skills} editable={true} addSkill={this.addSkill} deleteSkill={this.deleteSkill} />
            </KeyboardAwareScrollView>
        );
    }
}

export const EditProfile = withNamespaces(['User'])(EditProfileComponent);

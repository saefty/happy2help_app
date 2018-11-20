// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { TextInput } from './TextinputWithIcon/textInput';
import { styles } from './editProfileStyle';
import { Appbar } from 'react-native-paper';
import { ProfilePicture } from '../profilePicture/profilePicture';
import { Skills } from '../skills/skills';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { UserObject } from './../../../models/user.model';

type Props = {
    t: i18n.t,
    logOut: () => void,
    user: UserObject,
};

export class EditProfile extends Component<Props> {
    constructor(props) {
        super(props);
    }

    render() {
        //this will be replaced if the backend is ready to pass the user's skills
        let skillObjects = [
            {
                text: 'Hygiene Karte',
                approved: true,
                id: 0,
            },
            {
                text: 'Computerexperte',
                approved: false,
                id: 1,
            },
        ];
        return (
            <KeyboardAwareScrollView>
                    <Appbar.Header style={styles.appbar}>
                        <Appbar.BackAction onPress={console.log('back')} />
                        <Appbar.Content title="Profil bearbeiten" />
                        <Appbar.Action icon="check" onPress={console.log('presses')} />
                        <Appbar.Action icon="more-vert" onPress={console.log('presses')} />
                    </Appbar.Header>

                    <View style={{ alignItems: 'center' }}>
                        <ProfilePicture style={styles.profilePicture} {...this.props} />                       
                    </View>

                    <TextInput iconName="person" label="Username" value={this.props.user.username} />
                    <TextInput iconName="place" label="Location" value={this.props.user.profile.location ? this.props.user.profile.location.name : ''} />

                    <Skills skillObjects={skillObjects} editable={true} />
                  
                  

            </KeyboardAwareScrollView>
        );
    }
}

// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';
import { AddSkillChip } from './skillChip/addSkillChip/addSkillChip';
import  uuidv1  from 'uuid/v1';
import { withNamespaces, i18n } from 'react-i18next';


type Props = {
    t: i18n.t,
    addSkill: any,
};

type State = {
    visible: boolean,
    skillname: string,
};

export class AddSkillDialogComponent extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            skillname: '',
        };
    }

    handleSkillname = text => {
        this.setState({ skillname: text });
    };

    _showDialog = () => this.setState({ visible: true });

    _hideDialog = () => this.setState({ visible: false });

    hideAndCreateSkill = skill => {
        this.props.addSkill(skill);
        this._hideDialog();
    };

    render() {
        return (
            <View>
                <AddSkillChip onPress={this._showDialog} />
                <Portal>
                    <Dialog visible={this.state.visible} onDismiss={this._hideDialog}>
                        <Dialog.Title>{this.props.t('addSkill')}</Dialog.Title>
                        <Dialog.Content>
                            <TextInput autoFocus={true} onChangeText={this.handleSkillname} />
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={this._hideDialog}>cancel</Button>
                            <Button
                                onPress={() => {
                                    let skill = {
                                        name: this.state.skillname,
                                        approved: false,
                                        id: uuidv1(),
                                        unsaved: true,
                                    };                                    
                                    this.hideAndCreateSkill(skill);
                                }}
                            >
                                Ok
                            </Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        );
    }
}

export const AddSkillDialog = withNamespaces(['User'])(AddSkillDialogComponent);

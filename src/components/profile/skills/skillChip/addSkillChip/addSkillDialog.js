// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal, TextInput } from 'react-native-paper';
import { AddSkillChip } from './addSkillChip';
// import { SkillObject } from './../../../../../models/skill.model';

type Props = {
    t: i18n.t,
    addSkill: any,
};

export class AddSkillDialog extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            skillname: '',
            skillId: 100,
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
                        <Dialog.Title>Add Skill</Dialog.Title>
                        <Dialog.Content>
                            <TextInput autoFocus={true} onChangeText={this.handleSkillname} />
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={this._hideDialog}>cancel</Button>
                            <Button
                                onPress={() => {
                                    let skill = {
                                        text: this.state.skillname,
                                        approved: false,
                                        id: this.state.skillId,
                                    };
                                    this.setState({skillId: this.state.skillId + 1})
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

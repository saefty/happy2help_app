// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal, TextInput, HelperText } from 'react-native-paper';
import { AddSkillChip } from './skillChip/addSkillChip/addSkillChip';
import uuidv1 from 'uuid/v1';
import { withNamespaces, i18n } from 'react-i18next';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

type Props = {
    t: i18n.t,
    addSkill: any,
};

type State = {
    visible: boolean,
    skillname: string,
    validationSchema: any,
};

class AddSkillDialogComponent extends Component<Props, State> {
    constructor(props) {
        super(props);
        const SkillNameSchema = Yup.object().shape({
            skillName: Yup.string()
                .min(3, this.props.t('errors:toShort'))
                .required(this.props.t('errors:required')),
        });
        this.state = {
            validationSchema: SkillNameSchema,
            visible: false,
        };
    }

    _showDialog = () => this.setState({ visible: true });

    _hideDialog = () => this.setState({ visible: false });

    onSubmit = async (values, actions) => {
        let skill = {
            name: values.skillName,
            approved: false,
            id: uuidv1(),
        };
        values.skillName = '';
        this.props.addSkill(skill);
        this._hideDialog();
    };

    get initialValues() {
        return {
            skillName: '',
        };
    }

    render() {
        return (
            <Formik validationSchema={this.state.validationSchema} initialValues={this.initialValues} onSubmit={this.onSubmit}>
                {({ errors, handleChange, handleSubmit, isSubmitting, values, setFieldValue }) => {
                    return (
                        <View>
                            <AddSkillChip onPress={this._showDialog} />
                            <Portal>
                                <Dialog visible={this.state.visible} onDismiss={this._hideDialog}>
                                    <Dialog.Title>{this.props.t('addSkill')}</Dialog.Title>
                                    <Dialog.Content>
                                        <TextInput
                                            autoFocus={true}
                                            onChangeText={handleChange('skillName')}
                                            value={values.skillName}
                                            error={errors.skillName}
                                        />
                                        <HelperText type="error" visible={errors.skillName}>
                                            {errors.skillName}
                                        </HelperText>
                                    </Dialog.Content>
                                    <Dialog.Actions>
                                        <Button
                                            onPress={() => {                                               
                                                this._hideDialog();
                                                setFieldValue('skillName', '');
                                            }}
                                        >
                                            {this.props.t('common:cancel')}
                                        </Button>
                                        <Button onPress={handleSubmit}>{this.props.t('common:ok')}</Button>
                                    </Dialog.Actions>
                                </Dialog>
                            </Portal>
                        </View>
                    );
                }}
            </Formik>
        );
    }
}

export const AddSkillDialog = withNamespaces(['User', 'Common', 'errors'])(AddSkillDialogComponent);

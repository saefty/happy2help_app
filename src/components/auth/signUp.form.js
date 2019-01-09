// @flow
import React, { Component } from 'react';
import { StyleSheet, View, Image, TextInput as NativeTextInput, StatusBar } from 'react-native';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Formik, ErrorMessage } from 'formik';
import { TextInput, Button, HelperText } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import { withNamespaces, i18n } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';
import * as Colors from '../../../themes/colors';

const REGISTER = gql`
    mutation Register($username: String!, $password: String!, $email: String!) {
        createUser(username: $username, password: $password, email: $email) {
            id
            username
        }
    }
`;

type Props = {
    setSignUp: (state: boolean) => void,
    mutate: graphql.mutate,
    t: i18n.t,
};

type State = {
    validationSchema: Yup.Schema,
};

class SignUpForm extends Component<Props, State> {
    constructor(props) {
        super(props);
        const SignUpSchema = Yup.object().shape({
            userName: Yup.string()
                .min(5, this.props.t('errors:toShort'))
                .required(this.props.t('errors:required')),
            email: Yup.string()
                .email(this.props.t('errors:email'))
                .required(this.props.t('errors:required')),
            password: Yup.string()
                .min(6, this.props.t('errors:toShort'))
                .required(this.props.t('errors:required')),
        });
        this.state = { validationSchema: SignUpSchema };
    }
    onSignUp = async (formValues, actions) => {
        actions.setSubmitting(true);
        await this.props.mutate({
            variables: {
                username: formValues.userName,
                email: formValues.email,
                password: formValues.password,
                birthday: formValues.birthday,
            },
        });
        actions.setSubmitting(false);
        this.props.setSignUp(false);

        //await this.props.logIn(token.data.tokenAuth.token);
    };

    render() {
        return (
            <KeyboardAwareScrollView>
                <StatusBar backgroundColor={Colors.primaryStatusBar} />
                <View style={styles.container}>
                    <View style={styles.bannerWrapper}>
                        <Image resizeMode="contain" style={styles.banner} source={require('../../../assets/images/logo_app1.png')} />
                    </View>

                    <Formik validationSchema={this.state.validationSchema} onSubmit={this.onSignUp}>
                        {({ errors, handleChange, handleSubmit, isSubmitting, values }) => (
                            <View>
                                <TextInput
                                    onChangeText={handleChange('userName')}
                                    value={values.userName}
                                    label={this.props.t('userName')}
                                    error={errors.userName}
                                />
                                <HelperText type="error" visible={errors.userName}>
                                    <ErrorMessage name="userName" />
                                </HelperText>

                                <TextInput
                                    onChangeText={handleChange('email')}
                                    value={values.email}
                                    label={this.props.t('email')}
                                    error={errors.email}
                                />
                                <HelperText type="error" visible={errors.email}>
                                    <ErrorMessage name="email" />
                                </HelperText>

                                <TextInput
                                    onChangeText={handleChange('password')}
                                    value={values.password}
                                    label={this.props.t('password')}
                                    error={errors.password}
                                    render={props => <NativeTextInput secureTextEntry={true} {...props} />}
                                />
                                <HelperText type="error" visible={errors.password}>
                                    <ErrorMessage name="password" />
                                </HelperText>

                                <Button
                                    mode="contained"
                                    icon={({ size, color }) => <Icon size={size} color={color} name="adduser" />}
                                    disabled={isSubmitting}
                                    onPress={handleSubmit}
                                >
                                    {this.props.t('signUp')}
                                </Button>
                            </View>
                        )}
                    </Formik>
                    <Button mode="outlined" style={styles.signIn} onPress={() => this.props.setSignUp(false)}>
                        {this.props.t('signIn')}
                    </Button>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 15,
        marginBottom: 15,
        padding: 20,
        width: '100%',
    },
    bannerWrapper: {
        alignItems: 'center',
    },
    banner: {
        width: '70%',
    },
    signIn: {
        marginTop: 5,
    },
});

const NameSpaced = withNamespaces(['User', 'errors'])(SignUpForm);

export const SignUpFormGQL = graphql(REGISTER)(NameSpaced);

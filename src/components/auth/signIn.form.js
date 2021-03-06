// @flow
import React, { Component } from 'react';
import { StyleSheet, View, Image, TextInput as NativeTextInput, StatusBar } from 'react-native';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Formik, ErrorMessage } from 'formik';
import { TextInput, Button, HelperText, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import { withNamespaces, i18n } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';
import * as Colors from '../../../themes/colors';

const AUTHORIZE = gql`
    mutation Authorize($username: String!, $password: String!) {
        tokenAuth(username: $username, password: $password) {
            token
        }
    }
`;

type Props = {
    logIn: (jwtToken: String) => void,
    setSignUp: (state: boolean) => void,
    mutate: graphql.mutate,
    t: i18n.t,
};
type State = {
    validationSchema: Yup.Schema,
    signInError?: String,
};

class SignInForm extends Component<Props, State> {
    constructor(props) {
        super(props);
        const SignInSchema = Yup.object().shape({
            userName: Yup.string().required(this.props.t('errors:required')),
            password: Yup.string().required(this.props.t('errors:required')),
        });
        this.state = {
            validationSchema: SignInSchema,
            signInError: undefined,
        };
    }
    onSignIn = async (formValues, actions) => {
        this.setState({
            signInError: undefined,
        });

        try {
            const token = await this.props.mutate({
                variables: {
                    username: formValues.userName,
                    password: formValues.password,
                },
            });
            await this.props.logIn(token.data.tokenAuth.token);
        } catch (e) {
            actions.setSubmitting(false);
            this.setState({
                signInError: this.props.t('invalidCredentials'),
            });
        }
    };

    render() {
        return (
            <KeyboardAwareScrollView>
                <StatusBar backgroundColor={Colors.primaryStatusBar} />
                <View style={styles.container}>
                    <View style={styles.bannerWrapper}>
                        <Image resizeMode="contain" style={styles.banner} source={require('../../../assets/images/logo_app2.png')} />
                    </View>
                    <Formik validationSchema={this.state.validationSchema} onSubmit={this.onSignIn}>
                        {({ errors, handleChange, handleSubmit, isSubmitting, values }) => (
                            <View>
                                <TextInput
                                    testID="userName"
                                    onChangeText={handleChange('userName')}
                                    value={values.userName}
                                    label={this.props.t('userName')}
                                    error={errors.userName}
                                />
                                <HelperText type="error" visible={errors.userName}>
                                    <ErrorMessage name="userName" />
                                </HelperText>
                                <TextInput
                                    testID="password"
                                    onChangeText={handleChange('password')}
                                    value={values.password}
                                    label={this.props.t('password')}
                                    error={errors.password}
                                    render={props => <NativeTextInput secureTextEntry={true} {...props} />}
                                />
                                <HelperText type="error" visible={errors.password}>
                                    <ErrorMessage name="password" />
                                </HelperText>
                                <HelperText type="error" visible={this.state.signInError !== undefined}>
                                    {String(this.state.signInError)}
                                </HelperText>
                                <Button
                                    mode="contained"
                                    dark={false}
                                    icon={({ size, color }) => <Icon size={size} color={color} name="login" />}
                                    disabled={isSubmitting}
                                    onPress={handleSubmit}
                                    style={styles.button}
                                >
                                    {this.props.t('signIn')}
                                </Button>
                            </View>
                        )}
                    </Formik>
                    <Button mode="outlined" style={styles.signUp} onPress={() => this.props.setSignUp(true)}>
                        <Text style={styles.signUpText}> {this.props.t('signUp')} </Text>
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
        padding: 20,
        width: '100%',
    },
    bannerWrapper: {
        alignItems: 'center',
    },
    banner: {
        width: '70%',
        marginBottom: 15,
    },
    button: {
        backgroundColor: Colors.neutralColors.background,
    },
    signUp: {
        borderColor: Colors.neutralColors.background,
        borderWidth: 1,
        marginTop: 10,
    },
    signUpText: {
        color: Colors.neutralColors.background,
    },
});

const NameSpaced = withNamespaces(['User', 'errors'])(SignInForm);

export const SignInFormGQL = graphql(AUTHORIZE)(NameSpaced);

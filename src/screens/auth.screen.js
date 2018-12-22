// @flow
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { SignInFormGQL } from '../components/auth/signIn.form';
import { SignUpFormGQL } from '../components/auth/signUp.form';
import { primaryColor } from '../../themes/colors';

type Props = {
    logIn: (jwtToken: string) => Promise<void>,
    logOut: () => Promise<void>,
};
type State = {
    signUp: boolean,
};
export class AuthScreen extends Component<Props, State> {
    state = {
        signUp: true,
    };
    setSignUp = async (signUp: boolean) => {
        this.setState({ signUp: signUp });
    };
    render() {
        let form;
        if (this.state.signUp) {
            form = <SignUpFormGQL setSignUp={this.setSignUp} />;
        } else {
            form = <SignInFormGQL logIn={this.props.logIn} setSignUp={this.setSignUp} />;
        }
        return <View style={this.state.signUp ? style.containerSignUp : style.containerSignIn}>{form}</View>;
    }
}

const style = StyleSheet.create({
    containerSignIn: {
        backgroundColor: primaryColor,
        height: '100%',
        width: '100%',
    },
    containerSignUp: {
        backgroundColor: '#ffffff',
        height: '100%',
        width: '100%',
    },
});

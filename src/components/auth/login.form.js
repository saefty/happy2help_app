// @flow
import t from 'tcomb-form-native';
import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const Form = t.form.Form;

const Credentials = t.struct({
    username: t.String,
    password: t.String,
});

const options = {
    fields: {
        password: {
            password: true,
            secureTextEntry: true,
        },
    },
};
const AUTHORIZE = gql`
    mutation Authorize($username: String!, $password: String!) {
        tokenAuth(username: $username, password: $password) {
            token
        }
    }
`;

type Props = {
    logIn: (jwtToken: String) => undefined,
    mutate: graphql.mutate,
};

class LoginForm extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = { value: {} };
        this.form = React.createRef();
        this.onPress = this.onPress.bind(this);
    }
    onPress = async () => {
        // retrieve value from form
        var value = this.form.current.getValue();

        if (value) {
            const token = await this.props.mutate({
                variables: {
                    username: value.username,
                    password: value.password,
                },
            });
            console.log(token)
            await this.props.logIn(token.data.tokenAuth.token);
            this.setState({})
        }
    }

    onChange = (value) => {
        this.setState({ value });
    }

    render() {
        return (
            <View style={styles.container}>
                {/* display */}
                <Form ref={this.form} type={Credentials} options={options} />
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.onPress}
                    onChange={this.onChange}
                    underlayColor="#99d9f4"
                >
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.props.logOut}
                    onChange={this.onChange}
                    underlayColor="#99d9f4"
                >
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        width: '100%',
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center',
    },
    button: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
});

export const LoginFormGQL = graphql(AUTHORIZE)(LoginForm);

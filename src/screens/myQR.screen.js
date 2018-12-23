// @flow
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import QRCode from 'react-native-qrcode';
import { H2HTheme } from '../../themes/default.theme';
import { Appbar, Text, Subheading } from 'react-native-paper';
import { withNamespaces } from 'react-i18next';
import { neutralColors } from '../../themes/colors';

const QR_QUERY = gql`
    query {
        qrGetToken
    }
`;

type Props = {
    logIn: (jwtToken: string) => Promise<void>,
    logOut: () => Promise<void>,
};
type State = {
    signUp: boolean,
};
export class _MyQRScreen extends Component<Props, State> {
    state = {
        signUp: true,
    };
    setSignUp = async (signUp: boolean) => {
        this.setState({ signUp: signUp });
    };
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Appbar.Header>
                    <Appbar.BackAction icon="menu" onPress={() => this.props.navigation.goBack()} />
                    <Appbar.Content title={this.props.t('your')} />
                </Appbar.Header>
                <Query query={QR_QUERY} cache="network-only" pollInterval={150}>
                    {({ data }) => {
                        if (data.qrGetToken) {
                            return (
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '100%',
                                    }}
                                >
                                    <QRCode value={data.qrGetToken} size={250} bgColor={H2HTheme.colors.primary} fgColor="white" />
                                    <Subheading style={{ textAlign: 'center', color: neutralColors.dark }}>
                                        {this.props.t('info')}
                                    </Subheading>
                                </View>
                            );
                        } else {
                            return <View />;
                        }
                    }}
                </Query>
            </View>
        );
    }
}

export const MyQRScreen = withNamespaces(['QR'])(_MyQRScreen);

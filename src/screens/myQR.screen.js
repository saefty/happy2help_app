// @flow
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import QRCode from 'react-native-qrcode';
import { H2HTheme } from '../../themes/default.theme';

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
export class MyQRScreen extends Component<Props, State> {
    state = {
        signUp: true,
    };
    setSignUp = async (signUp: boolean) => {
        this.setState({ signUp: signUp });
    };
    render() {
        return (
            <Query query={QR_QUERY} cache="netowrk-only" pollInterval={150}>
                {({ data }) => {
                    if (data.qrGetToken) {
                        return (
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                }}
                            >
                                <QRCode value={data.qrGetToken} size={250} bgColor={H2HTheme.colors.primary} fgColor="white" />
                            </View>
                        );
                    } else {
                        return <View />;
                    }
                }}
            </Query>
        );
    }
}

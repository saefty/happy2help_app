// @flow
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { ImageProvider } from '../../image/imageProvider';
import { ProfilePicture } from './../../profile/profilePicture/profilePicture';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { H2HTheme } from '../../../../themes/default.theme';
import { DrawerStyle } from './drawer.style';
import { LogoutButton } from '../../profile/viewProfile/logoutButton/logoutButton';
import { LogOutProvider } from '../../../../App';
import { Query, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { Text, List, Divider, Drawer, Surface } from 'react-native-paper';
import { NavigationEvents } from 'react-navigation';

export const USER_ORGAS_QUERY = gql`
    query {
        user {
            id
            organisationSet {
                id
                name
            }
        }
    }
`;

class _DrawerScreen extends React.Component<any, any> {
    state = {
        extended: true,
        activeOrga: null,
        OrganisationModeScreenA: false,
        isVisible: false,
    };

    refetchOrgas: () => void;
    constructor(props) {
        super(props);
    }

    toggleOrgaList = async () => {
        this.setState({ extended: !this.state.extended });
    };

    setORGA = async (id: number) => {
        return this.props.client.mutate({
            mutation: gql`
                mutation SetORGANISATION_ID($ORGANISATION_ID: String) {
                    setORGANISATION_ID(ORGANISATION_ID: $ORGANISATION_ID) @client
                }
            `,
            variables: { ORGANISATION_ID: id },
        });
    };

    getORGA = async () => {
        const result = await this.props.client.query({
            query: gql`
                query {
                    ORGANISATION_ID @client
                }
            `,
            fetchPolicy: 'cache-only',
        });
        return result.data;
    };

    UNSAFE_componentWillReceiveProps(props) {
        if (props.navigation.state.isDrawerOpen !== this.state.isVisible) {
            this.refetchOrgas();
            this.setState({ isVisible: props.navigation.state.isDrawerOpen });
        }
    }

    render() {
        const { props } = this;
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                        <ImageProvider>
                            {(image, refetch) => {
                                return <ProfilePicture style={DrawerStyle.profilePicture} src={image ? image.url : ''} />;
                            }}
                        </ImageProvider>
                        <Icon
                            style={DrawerStyle.qrStyle}
                            color={H2HTheme.colors.primary}
                            onPress={() => {
                                props.navigation.navigate('MyQRCode');
                            }}
                            name="qrcode-scan"
                            size={60}
                        />
                        <DrawerItems {...props} />
                        <Divider
                            style={{
                                height: 3,
                            }}
                        />
                        <Query query={USER_ORGAS_QUERY} fetchPolicy="cache-first">
                            {({ error, data, refetch }) => {
                                if (error || !data.user) return <View />;
                                this.refetchOrgas = refetch;
                                return (
                                    <List.Accordion
                                        style={{
                                            marginTop: 0,
                                            padding: 0,
                                        }}
                                        expanded={this.state.extended}
                                        onPress={this.toggleOrgaList}
                                        title={
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                Organisationen
                                            </Text>
                                        }
                                        left={props => <List.Icon {...props} color="#000" icon="group" />}
                                    >
                                        <List.Item
                                            onPress={() => this.props.navigation.navigate('EditOrganisation')}
                                            left={props => <List.Icon {...props} icon="group-add" />}
                                            title={<Text style={{ fontSize: 14 }}>Neue Organisation</Text>}
                                        />

                                        {data.user.organisationSet.map(orga => {
                                            return (
                                                <List.Section key={orga.id}>
                                                    <Drawer.Item
                                                        onPress={async () => {
                                                            this.setState({
                                                                activeOrga: orga.id,
                                                                OrganisationModeScreenA: !this.state.OrganisationModeScreenA,
                                                            });
                                                            await this.setORGA(orga.id);
                                                            this.props.navigation.navigate(
                                                                'OrganisationModeScreen' + (this.state.OrganisationModeScreenA ? 'A' : 'B')
                                                            );
                                                        }}
                                                        label={orga.name}
                                                        active={
                                                            this.state.activeOrga === orga.id &&
                                                            props.activeItemKey === 'OrganisationScreen'
                                                        }
                                                    />
                                                </List.Section>
                                            );
                                        })}
                                    </List.Accordion>
                                );
                            }}
                        </Query>
                    </SafeAreaView>
                    <View style={DrawerStyle.logoutButton} />
                </ScrollView>
                <View style={DrawerStyle.logoutContainer}>
                    <Divider
                        style={{
                            height: 2,
                        }}
                    />
                    <LogOutProvider.Consumer>
                        {value => <LogoutButton style={DrawerStyle.logoutButton} logOut={value.logOut} />}
                    </LogOutProvider.Consumer>
                </View>
            </View>
        );
    }
}

export const DrawerScreen = withApollo(_DrawerScreen);

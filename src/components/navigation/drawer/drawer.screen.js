// @flow
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { ProfilePicture } from './../../profile/profilePicture/profilePicture';
import { styles } from './../../profile/viewProfile/header/headerStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { H2HTheme } from '../../../../themes/default.theme';
import { qrStyle } from './qr.style';
import { LogoutButton } from '../../profile/viewProfile/logoutButton/logoutButton';
import { LogOutProvider } from '../../../../App';
import { Query, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { Text, TouchableRipple, List, Divider, Drawer } from 'react-native-paper';

class _DrawerScreen extends React.Component<any, any> {
    state = {
        extended: true,
        activeOrga: null,
    };

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

    render() {
        const { props } = this;
        return (
            <ScrollView>
                <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                    <ProfilePicture style={styles.profilePicture} />
                    <Icon
                        style={qrStyle}
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
                    <Query
                        query={gql`
                            query {
                                user {
                                    id
                                    organisationSet {
                                        id
                                        name
                                    }
                                }
                            }
                        `}
                    >
                        {({ error, loading, data }) => {
                            if (error || loading) return <View />;
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
                                        title={<Text style={{ fontSize: 14 }}>Neue Organisationen</Text>}
                                    />
                                    {data.user.organisationSet.map(orga => {
                                        return (
                                            <List.Section key={orga.id}>
                                                <Drawer.Item
                                                    onPress={async () => {
                                                        this.setState({ activeOrga: orga.id });
                                                        await this.setORGA(orga.id);
                                                        this.props.navigation.navigate('OrganisationModeScreen');
                                                    }}
                                                    label={orga.name}
                                                    active={
                                                        this.state.activeOrga === orga.id && props.activeItemKey === 'OrganisationScreen'
                                                    }
                                                />
                                            </List.Section>
                                        );
                                    })}
                                </List.Accordion>
                            );
                        }}
                    </Query>
                    <LogOutProvider.Consumer>{value => <LogoutButton logOut={value.logOut} />}</LogOutProvider.Consumer>
                </SafeAreaView>
            </ScrollView>
        );
    }
}

export const DrawerScreen = withApollo(_DrawerScreen);

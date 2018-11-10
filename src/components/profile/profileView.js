// @flow
import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Chip, Title, Button } from 'react-native-paper';
import { H2HTheme } from '../../../themes/default.theme.js';

type Props = {
    t: i18n.t,
    logOut: () => void,
};

export class ProfileView extends Component<Props> {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <View style={styles.container}>
                    <View
                        style={{
                            height: 150,
                        }}
                    >
                        <View style={styles.colouredBlock} />
                        <View style={styles.headerTextContainer}>
                            <Image
                                style={styles.profileImage}
                                source={require('../../../assets/images/profile/baseline_person_black_48.png')}
                            />
                            <View style={{ margin: 10 }}>
                                <Text style={styles.userName}>
                                    Ron_weasley{' '}
                                </Text>
                                <Text style={{ fontSize: 15 }}>
                                    Berlin, Deutschland{' '}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ margin: 10 }}>
                        <Title style={{ margin: 5 }}>Skills</Title>
                        <View style={styles.chipBox}>
                            <Chip
                                raised
                                theme={{ text: 'white' }}
                                style={styles.skillChip}
                            >
                                <Text style={{ color: '#ffffff' }}>
                                    Ersthelfer
                                </Text>
                            </Chip>
                            <Chip
                                raised
                                theme={{ text: 'white' }}
                                style={styles.skillChip}
                            >
                                <Text style={{ color: '#ffffff' }}>
                                    Gesundheitskarte
                                </Text>
                            </Chip>
                            <Chip
                                raised
                                theme={{ text: 'white' }}
                                style={styles.skillChip}
                            >
                                <Text style={{ color: '#ffffff' }}>
                                    Führerschein
                                </Text>
                            </Chip>
                            <Chip
                                raised
                                theme={{ text: 'white' }}
                                style={styles.skillChip}
                            >
                                <Text style={{ color: '#ffffff' }}>
                                    Jugendleiter
                                </Text>
                            </Chip>
                        </View>
                    </View>
                </View>
                <Button
                    onPress={this.props.logOut}
                    style={{ margin: 10 }}
                    mode="contained"
                >
                    Log out
                </Button>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        flexDirection: 'column',
        backgroundColor: H2HTheme.colors.background,
    },
    skillChip: {
        backgroundColor: H2HTheme.colors.primary,
        color: '#ffffff',
        margin: 5,
    },
    profileImage: {
        width: 110,
        height: 110,
        borderRadius: 150,
        margin: 10,
        borderWidth: 8,
        borderColor: 'white',
    },
    colouredBlock: {
        position: 'absolute',
        width: '100%',
        height: '50%',
        backgroundColor: H2HTheme.colors.primary,
    },
    headerTextContainer: {
        flex: 1,
        left: -20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    userName: {
        color: 'white',
        fontSize: 25,
        top: -10,
    },
    chipBox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
});

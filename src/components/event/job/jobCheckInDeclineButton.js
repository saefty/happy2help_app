// @flow
import * as React from 'react';
import type { Participation } from '../../../models/participation.model';
import { StyleSheet, View } from 'react-native';
import { Mutation } from 'react-apollo';
import { Button } from 'react-native-paper';
import { UPDATE_PARTICIPATION } from '../../../components/event/participation.mutation';

// TODO: ADD i18n
export const JobCheckInDeclineButton = (props: any) => {
    const participation: Participation = props.participation;
    const declineEnabled = participation.state !== 3;
    const acceptEnabled = participation.state !== 1;

    return (
        <Mutation mutation={UPDATE_PARTICIPATION}>
            {mutate => {
                return (
                    <View style={styles.buttonContainer}>
                        <Button
                            mode="contained"
                            style={{
                                backgroundColor: 'grey',
                            }}
                            disabled={!declineEnabled}
                            onPress={() => props.decline(mutate)}
                        >
                            Decline
                        </Button>
                        <Button disabled={!acceptEnabled} mode="contained" onPress={() => props.checkin(mutate)}>
                            Check-in
                        </Button>
                    </View>
                );
            }}
        </Mutation>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
});

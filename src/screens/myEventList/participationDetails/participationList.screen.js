// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { withNavigation, NavigationActions } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import { Query } from 'react-apollo';
import { ApplicantsView } from '../../../components/event/participations/applicantsView';
import gql from 'graphql-tag';

export const PARTICIPATION_LIST_QUERY = gql`
    query event($id: ID!) {
        event(id: $id) {
            id
            jobSet {
                id
                name
                description
                participationSet {
                    id
                    state
                    user {
                        id
                        username
                    }
                }
            }
        }
    }
`;

type Props = {};
export class PartcipationListScreen extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Appbar.Header style={{ elevation: 0 }}>
                    <Appbar.BackAction icon="menu" onPress={() => this.props.navigation.dispatch(NavigationActions.back())} />
                    <Appbar.Content title={this.props.screenProps.event.name} />
                </Appbar.Header>
                <ScrollView>
                    <Query query={PARTICIPATION_LIST_QUERY} variables={{ id: this.props.screenProps.event.id }}>
                        {({ data, loading, error }) => {
                            if (loading || error) return null;
                            return <ApplicantsView event={data.event} />;
                        }}
                    </Query>
                </ScrollView>
            </View>
        );
    }
}

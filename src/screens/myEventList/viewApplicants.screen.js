// @flow

import React, { Component } from 'react';
import { withNamespaces, i18n } from 'react-i18next';
import type { EventObject } from '../../models/event.model';
import { ApplicantsView } from '../../components/event/participations/applicantsView';
import { ScrollView } from 'react-native-gesture-handler';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

type Props = {
    event: EventObject,
};

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

class ViewApplicantsComponent extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <ScrollView>
                <Query query={PARTICIPATION_LIST_QUERY} variables={{ id: this.props.event.id }}>
                    {({ data, loading, error }) => {
                        if (loading || error) return null;
                        return <ApplicantsView event={data.event} />;
                    }}
                </Query>
            </ScrollView>
        );
    }
}

export const ViewApplicants = withNamespaces([])(ViewApplicantsComponent);

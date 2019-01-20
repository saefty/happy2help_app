import gql from 'graphql-tag';
import { BASE_ORGANISATION, BASE_EVENT, BASE_JOBSET } from '../../fragments';

export const ORGANISATION_EVENTS = gql`
    query organisationEvents($id: ID!) {
        organisation(id: $id) {
            id
            ...BASE_ORGANISATION
            eventSet {
                ...BASE_EVENT
                jobSet {
                    ...BASE_JOBSET
                    participationSet {
                        id
                        state
                        user {
                            id
                            username
                        }
                        job {
                            id
                            name
                            description
                        }
                    }
                }
            }
        }
    }
    ${BASE_EVENT}
    ${BASE_JOBSET}
    ${BASE_ORGANISATION}
`;

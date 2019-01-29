import gql from 'graphql-tag';
import { BASE_EVENT, BASE_ORGANISATION, BASE_JOBSET, BASE_USER } from '../../fragments';

export const EVENT_DETAIL_DATA_FRAGMENT = gql`
    fragment FULL_EVENT_DATA on EventType {
        ...BASE_EVENT
        image {
            id
            url
        }
        organisation {
            ...BASE_ORGANISATION
        }
        creator {
            ...BASE_USER
        }
        jobSet {
            ...BASE_JOBSET
            currentUsersParticipation {
                id
                state
                job {
                    id
                }
            }
            participationSet {
                id
                state
            }
        }
    }
    ${BASE_EVENT}
    ${BASE_ORGANISATION}
    ${BASE_JOBSET}
    ${BASE_USER}
`;

export const EVENT_DETAIL_QUERY = gql`
    query event($id: ID!) {
        event(id: $id) {
            ...FULL_EVENT_DATA
        }
    }
    ${EVENT_DETAIL_DATA_FRAGMENT}
`;

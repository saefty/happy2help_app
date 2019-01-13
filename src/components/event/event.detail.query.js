import gql from 'graphql-tag';

export const EVENT_DETAIL_DATA_FRAGMENT = gql`
    fragment FULL_EVENT_DATA on EventType {
        id
        name
        description
        location {
            latitude
            longitude
            name
        }
        start
        end
        jobSet {
            id
            name
            description
            totalPositions
            currentUsersParticipation {
                id
                state
                job {
                    id
                }
            }
            requiresskillSet {
                skill {
                    id
                    name
                }
            }
            participationSet {
                id
                state
            }
        }
    }
`;

export const EVENT_DETAIL_QUERY = gql`
    query event($id: ID!) {
        event(id: $id) {
            ...FULL_EVENT_DATA
        }
    }
    ${EVENT_DETAIL_DATA_FRAGMENT}
`;

import gql from 'graphql-tag';

export const ORGANISATION_EVENTS = gql`
    query organisationEvents($id: ID!) {
        organisation(id: $id) {
            id
            eventSet {
                id
                name
                description
                organisation {
                    id
                    name
                }
                jobSet {
                    id
                    name
                    description
                    totalPositions
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
                location {
                    latitude
                    longitude
                    name
                }
            }
        }
    }
`;

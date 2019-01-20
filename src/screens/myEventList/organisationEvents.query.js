import gql from 'graphql-tag';

export const ORGANISATION_EVENTS = gql`
    query organisationEvents($id: ID!) {
        organisation(id: $id) {
            id
            name
            eventSet {
                id
                name
                start
                end
                description
                start
                end
                image {
                    id
                    url
                }
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
                    id
                    latitude
                    longitude
                    name
                }
            }
        }
    }
`;

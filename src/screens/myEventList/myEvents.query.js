import gql from 'graphql-tag';

export const MY_EVENTS = gql`
    {
        user {
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

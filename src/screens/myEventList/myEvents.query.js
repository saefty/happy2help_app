import gql from 'graphql-tag';

export const MY_EVENTS = gql`
    {
        user {
            id
            eventSet {
                id
                name
                description
                image {
                    id
                    url
                }
                organisation {
                    id
                    name
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

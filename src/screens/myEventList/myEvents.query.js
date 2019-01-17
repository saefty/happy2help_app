import gql from 'graphql-tag';

export const MY_EVENTS = gql`
    {
        user {
            id
            eventSet {
                id
                name
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

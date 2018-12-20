import gql from 'graphql-tag';

export const GET_EVENTS = gql`
    {
        events {
            id
            name
            description
            creator {
                username
            }
            location {
                latitude
                longitude
                name
            }
            organisation {
                id
                name
            }
        }
    }
`;

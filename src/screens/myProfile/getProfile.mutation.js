import gql from 'graphql-tag';

export const GET_PROFILE = gql`
    {
        user {
            id
            username
            profile {
                location {
                    name
                }
                creditPoints
            }
            skills {
                id
                name
                approved
            }
            image {
                id
                url
            }
        }
    }
`;

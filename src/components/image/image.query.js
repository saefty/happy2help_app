import gql from 'graphql-tag';

export const GET_USER_IMG = gql`
    {
        user {
            id
            image {
                id
                url
            }
        }
    }
`;

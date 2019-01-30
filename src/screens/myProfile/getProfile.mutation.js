import gql from 'graphql-tag';
import { BASE_USER } from '../../fragments';

export const GET_PROFILE = gql`
    query {
        user {
            ...BASE_USER
        }
    }
    ${BASE_USER}
`;

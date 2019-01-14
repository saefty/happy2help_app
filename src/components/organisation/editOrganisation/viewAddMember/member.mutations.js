// @flow
import gql from 'graphql-tag';

export const memberMutations = {
    ADD_MEMBER: gql`
        mutation($organisationId: ID!, $username: String!) {
            addMember(organisationId: $organisationId, username: $username) {
                id
            }
        }
    `,

    REMOVE_MEMBERS: gql`
        mutation($organisationId: ID!, $userIds: [ID!]!) {
            removeMembers(organisationId: $organisationId, userIds: $userIds) {
                id
            }
        }
    `,
};

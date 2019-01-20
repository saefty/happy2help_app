/* @flow */

import gql from 'graphql-tag';

export const mutations = {
    CREATE_ORGANISATION: gql`
        mutation createOrganisation(
            $name: String!
            $description: String!
        ) {
            createOrganisation(
                name: $name
                description: $description
            ) {
                id
            }
        }
    `,
    
    UPDATE_ORGANISATION: gql`
        mutation updateOrganisation(
            $organisationId: ID!
            $name: String
            $description: String
        ) {
            updateOrganisation(
                organisationId: $organisationId
                name: $name
                description: $description
            ) {
                id
            }
        }
    `,
};

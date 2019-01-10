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
            $id: String!
            $name: String
            $description: String
        ) {
            updateEvent(
                id: $id
                name: $name
                description: $description
            ) {
                id
            }
        }
    `,
};

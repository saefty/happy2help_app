import gql from 'graphql-tag';

export const mutations = {
    CREATE_EVENT: gql`
        mutation createEvent(
            $name: String!
            $description: String!
            $locationLon: Float!
            $locationLat: Float!
            $locationName: String!
            $start: DateTime!
            $end: DateTime!
            $organisationId: ID
        ) {
            createEvent(
                name: $name
                description: $description
                locationLon: $locationLon
                locationLat: $locationLat
                locationName: $locationName
                start: $start
                end: $end
                organisationId: $organisationId
            ) {
                id
            }
        }
    `,
    UPDATE_EVENT: gql`
        mutation updateEvent(
            $eventId: ID!
            $name: String
            $description: String
            $start: DateTime
            $end: DateTime
        ) {
            updateEvent(
                eventId: $eventId
                name: $name
                description: $description
                start: $start
                end: $end
            ) {
                id
            }
        }
    `,
};

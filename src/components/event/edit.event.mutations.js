import gql from 'graphql-tag';

export const mutations = {
    CREATE_EVENT:  gql`
        mutation createEvent(
            $name: String!,
            $description: String!,
            $locationLon: Float!,
            $locationLat: Float!,
            $locationName: String!
            $start: DateTime!,
            $end: DateTime! 
            ) {
                createEvent(
                    name: $name,
                    description: $description,
                    locationLon: $locationLon,
                    locationLat: $locationLat,
                    locationName: $locationName,
                    start: $start,
                    end: $end
                ) {
                    event {
                        id
                    }
                }
            }
    `,
    UPDATE_EVENT:  gql`
        mutation updateEvent(
            $id: String!,
            $name: String,
            $description: String,
            $locationLon: Float,
            $locationLat: Float,
            $locationName: String
            $start: String,
            $end: String 
            ) {
                updateEvent(
                    id: $id,
                    name: $name,
                    description: $description,
                    locationLon: $locationLon,
                    locationLat: $locationLat,
                    locationName: $locationName,
                    start: $start,
                    end: $end
                )
            }
    `,
};
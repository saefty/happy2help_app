import gql from 'graphql-tag';

export const GET_EVENTS = gql`
    query events($search: String, $sorting: SortInputType, $distanceTo: LocationInputType) {
        events(search: $search, sorting: $sorting) {
            id
            name
            description
            image {
                id
                url
            }
            creator {
                username
            }
            location {
                latitude
                longitude
                name
                distance(to: $distanceTo)
            }
            organisation {
                id
                name
            }
        }
    }
`;

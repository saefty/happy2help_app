import gql from 'graphql-tag';

export const GET_EVENTS = gql`
    query events($search: String, $sorting: SortInputType, $distanceTo: LocationInputType, $filtering: FilterInputType) {
        events(search: $search, sorting: $sorting, filtering: $filtering) {
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

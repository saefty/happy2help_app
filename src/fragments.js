import gql from 'graphql-tag';

export const BASE_EVENT = gql`
    fragment BASE_EVENT on EventType {
        id
        name
        description
        start
        end
        image {
            id
            url
        }
        location {
            id
            latitude
            longitude
            name
        }
        organisation {
            id
            name
        }
    }
`;

export const BASE_ORGANISATION = gql`
    fragment BASE_ORGANISATION on OrganisationType {
        id
        name
        description
        image {
            id
            url
        }
        members {
            id
            username
        }
        admin {
            id
        }
    }
`;

export const BASE_JOBSET = gql`
    fragment BASE_JOBSET on JobType {
        id
        name
        description
        totalPositions
        requiresskillSet {
            id
            skill {
                id
                name
            }
        }
    }
`;

export const BASE_USER = gql`
    fragment BASE_USER on UserType {
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
        }
        image {
            id
            url
        }
    }
`;

import gql from 'graphql-tag';

export const mutations = {
    CREATE_LOCATION: gql`
        mutation createLocation($longitude: Float!, $latitude: Float!, $name: String!) {
            createLocation(latitude: $longitude, longitude: $latitude, name: $name) {
                location {
                    id
                }
            }
        }
    `,

    UPDATE_USER_LOCATION: gql`
        mutation updateUserLocation($locationId: ID!) {
            updateUser(locationId: $locationId) {
                user {
                    id
                    username
                }
            }
        }
    `,

    CREATE_SKILL: gql`
        mutation createSkill($name: String!) {
            createSkill(name: $name) {
                skill {
                    id
                }
            }
        }
    `,

    DELETE_SKILL: gql`
        mutation deleteSkill($skillId: ID!) {
            deleteSkill(skillId: $skillId) {
                skill {
                    id
                }
            }
        }
    `,
};
